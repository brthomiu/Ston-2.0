import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function HomeAbout1() {
  const ref = useRef(null);
  const isInView = useInView(ref);

  return (
    <section>
      <div className="flex flex-col z-20 mt-16 pt-32 pb-4 bg-ston-yellow2 lg:mt-0 lg:pt-24">
        <h1 className="ml-4 text-left text-ston-green font-bold text-[4.5em]">
          Discover
        </h1>
        <h2 className="ml-4 mb-16 text-left text-ston-brown font-bold">
          New Recipes
        </h2>
        <motion.div
          ref={ref}
          transition={{ duration: 0.3 }}
          animate={{
            opacity: isInView ? 1 : 0,
            translateX: isInView ? 0 : -500,
          }}
        >
          <h3 className="-mt-2 text-ston-brown font-bold">
            Cook • Share • Learn
          </h3>
          <h3 className="mt-12 text-ston-brown font-bold">
            Cook • Share • Learn
          </h3>
          <h3 className="mt-12 text-ston-brown font-bold">
            Cook • Share • Learn
          </h3>
          <h3 className="mt-12 text-ston-brown font-bold">
            Cook • Share • Learn
          </h3>
          <h3 className="mt-12 text-ston-brown font-bold">
            Cook • Share • Learn
          </h3>
          <h3 className="mt-12 text-ston-brown font-bold">
            Cook • Share • Learn
          </h3>
          <h3 className="mt-12 text-ston-brown font-bold">
            Cook • Share • Learn
          </h3>
        </motion.div>
      </div>
    </section>
  );
}
