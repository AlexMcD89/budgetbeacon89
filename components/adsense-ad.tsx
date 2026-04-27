"use client";

import { useEffect } from "react";

type AdsenseAdProps = {
  slot: string;
  className?: string;
};

export default function AdsenseAd({ slot, className = "" }: AdsenseAdProps) {
  useEffect(() => {
    try {
      // @ts-expect-error Google AdSense global
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Prevents page crashes if AdSense is blocked or not ready
    }
  }, []);

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-4223223139387700"
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
