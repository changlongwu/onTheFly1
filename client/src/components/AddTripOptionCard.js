import React from 'react'
import { useParams } from 'react-router-dom';
import './Card.css'


const AddTripOptionCard = (props) =>  {
  const {destination_id} = useParams();

  const addToTrip = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`/trip-destinations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({destination_id: destination_id, trip_id: props.id})
      })

      if (!response.ok) {
        throw new Error('Failed to add destination to trip')
      }

      const data = await response.json()
      console.log('Destination added to trip:', data)

      window.location.href = `/`
    } catch (error) {
      console.error('Error adding destination to trip:', error)
    }
  }

  return (
      <div className="Card" style={{ backgroundImage:`url(${props.img_url})`}} >
        <div className="card-info">
          <h2 className="title">{props.title}</h2>
          <p className="description">{props.description}</p>
          <button className="addToTrip" onClick={addToTrip}>+ Add to Trip</button>
        </div>
      </div>
  );
};

export default AddTripOptionCard;