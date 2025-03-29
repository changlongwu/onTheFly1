import { pool } from '../config/database.js'

const createActivity = async (req, res) => {
    const { trip_id, activity } = req.body

    try {
        const results = await pool.query(
            'INSERT INTO activities (trip_id, activity) VALUES ($1, $2) RETURNING *',
            [trip_id, activity] // 只插入 trip_id 和 activity，num_votes 由默认值填充
        )

        res.status(201).json(results.rows[0])
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getActivities = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM activities')
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getTripActivities = async (req, res) => {
    const { trip_id } = req.params
    try {
        const results = await pool.query('SELECT * FROM activities WHERE trip_id = $1', [trip_id])
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const deleteActivity = async (req, res) => {
    const { id } = req.params
    try {
        await pool.query('DELETE FROM activities WHERE id = $1', [id])
        res.status(204).json({ message: 'Activity deleted successfully' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const updateActivity = async (req, res) => {
    const { id } = req.params
    const { activity } = req.body
    try {
        const results = await pool.query('UPDATE activities SET activity = $1 WHERE id = $2', [activity, id])
        // I want to show the updated activity in the response
        const updatedActivity = await pool.query('SELECT * FROM activities WHERE id = $1', [id])
        res.status(200).json(updatedActivity.rows[0])
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export default {
    createActivity,
    getActivities,
    getTripActivities,
    deleteActivity,
    updateActivity
}



