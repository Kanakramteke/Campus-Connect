const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize express
const app = express();

// Enhanced error handler middleware
const errorHandler = (err, req, res, next) => {
    console.error('❌ Error:', err.stack);

    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
};

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Debug middleware
app.use((req, res, next) => {
    console.log(`📝 ${req.method} ${req.url}`);

    if (req.body && Object.keys(req.body).length) {
        console.log('Request Body:', req.body);
    }

    next();
});

// ===================================================
// Routes
// ===================================================

// Authentication routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// User routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// Registration routes
const registrationRoutes = require('./routes/registrationRoutes');
app.use('/api/registrations', registrationRoutes);

// Discussion routes
const discussionRoutes = require('./routes/discussionRoutes');
app.use('/api/discussions', discussionRoutes);

// Team routes
const teamRoutes = require('./routes/teamRoutes');
app.use('/api/teams', teamRoutes);

// Event routes
const eventRoutes = require('./routes/eventRoutes');
app.use('/api/events', eventRoutes);

// ===================================================
// MongoDB connection
// ===================================================

const connectDB = async () => {
    try {
        await mongoose.connect(
            process.env.MONGO_URI ||
            'mongodb://localhost:27017/campusconnect'
        );

        console.log('✅ Connected to MongoDB');
    } catch (err) {
        console.error('❌ MongoDB connection error:', err.message);
        console.log('⏳ Retrying connection in 5 seconds...');

        setTimeout(connectDB, 5000);
    }
};

// ===================================================
// Health check route
// ===================================================

app.get('/', (req, res) => {
    res.json({
        success: true,
        message: '🚀 Campus Connect API is running',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// ===================================================
// Error handling
// ===================================================

app.use(errorHandler);

// ===================================================
// Server startup
// ===================================================

const startServer = async (port) => {
    return new Promise((resolve, reject) => {
        const server = app.listen(port)
            .once('listening', () => {
                console.log(`
===================================================
🚀 Campus Connect Backend Server Running
📍 Address: http://localhost:${port}
⚙️  Environment: ${process.env.NODE_ENV || 'development'}
📅 Time: ${new Date().toISOString()}
===================================================
                `);

                resolve(server);
            })
            .once('error', err => {
                if (err.code === 'EADDRINUSE') {
                    console.log(
                        `⚠️ Port ${port} is busy, trying ${port + 1}`
                    );

                    resolve(startServer(port + 1));
                } else {
                    reject(err);
                }
            });

        // Graceful shutdown
        process.on('SIGTERM', () => {
            console.log('🛑 Received SIGTERM. Performing graceful shutdown...');

            server.close(() => {
                mongoose.connection.close(false, () => {
                    console.log('💤 Server and MongoDB connection closed');
                    process.exit(0);
                });
            });
        });
    });
};

// ===================================================
// Initialize server
// ===================================================

const PORT = process.env.PORT || 5000;

connectDB()
    .then(async () => {
        try {
            await startServer(PORT);
        } catch (err) {
            console.error('❌ Failed to start server:', err);
            process.exit(1);
        }
    })
    .catch(err => {
        console.error('❌ Failed to connect to database:', err);
        process.exit(1);
    });