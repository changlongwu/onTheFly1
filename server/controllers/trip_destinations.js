import {pool} from '../config/database.js'

const createTripDestination = async (req, res) => {
    const { trip_id, destination_id } = req.body
    try {
        const results = await pool.query('INSERT INTO trips_destinations (trip_id, destination_id) VALUES ($1, $2) RETURNING *', [trip_id, destination_id])
        res.status(201).json(results.rows[0])
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getTripDestinations = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM trips_destinations')
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}   

const getAllTrips = async (req, res) => {
    try{
        const destination_id  = parseInt(req.params.destinationId)
        const results = await pool.query('SELECT * FROM trips INNER JOIN trips_destinations ON trips.id = trips_destinations.trip_id WHERE trips_destinations.destination_id = $1', [destination_id])
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const getAllDestinations = async (req, res) => {
    try{
        const trip_id = parseInt(req.params.tripId)
        const results = await pool.query('SELECT * FROM destinations INNER JOIN trips_destinations ON destinations.id = trips_destinations.destination_id WHERE trips_destinations.trip_id = $1', [trip_id])
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

export default {
    createTripDestination,
    getTripDestinations,
    getAllTrips,
    getAllDestinations
}