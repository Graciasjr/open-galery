import { useState, useEffect} from 'react';
import {Route, Routes, useSearchParams} from 'react-router-dom';
import {motion} from 'framer-motion'
import {httpService} from './lib/service'
import { Heart,Smile, Download } from 'lucide-react';
import PhotoGrid from './lib/components/PhotoGrid';
import AlbumGrid from './lib/components/AlbumGrid';
import LandingPage from './lib/components/LandingPage';
import { Photo, Album } from './types';
import { MainContainer } from './lib/components/MainContainer';


function App() {
  const [photo,setPhoto] = useState<Photo[]>([])
  const [album,setAlbum]= useState<Album>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isWatcher,setIsWatcher] = useState(false)
  const [currentAlbumId, setCurrentAlbumId] = useState<string | null>(null);
  const [queryParameters] = useSearchParams()


  useEffect(() => {
        
    const timer = async() => {
      const linkTarget = queryParameters.get('target')
      linkTarget?setIsWatcher(!isWatcher):''
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
    }

    timer()

    // return () => clearTimeout(timer);
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
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path='/' element={<LandingPage/>}></Route>
          <Route path='/watch' element={<MainContainer/>}></Route>
        </Routes>
      </div>
       
    </>
  );
}

export default App;