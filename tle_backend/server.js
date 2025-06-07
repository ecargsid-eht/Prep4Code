import express from 'express';
import contests from './routes/contestRoutes.js';
import auths from './routes/authRoutes.js'
import logger from './middleware/logger.js';
import errorHandler from './middleware/error.js';
import notFound from './middleware/not_found.js';
import mongoose from 'mongoose';
import cors from 'cors'
import cron from 'node-cron';
import { fetchAndSaveContests } from './services/fetchContests.js';
import { updateContestsWithVideos } from './services/fetchSolutions.js';


const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors("https://prep4-code.vercel.app/"))
// Logger middleware
app.use(logger)
// Routes
app.use('/api/contests', contests);
app.use('/api/auth', auths)

app.use(notFound)

// Error Handler
app.use(errorHandler)
const PORT = process.env.PORT || 8000;

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('connected to db');
        app.listen(PORT, () => console.log(`server is running on port ${PORT}`))
        updateContestsWithVideos();
    })
    .catch((err) => {
        console.log(err.message);
    })
// ...existing code...

cron.schedule('0 */4 * * *', () => {
    fetchAndSaveContests();
})

cron.schedule('0 */4 * * *', () => {
    updateContestsWithVideos();
});
