import { NextResponse } from "next/server";
import { z } from "zod";
import OpenAI from "openai";
import Anthropic from "@anthropic-ai/sdk";
import { GoogleGenerativeAI } from "@google/generative-ai";

const requestSchema = z.object({
  mode: z.enum(["explain", "audit"]).default("explain"),
  provider: z.enum(["openai", "anthropic", "gemini"]).optional(),
  payload: z.object({
    fleet: z.record(z.any()).optional(),
    location: z.record(z.any()).optional(),
    parameters: z.record(z.any()).optional(),
    results: z.record(z.any()).optional(),
    assumptions: z.string().optional(),
  }),
});

const SYSTEM_PROMPT = `You are an AI assistant for a school-bus TCO calculator. Be concise, cite risks, and avoid fabricating data. If data is missing or uncertain, explicitly say "unknown" and request the missing piece. Never promise savings. Output at most 180 words.`;

function summarizeContext(data: unknown) {
  try {
    return JSON.stringify(data)?.slice(0, 4000);
  } catch {
    return "(unavailable)";
  }
}

async function runOpenAI(prompt: string) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY missing");
  const model = process.env.OPENAI_MODEL || "gpt-4.1";
  const client = new OpenAI({ apiKey });
  const completion = await client.chat.completions.create({
    model,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: prompt },
    ],
    max_tokens: 350,
    temperature: 0.4,
  });
  return completion.choices[0]?.message?.content || "(no content)";
}

async function runAnthropic(prompt: string) {
  const apiKey = process.env.CLAUDE_API_KEY;
  if (!apiKey) throw new Error("CLAUDE_API_KEY missing");
  const model = process.env.CLAUDE_MODEL || "claude-3-5-sonnet-20241022";
  const client = new Anthropic({ apiKey });
  const message = await client.messages.create({
    model,
    max_tokens: 350,
    temperature: 0.4,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: prompt }],
  });
  const content = message.content?.[0];
  if (content?.type === "text") return content.text;
  return "(no content)";
}

async function runGemini(prompt: string) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY missing");
  const model = process.env.GEMINI_MODEL || "gemini-2.5-pro";
  const client = new GoogleGenerativeAI(apiKey);
  const generativeModel = client.getGenerativeModel({ model });
  const res = await generativeModel.generateContent({ contents: [{ role: "user", parts: [{ text: `${SYSTEM_PROMPT}\n\n${prompt}` }] }] });
  const text = res.response.text();
  return text || "(no content)";
}

async function dispatch(provider: string, prompt: string) {
  if (provider === "anthropic") return { provider, message: await runAnthropic(prompt) };
  if (provider === "gemini") return { provider, message: await runGemini(prompt) };
  return { provider: "openai", message: await runOpenAI(prompt) };
}

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = requestSchema.parse(json);

    const { mode, provider } = parsed;
    const context = summarizeContext(parsed.payload);
    const prompt = mode === "audit"
      ? `AUDIT mode. Identify risks, missing data, and optimistic assumptions. Context: ${context}`
      : `EXPLAIN mode. Summarize the TCO results plainly and flag key drivers. Context: ${context}`;

    const result = await dispatch(provider || "openai", prompt);

    return NextResponse.json({
      provider: result.provider,
      message: result.message,
    });
  } catch (error) {
    console.error("/api/tco/ai error", error);
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
