import React from 'react';
import { motion } from 'framer-motion';

const images = [
  {
    url: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4',
    category: 'Portrait'
  },
  {
    url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05',
    category: 'Paysage'
  },
  {
    url: 'https://images.unsplash.com/photo-1497671954146-59a89ff626ff',
    category: 'Architecture'
  },
  {
    url: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888',
    category: 'Street'
  },
  {
    url: 'https://images.unsplash.com/photo-1496318447583-f524534e9ce1',
    category: 'Gastronomie'
  },
  {
    url: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04',
    category: 'Sport'
  }
];

export default function ImageCarousel() {
  return (
    <div className="w-full overflow-hidden bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">
          Des photos qui racontent des histoires
        </h2>
        
        <motion.div
          animate={{
            x: [0, -2000],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
          className="flex gap-8"
        >
          {[...images, ...images].map((image, index) => (
            <div
              key={index}
              className="relative flex-none w-80 h-96 rounded-xl overflow-hidden"
            >
              <img
                src={image.url}
                alt={image.category}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <p className="absolute bottom-4 left-4 text-white font-medium">
                {image.category}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}