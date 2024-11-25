import { useState, useEffect} from 'react';
import {useSearchParams} from 'react-router-dom';
import {motion} from 'framer-motion'
import {httpService} from './lib/service'
import { Heart,Smile, Download } from 'lucide-react';
import PhotoGrid from './lib/components/PhotoGrid';
import AlbumGrid from './lib/components/AlbumGrid';
import LandingPage from './lib/components/LandingPage';
import { Photo, Album } from './types';


function App() {
  const [photo,setPhoto] = useState<Photo[]>([])
  const [album,setAlbum]= useState<Album>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isWatcher,setIsWatcher] = useState(false)
  const [currentAlbumId, setCurrentAlbumId] = useState<string | null>(null);
  const [queryParameters] = useSearchParams()

  useEffect(() => {
        
    const timer = setTimeout(async() => {
      const linkTarget = queryParameters.get('target')
      const getPhotos = await httpService.GET(linkTarget)
      if(!getPhotos?.children){
        const imgg = getPhotos?.expand?.fileDataId
        imgg['file']=getPhotos?.expand?.fileId.file
        setPhoto([imgg])
        setCurrentAlbumId(getPhotos?.id)
        
      }else{
        // console.log(getPhotos)
        setAlbum(await getPhotos)
        setPhoto(await getPhotos?.children.idx)
      }    
      setIsLoading(false);
      linkTarget?setIsWatcher(!isWatcher):''
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // const handleUpload = (file: File, title: string) => {
  //   const newPhoto: Photo = {
  //     id: Date.now().toString(),
  //     url: URL.createObjectURL(file),
  //     title,
  //     author: 'Current User',
  //     likes: 0,
  //     comments: [],
  //     reactions: [],
  //     albumId: currentAlbumId || undefined
  //   };
  //   setPhotos([newPhoto, ...photos]);
  // };


  return (
      <>
        {
          isWatcher?(
          <div className="min-h-screen bg-gray-50">
            {
              currentAlbumId?(
                <header className="bg-zinc-50 shadow-smS border-b sticky top-0 z-10">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex flex-col items-start justify-center space-y-2">
                      <div className="flex items-center space-x-4">
                        <h1 className="text-2xl font-bold text-gray-900">
                          {album?.expand.fileDataId.name}
                        </h1>
                      </div>
                      <div className='flex space-x-7'>
                        <motion.button whileHover={{scale:1.1}} whileTap={{ scale: 0.9 }} className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors">
                          <Heart size={18} className="transition-transform hover:scale-110" />
                          <span className="text-sm">{10}</span>
                        </motion.button>
                        <motion.button  whileHover={{scale:1.1}} whileTap={{ scale: 0.9 }} className="flex space-x-1 items-center text-gray-500 hover:text-yellow-500 transition-colors">
                            <Smile size={18} />
                            <span className="text-sm">0</span>
                        </motion.button>
                        <motion.button whileHover={{scale:1.1}} whileTap={{ scale: 0.9 }} className="border flex space-x-2 text-[14px] px-2 py-1 rounded-lg items-center text-gray-500 hover:text-green-500 transition-colors">
                          <Download size={18} />
                          <span>Télécharger</span>
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </header>
              ):''
            }
            <main className="max-w-7xl mx-auto">
              {currentAlbumId ? (
                <PhotoGrid photos={photo} onPhotoClick={(photo) => { console.log('Photo clicked:', photo);}} isLoading={isLoading}/>
              ) : (
                <AlbumGrid album={album} onAlbumClick={() => { setCurrentAlbumId(album?.id)}} isLoading={isLoading}/>
              )}
            </main>
          </div>):
        <LandingPage/>
        }
    </>
  );
}

export default App;