import './App.css';
import React, { useState, useEffect } from 'react';
import { useRoutes } from 'react-router-dom'
import ReadTrips from './pages/ReadTrips'
import CreateTrip from './pages/CreateTrip'
import EditTrip from './pages/EditTrip'
import CreateDestination from './pages/CreateDestination';
import ReadDestinations from './pages/ReadDestinations'
import TripDetails from './pages/TripDetails'
import { Link } from 'react-router-dom'
import CreateActivity from './pages/CreateActivity';
import AddToTrip from './pages/AddToTrip';

const API_URL = 'http://localhost:3001'

const App = () => {
  
  const [trips, setTrips] = useState([]);
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    const fetchTrips = async ()=>{
      const response = await fetch(`${API_URL}/trips`)
      const data = await response.json()
      console.log(data)
      setTrips(data)
    }
    fetchTrips()

  }, []);

  // Sets up routes
  let element = useRoutes([
    {
      path: "/",
      element:<ReadTrips data={trips}/>
    },
    {
      path:"/trip/new",
      element: <CreateTrip />
    },
    {
      path:"/edit/:id",
      element: <EditTrip data={trips} />
    },
    {
      path:"/destinations",
      element: <ReadDestinations data={destinations} />
    },
    {
      path:"/trip/get/:id",
      element: <TripDetails data={trips} />
    },
    {
      path:"/destination/new/:trip_id",
      element: <CreateDestination />
    },
    {
      path:"/activity/create/:trip_id",
      element: <CreateActivity />
    },
    {
      path:"/destinations/add/:destination_id",
      element: <AddToTrip data={trips}/>
    }
  ]);

  
  return ( 

    <div className="App">

      <div className="header">

        <h1>On The Fly ✈️</h1>
        <Link to="/"><button className="headerBtn">Explore Trips</button></Link>
        <Link to="/destinations"><button className="headerBtn">Explore Destinations</button></Link>
        <Link to="/trip/new"><button className="headerBtn"> + Add Trip </button></Link>
      </div>
        {element}
    </div>

  );
}

export default App;
