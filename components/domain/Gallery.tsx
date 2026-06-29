"use client";

import { useState } from "react";
import { Location } from "@/src/types/Location";
import { AnimatePresence, motion } from "framer-motion";
import { Polaroid } from "./Polaroid";

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
            >
              <Polaroid location={location} isModal={false} />
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
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              onClick={() => setSelected(null)}
            >
              <Polaroid location={selected} isModal={true} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
