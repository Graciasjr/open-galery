import {pb} from "./locals"


export class httpService{

    static async GET(urlParams){
        // const res = await handler('GET',urlParams)
        const res = await pb.collection('openGalery').getOne(urlParams,{
            expand:'fileId,fileDataId'
        });
        return await res
    }
}