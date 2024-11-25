import React from 'react';
import { Album } from '../../types';
import { FolderOpen } from 'lucide-react';
import Skeleton from './Skeleton';
import {csCompress} from '../modules/cscompress'

interface AlbumGridProps {
  album: Album
  onAlbumClick: () => void;
  isLoading?: boolean;
}

  export default function AlbumGrid({ album,onAlbumClick, isLoading }: AlbumGridProps) {
    const [coverImage,setCoverImage]= React.useState();
    const [alb,setAlb]=React.useState<Album>();
  
    const getCoverUrl =async()=>{
      let fileId =album.children?.idx[0].fileId
      const file = album.children?.idx[0]?.file
      const fetched = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/files/files/${fileId}/${file}`)
      const blob = await fetched.blob();
      const coverRebuild = new File([blob],album.children?.idx[0]?.name,{type:album.children?.idx[0].nativeMimeType});
      const ext = album.children?.idx[0]?.ext

      const compresse = new csCompress(coverRebuild,ext);
      const decompressedFile =await compresse.inflater();
      setCoverImage(URL.createObjectURL(decompressedFile))
    }
  React.useEffect(()=>{    
    setAlb(album.expand?.fileDataId)
    setTimeout(async() => {
      await getCoverUrl()
    },2000);
  },[album])

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} type="album" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        <div
          key={album.id}
          onClick={() => onAlbumClick()}
          className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]"
        >
          <div className="relative aspect-video">
            {album.children ? (
              <img
                src={coverImage}
                alt={album.expand?.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <FolderOpen size={48} className="text-gray-400" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-white font-semibold text-lg">{album.expand?.fileDataId.name}</h3>
              <p className="text-white/80 text-sm">{album?.children.idx.length} image{album?.children.idx.length>1?'s':''}</p>
            </div>
          </div>
          <div className="p-4">
            <p className="text-gray-600 text-sm line-clamp-2">{album.description}</p>
            <p className="text-gray-400 text-xs mt-2">
              {/* Created {new Date(album.expand?.fileDataId?.createdAt).toLocaleDateString()} */}
              Crée le {new Date(album.expand?.fileDataId?.created).toLocaleDateString()}
            </p>
          </div>
        </div>
    </div>
  );
}