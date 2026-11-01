# Narration: "A day at the hub" (off-grid AXIVAI yard)

**Animation:** `public/images/research/fleet-charging-hub-day.svg` (desktop) and `fleet-charging-hub-day-portrait.svg` (phones)
**Page:** Research → Fleet charging hubs, section 01
**Updated:** 1 November 2026. This replaces the grid-plus-top-up version and its clips.

## The model the animation shows

A new bus yard has its buses and chargers installed, but no grid connection, because the utility transformer is on back order and its pad stands empty. AXIVAI battery storage is installed on the yard. AXIVAI Motherships (electric tractors with battery trailers) fill up at an energy terminal, drive to the yard, back into the AXIVAI dock and unload into the storage. The storage charges the buses overnight, and two deliveries a day keep it topped up.

## Recording

- **Voice:** ElevenLabs, model eleven_v4, "Vino – Warm Leadership Narrator". The ElevenLabs flow "AXIVAI · Off-grid yard · narration" holds two takes of each line.
- **Files:** `public/audio/research/fleet-charging-hub-offgrid-1.mp3` … `-4.mp3`. These are referenced by the SVG's `data-chapters`.
- **Level:** about −23 LUFS, matching the other research clips.
- **No longer used:** `fleet-charging-hub-day-1..3.mp3` and `fleet-charging-hub-axivai-1..4.mp3`, which narrate the older versions. They can be deleted.

| # | Chapter | Starts | Window | Clip |
|---|---|---|---|---|
| 1 | The wait | 0.5 s | 13.2 s | 12.6 s |
| 2 | Power on wheels | 13.7 s | 11.3 s | 10.5 s |
| 3 | Overnight | 25.0 s | 13.0 s | 10.4 s |
| 4 | Morning | 38.0 s | 13.5 s | 9.4 s |

The loop runs 51.5 s, and each clip ends before its next chapter, so the scene never pauses for the voice.

## Script

1. **The wait:** "Welcome to Axivai. Here's a new bus yard. The chargers are installed, the buses are here, and there's no power. The transformer the yard needs is on back order, and that wait can run for years."
2. **Power on wheels:** "Here's how it works: power on wheels. A Mothership fills up at an energy terminal, drives onto the yard, and charges the Axivai storage installed there."
3. **Overnight:** "Overnight, the storage charges every bus, with no grid connection at all. And the trucks keep coming, around the clock, so the storage never runs dry."
4. **Morning:** "Morning. Every bus leaves full, and the next truck is already on its way. When the transformer finally arrives, the storage can stay on as backup."

## On-screen figures and their sources

| Figure | Tag | Source |
|---|---|---|
| PG&E EV sites: 560 days to power (2026) | Verified | PG&E biannual energization report to the CPUC, 1 Apr 2026, Rule 29 end-to-end average (see `docs/research/transformer-lead-times-ny-ca.md`) |
| NY substation upgrades due 2028 to 2031 | Verified | NYSEG and RG&E petition to the PSC, Nov 2024 (`docs/research/ny-grid-access-esb.md`) |
| 2 MWh per trailer | Estimate | AXIVAI design assumption |
| About 4 MWh of storage on the yard | Estimate | AXIVAI design assumption (one night's need) |
| About 100 kWh per bus per night | Estimate | AXIVAI planning assumption |
| 2 deliveries a day for a 40-bus yard | Estimate | 40 × 100 kWh ÷ 2 MWh |
| About 2 MWh left in reserve | Estimate | Storage starts the evening at 50%, gets +2 MWh from each truck, and the buses draw 4 MWh |

## Notes

- **"Axivai":** the script spells it this way so the model reads it as a word. No official pronunciation is on file (*Unknown from current project materials*).
- **The yard still has lead times of its own.** Storage, inverters and switchgear take time to source (switchgear about 44–80 weeks; see the transformer report). Before AXIVAI claims to be faster than the grid, the full time to deploy needs validating.
