import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

/* eslint-disable jsx-a11y/media-has-caption */
export default function HomeAbout2() {
  const ref = useRef(null);
  const isInView = useInView(ref);
  return (
    <section>
      <div className="flex flex-col -mt-8 pt-32 pb-4 bg-ston-brown lg:mt-0 lg:pt-0">
        <h1 className="ml-4 text-left text-ston-yellow2 font-bold text-[4.5em]">
          Create
        </h1>
        <h2 className="ml-4 mb-16 text-left text-ston-yellow1 font-bold">
          Tasty Meals
        </h2>

        <motion.div
          ref={ref}
          transition={{ duration: 0.3 }}
          animate={{
            opacity: isInView ? 1 : 0,
            translateX: isInView ? 0 : 500,
          }}
        >
          <h3 className="-mt-2 text-ston-yellow1 font-bold">
            Cook • Share • Learn
          </h3>
          <h3 className="mt-12 text-ston-yellow1 font-bold">
            Cook • Share • Learn
          </h3>
          <h3 className="mt-12 text-ston-yellow1 font-bold">
            Cook • Share • Learn
          </h3>
          <h3 className="mt-12 text-ston-yellow1 font-bold">
            Cook • Share • Learn
          </h3>
          <h3 className="mt-12 text-ston-yellow1 font-bold">
            Cook • Share • Learn
          </h3>
          <h3 className="mt-12 text-ston-yellow1 font-bold">
            Cook • Share • Learn
          </h3>
        </motion.div>
      </div>
    </section>
  );
}
