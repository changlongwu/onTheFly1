import express from 'express'
import tripsController from '../controllers/trips.js'

const router = express.Router()


router.post('/', tripsController.createTrip)
router.get('/', tripsController.getTrips)
router.get('/:id', tripsController.getTripById)
router.put('/:id', tripsController.updateTrip)
router.delete('/:id', tripsController.deleteTrip)

export default router