const conf ={
    appwriteUrl : String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCategoryCollectionId : String(import.meta.env.VITE_APPWRITE_CATEGORY_COLLECTION_ID),
    appwriteProductCollectionId : String(import.meta.env.VITE_APPWRITE_PRODUCT_COLLECTION_ID),
    appwriteShippingCollectionId : String(import.meta.env.VITE_APPWRITE_SHIPPING_COLLECTION_ID),
    appwriteOrderCollectionId : String(import.meta.env.VITE_APPWRITE_ORDER_COLLECTION_ID),
    appwriteReviewCollectionId : String(import.meta.env.VITE_APPWRITE_REVIEW_COLLECTION_ID),
    appwriteFunctionId : String(import.meta.env.VITE_APPWRITE_FUNCTION_ID),
    appwriteBucketId : String(import.meta.env.VITE_APPWRITE_BUCKET_ID)
}

export default conf