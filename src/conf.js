const conf ={
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId:String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDbId:String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteTPCollectionId:String(import.meta.env.VITE_APPWRITE_TP_COLLECTION_ID),
    appwriteSUBCollectionId:String(import.meta.env.VITE_APPWRITE_SUB_COLLECTION_ID),
    appwriteECCollectionId:String(import.meta.env.VITE_APPWRITE_EC_COLLECTION_ID),
    appwriteSTUDCollectionId:String(import.meta.env.VITE_APPWRITE_STUD_COLLECTION_ID),
    appwriteAKSCollectionId:String(import.meta.env.VITE_APPWRITE_AKS_COLLECTION_ID),
    appwriteBucketId:String(import.meta.env.VITE_APPWRITE_BUCKET_ID),

}

export default conf