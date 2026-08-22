import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

import { connectDB } from './config/db.js';
import { seedDatabase } from './config/seed.js';

import authRoutes from './routes/authRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import tuitionRoutes from './routes/tuitionRoutes.js';
import distanceEdRoutes from './routes/distanceEdRoutes.js';
import facultyRoutes from './routes/facultyRoutes.js';
import admissionRoutes from './routes/admissionRoutes.js';
import certificateRoutes from './routes/certificateRoutes.js';
import portalRoutes from './routes/portalRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    institute: 'RATNAM COACHING CENTRE',
    established: 1998,
    primaryTagline: "Don't Sit Like a Rock, Work Like a Clock.",
    secondaryTagline: 'Building Careers Through Quality Education Since 1998.',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/tuitions', tuitionRoutes);
app.use('/api/distance-education', distanceEdRoutes);
app.use('/api/faculty', facultyRoutes);
app.use('/api/admissions', admissionRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/portal', portalRoutes);
app.use('/api/admin', adminRoutes);

// Error Middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    await seedDatabase();

    app.listen(PORT, () => {
      console.log(`🚀 Ratnam Coaching Centre Server running on port ${PORT}`);
      console.log(`🏛️ Established 1998 | "Don't Sit Like a Rock, Work Like a Clock."`);
    });
  } catch (error) {
    console.error('Server startup failed:', error);
    process.exit(1);
  }
};

startServer();
