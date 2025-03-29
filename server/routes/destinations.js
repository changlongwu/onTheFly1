import express from 'express'
import destinationsController from '../controllers/destinations.js'

const router = express.Router()

router.post('/', destinationsController.createDestination)
router.get('/', destinationsController.getDestinations)
router.get('/:id', destinationsController.getDestinationById)
router.delete('/:id', destinationsController.deleteDestination)
router.put('/:id', destinationsController.updateDestination)
export default router