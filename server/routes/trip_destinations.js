import express from 'express'
import tripDestinationsController from '../controllers/trip_destinations.js'

const router = express.Router()

router.post('/', tripDestinationsController.createTripDestination)
router.get('/', tripDestinationsController.getTripDestinations)
router.get('/trips/:destinationId', tripDestinationsController.getAllTrips)
router.get('/destinations/:tripId', tripDestinationsController.getAllDestinations)
export default router