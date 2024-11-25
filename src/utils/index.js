export const handleDownload= async(stateGetter,stateSetter,fileSrc,fileName)=>{
    try {
      stateSetter(stateGetter)
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', fileSrc, true);
        xhr.responseType = 'blob';
  
        xhr.onload = () => {
        if (xhr.status === 200) {
            const blob = xhr.response;
            const a = document.createElement('a');
            a.href = window.URL.createObjectURL(blob);
            a.download = fileName;
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(a.href);
            document.body.removeChild(a);
            resolve();
        }else{
            reject('Dowload failed')
        }
        };
  
        xhr.send();
    });
    } catch (error) {
      console.error('Download failed:', error);
    }finally{
      stateSetter(!stateGetter)
    }
  }