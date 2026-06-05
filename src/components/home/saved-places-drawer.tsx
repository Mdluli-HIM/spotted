"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, X } from "lucide-react";

import type { Place } from "@/types/place";

type SavedPlacesDrawerProps = {
  open: boolean;
  savedPlaces: Place[];
  onClose: () => void;
  onSelectPlace: (place: Place) => void;
  onRemovePlace: (placeId: string) => void;
};

export function SavedPlacesDrawer({
  open,
  savedPlaces,
  onClose,
  onSelectPlace,
  onRemovePlace,
}: SavedPlacesDrawerProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
            className="absolute bottom-0 right-0 top-0 w-full max-w-[430px] bg-[#fcfcfb] px-5 py-5 shadow-[-30px_0_80px_rgba(0,0,0,0.12)] max-md:top-auto max-md:h-[86vh] max-md:max-w-none max-md:rounded-t-[34px]"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black/30">
                  Your saved spots
                </p>

                <h2 className="mt-2 text-[38px] font-semibold leading-none tracking-[-0.07em] text-black">
                  Saved places
                </h2>
              </div>

              <button
                onClick={onClose}
                className="flex size-11 items-center justify-center rounded-full bg-[#f4f4f2]"
              >
                <X size={18} />
              </button>
            </div>

            {savedPlaces.length === 0 ? (
              <div className="mt-12 rounded-[28px] bg-[#f2f0ea] p-7">
                <div className="flex size-12 items-center justify-center rounded-full bg-white">
                  <Heart size={18} />
                </div>

                <h3 className="mt-6 text-[30px] font-semibold leading-none tracking-[-0.06em] text-black">
                  Nothing saved yet.
                </h3>

                <p className="mt-4 text-[13px] leading-relaxed text-black/45">
                  Save places you want to visit, review, or send to your friends
                  later.
                </p>
              </div>
            ) : (
              <div className="no-scrollbar mt-8 space-y-3 overflow-y-auto pb-8">
                {savedPlaces.map((place) => (
                  <div
                    key={place.id}
                    className="flex items-center gap-3 rounded-[26px] bg-[#f2f0ea] p-3"
                  >
                    <button
                      onClick={() => onSelectPlace(place)}
                      className="flex flex-1 items-center gap-3 text-left"
                    >
                      <div className="relative size-20 shrink-0 overflow-hidden rounded-[20px]">
                        <Image
                          src={place.image}
                          alt={place.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>

                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-black/35">
                          {place.area}
                        </p>

                        <h3 className="mt-1 text-[22px] font-semibold leading-none tracking-[-0.06em] text-black">
                          {place.name}
                        </h3>

                        <p className="mt-2 text-[12px] text-black/45">
                          ★ {place.rating}
                        </p>
                      </div>
                    </button>

                    <button
                      onClick={() => onRemovePlace(place.id)}
                      className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-black"
                    >
                      <X size={15} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
