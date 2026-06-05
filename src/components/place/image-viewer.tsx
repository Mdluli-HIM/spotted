"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

type ImageViewerProps = {
  images: string[];
  activeIndex: number | null;
  onClose: () => void;
  onChangeIndex: (index: number) => void;
};

export function ImageViewer({
  images,
  activeIndex,
  onClose,
  onChangeIndex,
}: ImageViewerProps) {
  const activeImage = activeIndex === null ? null : images[activeIndex];

  function previousImage() {
    if (activeIndex === null) return;

    onChangeIndex(activeIndex === 0 ? images.length - 1 : activeIndex - 1);
  }

  function nextImage() {
    if (activeIndex === null) return;

    onChangeIndex(activeIndex === images.length - 1 ? 0 : activeIndex + 1);
  }

  return (
    <AnimatePresence>
      {activeImage && (
        <motion.div
          className="fixed inset-0 z-[80] bg-black text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Image
            src={activeImage}
            alt="Place gallery image"
            fill
            sizes="100vw"
            className="object-contain"
          />

          <button
            type="button"
            onClick={onClose}
            className="absolute right-5 top-5 flex size-11 items-center justify-center rounded-full bg-white/14 backdrop-blur-xl"
          >
            <X size={18} />
          </button>

          <button
            type="button"
            onClick={previousImage}
            className="absolute left-5 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/14 backdrop-blur-xl"
          >
            <ArrowLeft size={17} />
          </button>

          <button
            type="button"
            onClick={nextImage}
            className="absolute right-5 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/14 backdrop-blur-xl"
          >
            <ArrowRight size={17} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
