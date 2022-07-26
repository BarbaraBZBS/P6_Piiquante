const express = require('express');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');

const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

const path = require('path');

mongoose.connect(process.env.MONGO_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connection to MongoDB successful !'))
    .catch(() => console.log('Connection to MongoDB failed !'));

app.use(express.json());
app.use(mongoSanitize());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});


app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(limiter);

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;