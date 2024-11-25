import Pocketbase from 'pocketbase'

const pb = new Pocketbase(import.meta.env.VITE_API_BASE_URL);


export {pb}