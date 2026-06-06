"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Bookmark,
  CheckCircle2,
  Map,
  MessageCircle,
  Plus,
  X,
} from "lucide-react";

import { BrandWordmark } from "@/components/brand/brand-wordmark";
import { ShareButton } from "@/components/sharing/share-button";
import { buildAppShareTarget } from "@/lib/share-links";

type AppMenuProps = {
  open: boolean;
  onClose: () => void;
};

const menuItems = [
  {
    label: "Discover places",
    description: "Find somewhere that fits the moment.",
    href: "/",
    icon: Map,
  },
  {
    label: "Community stories",
    description: "See where people have been going.",
    href: "/stories",
    icon: MessageCircle,
  },
  {
    label: "Saved places",
    description: "Return to places you want to visit.",
    href: "/saved",
    icon: Bookmark,
  },
  {
    label: "Visited places",
    description: "See places you have already experienced.",
    href: "/visited",
    icon: CheckCircle2,
  },
  {
    label: "Add a place",
    description: "Help the community discover somewhere new.",
    href: "/contribute",
    icon: Plus,
  },
];

export function AppMenu({ open, onClose }: AppMenuProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] bg-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="mx-auto flex min-h-dvh w-full max-w-[1500px] flex-col px-4 py-4 sm:px-8 sm:py-7 lg:px-16 lg:py-9">
            <header className="flex items-center justify-between">
              <BrandWordmark />

              <button
                type="button"
                aria-label="Close menu"
                onClick={onClose}
                className="flex size-11 items-center justify-center rounded-full bg-[#f4f4f2]"
              >
                <X size={18} />
              </button>
            </header>

            <div className="grid flex-1 gap-10 py-12 lg:grid-cols-[1fr_0.55fr] lg:items-end">
              <nav className="space-y-2">
                {menuItems.map((item, index) => {
                  const Icon = item.icon;

                  const active =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href);

                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.045 }}
                    >
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={`group flex items-center justify-between gap-5 rounded-[26px] px-4 py-4 transition-colors sm:px-5 ${
                          active
                            ? "bg-[var(--accent)]"
                            : "bg-[#f4f4f2] hover:bg-[#eaeae6]"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white">
                            <Icon size={17} />
                          </span>

                          <div>
                            <p className="text-[19px] font-semibold leading-none tracking-[-0.045em] text-black sm:text-[25px]">
                              {item.label}
                            </p>

                            <p className="mt-2 text-[11px] text-black/40">
                              {item.description}
                            </p>
                          </div>
                        </div>

                        <ArrowUpRight
                          size={18}
                          className="shrink-0 transition-transform group-hover:rotate-45"
                        />
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <aside>
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black/30">
                  SPOTTED
                </p>

                <h2 className="mt-3 max-w-[500px] text-[44px] font-semibold leading-[0.9] tracking-[-0.075em] text-black sm:text-[62px]">
                  Good places are better when they are shared.
                </h2>

                <p className="mt-5 max-w-[420px] text-[13px] leading-relaxed text-black/45">
                  Send SPOTTED to friends and discover somewhere together.
                </p>

                <ShareButton
                  target={buildAppShareTarget()}
                  label="Share SPOTTED"
                  className="mt-7 flex items-center gap-3 rounded-full bg-black px-5 py-4 text-[12px] font-semibold text-white"
                />
              </aside>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
