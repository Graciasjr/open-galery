import React from 'react';
import Masonry from 'react-masonry-css';
import { motion,AnimatePresence } from 'framer-motion';
import PhotoCard from './PhotoCard';
import Skeleton from './Skeleton';
import { Photo } from '../../types';

interface PhotoGridProps {
  photos:Photo[];
  onPhotoClick: (photo: Photo) => void;
  isLoading?: boolean;
}

const breakpointColumns = {
  default: 3,
  1536: 3,
  1280: 3,
  1024: 2,
  768: 2,
  640: 1
};

export default function PhotoGrid({photos, onPhotoClick, isLoading }: PhotoGridProps) {
  if (isLoading) {
    return (
      <div className="grid-container">
        <Masonry breakpointCols={breakpointColumns} className="masonry-grid" columnClassName="masonry-grid-column">
          {Array.from({ length: 9 }).map((_, index) => (
            <div key={index} className="masonry-item">
              <Skeleton type="photo" />
            </div>
          ))}
        </Masonry>
      </div>
    );
  }

  React.useEffect(()=>{
    console.log('photos')
  },[photos])

  return (
    <div className="grid-container">
      <Masonry
        breakpointCols={breakpointColumns}
        className="masonry-grid"
        columnClassName="masonry-grid-column"
      >
          {photos.map((photoss,index) => (
            <motion.div key={photoss?.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.5 }} transition={{ delay: index * 0.1,duration: 0.3,ease: "easeOut"}} className="masonry-item">
                  <AnimatePresence>
                    <PhotoCard photo={photoss} onClick={() => onPhotoClick(photoss)} onAddReaction={()=>{}} />
                  </AnimatePresence>
                </motion.div>
          ))}
      </Masonry>
    </div>
  );
}