import mongoose from 'mongoose';
import 'dotenv/config';

class Database {
  constructor() {
    this._connect();
  }

  async _connect() {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('✅ Conectado ao MongoDB Atlas!');
    } catch (err) {
      console.error('❌ Falha na conexão:', err.message);
      process.exit(1);
    }
  }
}

export default new Database();
