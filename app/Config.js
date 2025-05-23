// Configure database settings
import { MongoClient } from 'mongodb';

class AppConfig {
  constructor() {
    // Apply singleton for database configuration
    if (!AppConfig.instance) {
      this.port = process.env.PORT || 3000;
      this.env = process.env.NODE_ENV || 'development';
      this.dbClient = null; // MongoDB client
      this.dbname = 'mochi_shop';
      AppConfig.instance = this;
    }

    return AppConfig.instance;
  }

  // Init database
  async initDB() {
    if (!this.dbClient) {
      const uri = process.env.MONGO_URI || 'mongodb://localhost:27017'; // Pass in mongoDB uri

      try {
        this.dbClient = new MongoClient(uri);
        await this.dbClient.connect();
        console.log('Connected to MongoDB');
      } 
      
      catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error; 
      }
    }
    
    return this.dbClient.db(this.dbName);
  }

}

export default AppConfig;