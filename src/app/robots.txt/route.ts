export async function GET() {
  const body = `User-agent: *
Allow: /
Sitemap: https://axivai.com/sitemap.xml
`;

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
