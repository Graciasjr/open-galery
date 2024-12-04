import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Share2,Smile, Download, Wand2 } from 'lucide-react';
import { Photo,Reaction} from '../../types';
import {csCompress} from '../modules/cscompress';
import {handleDownload} from '../../utils/'
import ReactionPicker from './ReactionPicker';

interface PhotoCardProps {
  photo: Photo;
  onClick: () => void;
  onAddReaction: (type: Reaction['type']) => void;
}

export default function PhotoCard({ photo, onClick,onAddReaction }: PhotoCardProps) {
  const [aspectRatio, setAspectRatio] = useState<number>(1);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showReactions, setShowReactions] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [url,setUrl]=useState()

  const getImageUrl = async()=>{
    const fileId = photo.fileId
    const file = photo.file
    const fetched = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/files/files/${fileId}/${file}`)
    const blob = await fetched.blob();
    const coverRebuild = new File([blob],photo.name,{type:photo.nativeMimeType});
    const ext = photo.ext

    const compresse = new csCompress(coverRebuild,ext);
    const decompressedFile =await compresse.inflater();
    setUrl(URL.createObjectURL(decompressedFile))
  }

  useEffect(() => {
    setTimeout(async() => {
      await getImageUrl();
      const img = new Image();
      img.src = url?.url;
      img.onload = () => {
        setAspectRatio(img.naturalWidth / img.naturalHeight);
      };      
      setIsLoaded(!isLoaded)
      // console.log(url)
    },2000);
  }, [photo]);
  
  const imageHeight = aspectRatio < 1 ? '400px' : '300px';
  // const imageHeight = () => {
  //   if (aspectRatio > 1.5) return '300px';  // Images très larges
  //   if (aspectRatio < 0.7) return '500px';  // Images très hautes
  //   return '400px';  // Images moyennes
  // };
  
  

  return (
    <motion.div  layout initial={{opacity:0,y:20}} animate={{ opacity: isLoaded ? 1 : 0, y: 0 }} className={`rounded-md shadow-md overflow-hidden transition-all duration-300 hover:scale-[1.02] cursor-pointer ${isLoaded ? 'opacity-100' : 'opacity-0'}`} onClick={onClick}>
      <div className="relative group">
        <motion.img  src={url} alt={photo.name} style={{ height: imageHeight}} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" layoutId={`photo-${photo.id}`}/>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>        
      </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="font-medium text-lg mb-1 text-white drop-shadow-lg">{photo.name}</h3>
          {/* <p className="text-sm text-white/90">by {photo.author}</p> */}
          <p className="text-sm text-white/90">by Gracias_Jr</p>
        </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
            <motion.button onClick={async()=>{await handleDownload(isDownloading,setIsDownloading,url,photo.name)}} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="text-gray-500 hover:text-green-500 transition-colors disabled:opacity-50" disabled={isDownloading}>
              <Download size={18} />
            </motion.button>
          </div>
          <div className="flex items-center space-x-4">
            <motion.button whileHover={{scale:1.1}} whileTap={{ scale: 0.9 }}
             className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors">
              <Heart size={18} className="transition-transform hover:scale-110" />
              <span className="text-sm">{0}</span>
            </motion.button>
            {/* <motion.button whileHover={{scale:1.1}} whileTap={{ scale: 0.9 }} className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors">
              <MessageCircle size={18} className="transition-transform hover:scale-110" />
              <span className="text-sm">0</span>
            </motion.button> */}
            <div className="relative">
              <motion.button onClick={
                ()=>{console.log('')}
                // () => setShowReactions(!showReactions)} whileHover={{scale:1.1}} whileTap={{ scale: 0.9 }
              }
                 className="flex space-x-1 items-center text-gray-500 hover:text-yellow-500 transition-colors">
                  <Smile size={18} />
                  <span className="text-sm">0</span>
              </motion.button>
              <AnimatePresence>
                {showReactions && (
                    <ReactionPicker onSelect={(type) => { onAddReaction(type);setShowReactions(false);}} reactions={photo.reactions}/>
                  )}
              </AnimatePresence>

            </div>
          </div>
         
        </div>
      </div>
    </motion.div>
  );
}