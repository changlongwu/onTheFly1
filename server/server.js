import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import tripsRouter from './routes/trips.js'
import activitiesRouter from './routes/activities.js'
import destinationsRouter from './routes/destinations.js'
import tripDestinationsRouter from './routes/trip_destinations.js'
// dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).send('Hello World')
})

app.use('/trips', tripsRouter)
app.use('/activities', activitiesRouter)
app.use('/destinations', destinationsRouter)
app.use('/trip-destinations', tripDestinationsRouter)
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
})