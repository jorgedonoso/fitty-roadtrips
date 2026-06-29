"use client";

import { useState } from "react";
import { Location } from "@/src/types/Location";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

export function Gallery({ locations }: { locations: Location[] }) {
  const [selected, setSelected] = useState<Location | null>(null);

  return (
    <>
      <div className="w-full flex flex-wrap justify-center gap-8 p-6">
        {locations?.map((location, index) => {
          // Alternate rotation.
          const rotation = index % 2 === 0 ? -2 : 2;

          return (
            <div
              key={location.id}
              onClick={() => setSelected(location)}
              style={{ transform: `rotate(${rotation}deg)` }}
              className="cursor-pointer bg-white p-4 shadow-lg w-65
                         transition-all duration-300 ease-out
                         hover:shadow-xl hover:scale-105"
            >
              <div className="overflow-hidden bg-gray-100">
                <Image
                  src={location.imageThumbUrl}
                  alt={location.title}
                  width={256}
                  height={256}
                  className="object-cover w-full h-55"
                />
              </div>

              <div className="text-center pt-4 font-polaroid">
                <p className="text-sm uppercase tracking-widest text-gray-600">
                  {location.title}
                </p>
                <p className="text-xs text-gray-400">
                  {location.city}, {location.state}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-9999 bg-[#aad3e0]/50 flex items-center justify-center"
            onClick={() => setSelected(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative max-w-4xl w-full m-6 p-6 shadow-lg bg-white"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              onClick={() => setSelected(null)}
            >
              <Image
                src={selected.imageUrl}
                alt={selected.title}
                width={1080}
                height={1080}
                className="w-full h-auto shadow-2xl object-contain"
              />

              <div className="text-center pt-4 pb-6 font-polaroid">
                <p className="text-4xl uppercase tracking-widest text-gray-600">
                  {selected.title}
                </p>
                <p className="text-2xl text-gray-400">
                  {selected.city}, {selected.state}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
