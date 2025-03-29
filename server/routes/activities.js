import express from 'express'
import activitiesController from '../controllers/activities.js'

const router = express.Router()

router.post('/', activitiesController.createActivity)
router.get('/', activitiesController.getActivities)
router.get('/:trip_id', activitiesController.getTripActivities)
router.delete('/:id', activitiesController.deleteActivity)
router.put('/:id', activitiesController.updateActivity)
export default router
