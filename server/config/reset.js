import { pool } from './database.js'
import './dotenv.js'
import {fileURLToPath} from 'url'
import path, { dirname } from 'path'
import fs from 'fs'

const currentPath = fileURLToPath(import.meta.url)
const tripsFile = fs.readFileSync(path.join(currentPath, '../data/data.json'))

const tripsData = JSON.parse(tripsFile)


const createTripsTable = async () => {
    const createTripsTableQuery = `
        CREATE TABLE IF NOT EXISTS trips (
            id serial PRIMARY KEY,
            title varchar(100) NOT NULL,
            description varchar(500) NOT NULL,
            img_url text NOT NULL,
            num_days integer NOT NULL,
            start_date date NOT NULL,
            end_date date NOT NULL,
            total_cost money NOT NULL
        );
    `

    try {
        const res = await pool.query(createTripsTableQuery)
        console.log('🎉 trips table created successfully')
      } catch (error) {
        console.error('❌ error creating trips table', error)
        }
    
  }

const createDestinationsTable = async () => {
    const createDestinationsTableQuery = `
    CREATE TABLE IF NOT EXISTS destinations (
        id serial PRIMARY KEY,
        destination varchar(100) NOT NULL,
        description varchar(500) NOT NULL,
        city varchar(100) NOT NULL,
        country varchar(100) NOT NULL,
        img_url text NOT NULL,
        flag_img_url text NOT NULL
    );
        `

    try {
        const res = await pool.query(createDestinationsTableQuery)
        console.log('🎉 destinations table created successfully')
    } catch (error) {
        console.error('❌ error creating destinations table', error)
    }
}

const createActivitiesTable = async () => {
    const createActivitiesTableQuery = `
        CREATE TABLE IF NOT EXISTS activities (
            id serial PRIMARY KEY,
            trip_id int NOT NULL,
            activity varchar(100) NOT NULL,
            num_votes integer DEFAULT 0,
            FOREIGN KEY(trip_id) REFERENCES trips(id)
        );
    `

    try {
        const res = await pool.query(createActivitiesTableQuery)
        console.log('🎉 activities table created successfully')
    } catch (error) {
        console.error('❌ error creating activities table', error)
    }   
}

const createTripDestinationsTable = async () => {
    const createTripsDestinationsTableQuery = `
    CREATE TABLE IF NOT EXISTS trips_destinations (
        trip_id int NOT NULL,
        destination_id int NOT NULL,
        PRIMARY KEY (trip_id, destination_id),
        FOREIGN KEY (trip_id) REFERENCES trips(id) ON UPDATE CASCADE,
        FOREIGN KEY (destination_id) REFERENCES destinations(id) ON UPDATE CASCADE
    );
        `

    try {
        const res = await pool.query(createTripsDestinationsTableQuery)
        console.log('🎉 trips_destinations table created successfully')
    } catch (error) {
        console.error('❌ error creating trips_destinations table', error)
    }
}

const createUsersTable = async () => {
    const createUsersTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
          id serial PRIMARY KEY,
          githubid integer NOT NULL,
          username varchar(100) NOT NULL,
          avatarurl varchar(500) NOT NULL,
          accesstoken varchar(500) NOT NULL
        );
    `

    try {
        const res = await pool.query(createUsersTableQuery)
        console.log('🎉 users table created successfully')
    } catch (error) {
        console.error('❌ error creating users table', error)
    }
}

const createTripsUsersTable = async () => {
    const createTripsUsersTableQuery = `      
    CREATE TABLE IF NOT EXISTS trips_users (
          trip_id int NOT NULL,
          user_id int NOT NULL,
          PRIMARY KEY (trip_id, user_id),
          FOREIGN KEY (trip_id) REFERENCES trips(id) ON UPDATE CASCADE,
          FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE
      );
  `

    try {
        const res = await pool.query(createTripsUsersTableQuery)
        console.log('🎉 trips_users table created successfully')
    } catch (error) {
        console.error('❌ error creating trips_users table', error)
    }
}


const seedTripsTable = async () => {
    await createTripsTable()

    tripsData.forEach((trip) => {
        const insertQuery = {
            text: 'INSERT INTO trips (title, description, img_url, num_days, start_date, end_date, total_cost) VALUES ($1, $2, $3, $4, $5, $6, $7)'
        }
    
        const values = [
            trip.title,
            trip.description,
            trip.img_url,
            trip.num_days,
            trip.start_date,
            trip.end_date,
            trip.total_cost
        ]

        pool.query(insertQuery, values, (err, res) => {
            if (err) {
                console.error('❌ error inserting trip', err)
            } else {
                console.log('✅ trip inserted successfully', res.rows[0])
            }
        })

    })

}


// seedTripsTable()
createTripsTable()
createDestinationsTable()
createActivitiesTable()
createTripDestinationsTable()
createUsersTable()
createTripsUsersTable()