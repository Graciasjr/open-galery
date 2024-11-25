import JSZip from 'jszip';
import pako from 'pako';


/**
 * class to zip and dezip file
 */
export class csCompress{
    constructor(file,ext){
        this.file = file;
        this.fileName = file.name;
        this.ext = ext;
        this.fileType = file.type;
    }

    /**
     * Sanitize file name without extensions
     * @param name
     */
    async fileNameSanitize(name){
        let index = name.indexOf('.');
        let newName =index!==-1?name.slice(0,index):name
        return newName;
    }
    
    /**
     * Convert File to Uint8Array
     * @param blobFileFormat
    */
    async readFileAsUint8Array(file){
        return new Promise((resolve)=>{
            const reader = new FileReader();
            reader.onload = ()=>{
                const arrayBuffer =reader.result
                const uint8Array = new Uint8Array(arrayBuffer)
                resolve(uint8Array);
            };
            reader.readAsArrayBuffer(file)
        });
    }

        
    /**
     * Convert Uint8ArrayFile to FileFormat
     * @param Uint8Array
     * @param fileName
     * @param fileExt
     * @param fileType
     */
    async readUint8ArrayAsFile(Uint8Array){
        const fileType = this.fileType;
        const fileName = await this.fileNameSanitize(await this.fileName);
        const toBlob = new Blob([Uint8Array],{type:fileType});
        const toFile = new File([toBlob],`${fileName}.${this.ext}`,{type:fileType})
        return toFile;        
    }

    
    /**
     * Deflate with pako and return deflatedFile(file format)
    */
    async deflater(){
        const Uint8Array = await this.readFileAsUint8Array(this.file);
        const deflatedData = pako.deflate(Uint8Array,{level:7});
        const deflatedFile = await this.readUint8ArrayAsFile(deflatedData)
        return deflatedFile;
    }
    

    /**
     * Inflate with pako and return inflatedFile(file Format)
     */
    async inflater(){
        const BlobtoBinary = await this.readFileAsUint8Array(this.file);
        const inflatedData = pako.inflate(BlobtoBinary);
        const inflatedFile = await this.readUint8ArrayAsFile(inflatedData);
        return inflatedFile;
    }

    /**
     * Zip file with JSZip and return it
     * @param deflatedFile
    */
    async zipper(deflatedFile){
        if(deflatedFile){
            const sanitFileName =await this.fileNameSanitize(this.fileName)
            const zip = new JSZip();
            zip.file(this.fileName,deflatedFile)
            const blobGen = await zip.generateAsync({type:'blob'});
            const ZipFileGen = new File([blobGen],`${sanitFileName}.zip`,{type:'application/zip'});
            return ZipFileGen;
        }
    }

    /**
     * Dezip file with JSZip and return it
     * @param zippedFile
     */
    async dezipper(zippedFile){
        if(zippedFile){
            const zip = new JSZip();
            const zipContents = await zip.loadAsync(zippedFile);
            const zipFileobjectKeys = Object.entries(zipContents.files);
            if(zipFileobjectKeys.length>0){
                const [fileName,file] = zipFileobjectKeys[0];
                const binaryData = await file.async('uint8array');
                const dezippedFile = new File([binaryData],fileName);
                return dezippedFile
            }

        }
    }    

    /**
     * Global zip file
     * Gzipe = deflated + zipper
     */
    async Gzipe(){
       const deflated =this.deflater();
       if(deflated){
            const zipped =await this.zipper(await deflated)
            return zipped;
       }
    }

    /**
     * Global dezipe File
     * Gdezipe = dezipped + inflated
     */
    async Gdezipe(){
        const dezipped =await this.dezipper(this.file);
        if(dezipped){
            const inflated =await this.inflater(dezipped);
            return inflated;
        }
    }   

};

export class csZip{
}