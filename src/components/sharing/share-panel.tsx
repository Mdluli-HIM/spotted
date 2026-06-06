"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, ExternalLink, Share2, X } from "lucide-react";

import {
  getAbsoluteShareUrl,
  getWhatsAppShareUrl,
  recordShareEvent,
  type ShareTarget,
} from "@/lib/share-links";

type SharePanelProps = {
  open: boolean;
  target: ShareTarget;
  onClose: () => void;
};

async function copyText(value: string) {
  if (navigator.clipboard) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const textarea = document.createElement("textarea");

  textarea.value = value;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";

  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

export function SharePanel({ open, target, onClose }: SharePanelProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = getAbsoluteShareUrl(target.path);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  function closePanel() {
    setCopied(false);
    onClose();
  }

  async function copyShareLink() {
    await copyText(shareUrl);

    recordShareEvent(target, "copy");
    setCopied(true);

    window.setTimeout(() => {
      setCopied(false);
    }, 1800);
  }

  function shareThroughWhatsApp() {
    recordShareEvent(target, "whatsapp");

    window.open(getWhatsAppShareUrl(target), "_blank", "noopener,noreferrer");
  }

  async function shareUsingDevice() {
    if (!navigator.share) {
      await copyShareLink();
      return;
    }

    await navigator.share({
      title: target.title,
      text: target.text,
      url: shareUrl,
    });

    recordShareEvent(target, "native");
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[130] bg-black/25 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closePanel}
        >
          <motion.aside
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{
              duration: 0.42,
              ease: [0.22, 1, 0.36, 1],
            }}
            onClick={(event) => event.stopPropagation()}
            className="absolute inset-x-0 bottom-0 rounded-t-[32px] bg-white p-4 pb-7 shadow-[0_-30px_80px_rgba(0,0,0,0.14)] sm:bottom-5 sm:left-auto sm:right-5 sm:w-[420px] sm:rounded-[30px] sm:p-5"
          >
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-black/10 sm:hidden" />

            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black/30">
                  Share with your people
                </p>

                <h2 className="mt-2 text-[32px] font-semibold leading-none tracking-[-0.065em] text-black">
                  {target.title}
                </h2>
              </div>

              <button
                type="button"
                aria-label="Close sharing panel"
                onClick={closePanel}
                className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#f4f4f2]"
              >
                <X size={16} />
              </button>
            </div>

            <p className="mt-5 text-[13px] leading-relaxed text-black/45">
              Send this link to friends so they can open it directly on SPOTTED.
            </p>

            <div className="mt-6 space-y-2">
              <button
                type="button"
                onClick={shareThroughWhatsApp}
                className="flex w-full items-center justify-between rounded-[20px] bg-[var(--accent)] px-4 py-4 text-left"
              >
                <div>
                  <p className="text-[13px] font-semibold text-black">
                    Share through WhatsApp
                  </p>

                  <p className="mt-1 text-[10px] text-black/45">
                    Send the direct SPOTTED link
                  </p>
                </div>

                <ExternalLink size={16} />
              </button>

              <button
                type="button"
                onClick={shareUsingDevice}
                className="flex w-full items-center justify-between rounded-[20px] bg-[#f4f4f2] px-4 py-4 text-left"
              >
                <div>
                  <p className="text-[13px] font-semibold text-black">
                    Share using device
                  </p>

                  <p className="mt-1 text-[10px] text-black/40">
                    Open your phone’s sharing options
                  </p>
                </div>

                <Share2 size={16} />
              </button>

              <button
                type="button"
                onClick={copyShareLink}
                className="flex w-full items-center justify-between rounded-[20px] bg-[#f4f4f2] px-4 py-4 text-left"
              >
                <div>
                  <p className="text-[13px] font-semibold text-black">
                    {copied ? "Link copied" : "Copy place link"}
                  </p>

                  <p className="mt-1 max-w-[280px] truncate text-[10px] text-black/40">
                    {shareUrl}
                  </p>
                </div>

                {copied ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
