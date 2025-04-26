import { Client, Databases, Storage, Query, Functions } from 'appwrite';
import conf from './conf';

const client = new Client();
client
    .setEndpoint(conf.appwriteUrl)   //API_endpoint
    .setProject(conf.appwriteProjectId);   //project_id

    const databases = new Databases(client);
    const storage = new Storage(client);
    const functions = new Functions(client);
    
    export { client, databases, storage, Query, functions };