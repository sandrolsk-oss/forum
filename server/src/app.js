import express from 'express';
import cors from 'cors';

const app = express();

const corsOptions = {
    origin: true, // Dynamically allow request origin (useful for LAN testing)
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

import authRoutes from './routes/authRoutes.js';
import topicRoutes from './routes/topicRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import userRoutes from './routes/userRoutes.js';

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/topics', topicRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);

// Root System Status
app.get('/', (req, res) => {
    res.json({
        status: 'ONLINE',
        system: 'Cyberpunk Node Mainframe',
        message: 'Welcome to the backend API. Endpoints are located at /api/*',
    });
});

// 404 handler
app.use((req, res, next) => {
    res.status(404).json({ error: 'Endpoint missing in cyberspace.' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('[SYS_ERR]', err.stack);
    res.status(500).json({ error: 'Critical system failure. Contact NetWatch.' });
});

export default app;
