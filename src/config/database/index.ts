import { IConfig } from "./type";

const config: IConfig = {
    mongoURI: process.env.DB_URI || 'mongodb://localhost:27017',
    dbName: process.env.DB_NAME || 'TODO',
};
  
export default config;