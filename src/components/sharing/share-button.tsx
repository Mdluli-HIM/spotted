"use client";

import { useState } from "react";
import { Share2 } from "lucide-react";

import type { ShareTarget } from "@/lib/share-links";
import { SharePanel } from "@/components/sharing/share-panel";

type ShareButtonProps = {
  target: ShareTarget;
  label?: string;
  iconOnly?: boolean;
  className?: string;
  iconSize?: number;
};

export function ShareButton({
  target,
  label = "Share",
  iconOnly = false,
  className = "flex size-10 items-center justify-center rounded-full bg-white text-black",
  iconSize = 15,
}: ShareButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-label={label}
        onClick={(event) => {
          event.stopPropagation();
          setOpen(true);
        }}
        className={className}
      >
        <Share2 size={iconSize} />

        {!iconOnly && <span>{label}</span>}
      </button>

      <SharePanel open={open} target={target} onClose={() => setOpen(false)} />
    </>
  );
}
