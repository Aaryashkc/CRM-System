import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './lib/mongodb.js';
import authRoutes from './routes/auth.route.js';
import clientRoutes from './routes/client.route.js';
import cookieParser from 'cookie-parser';
import dataRoutes from './routes/data.route.js';
import path from 'path';

dotenv.config();
const app = express();
const PORT=process.env.PORT || 5000;
const __dirname = path.resolve();



app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true, 
}
))

app.use('/api/auth', authRoutes)
app.use("/api/clients", clientRoutes);
app.use("/api/data", dataRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/dist')));
  app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
  });
}


app.listen(PORT, ()=>{
  console.log(`Server is running on port ${PORT}`);
  connectDB();
})