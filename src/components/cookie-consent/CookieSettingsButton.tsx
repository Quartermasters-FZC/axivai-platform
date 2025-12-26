"use client";

import { Button } from "@/components/ui/button";

export function CookieSettingsButton() {
  const handleClick = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("openCookieSettings"));
    }
  };

  return (
    <Button variant="outline" onClick={handleClick}>
      Manage Cookie Preferences
    </Button>
  );
}
