import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AXIVAI · Deployable power infrastructure",
    short_name: "AXIVAI",
    description: "Deployable power infrastructure: mobile, stationed or managed capacity where conventional infrastructure falls short.",
    start_url: "/",
    display: "browser",
    background_color: "#fefdfb",
    theme_color: "#1c1917",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
