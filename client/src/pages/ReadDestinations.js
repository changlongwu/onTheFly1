import React, { useState, useEffect } from 'react';
import DestinationCard from '../components/DestinationCard';


const ReadDestinations = (props) => {

    const [destinations, setDestinations] = useState([]);


    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                const response = await fetch('/destinations')
                const data = await response.json()
                setDestinations(data)
            } catch (error) {
                console.error('Error fetching destinations:', error)
            }
        }
        fetchDestinations()
    }, []);
    

    return (
        <div className="ReadDestinations">
            {
                destinations && destinations.length > 0 ?
                destinations.map((destination,index) => 
                   <DestinationCard key={destination.id} 
                         id={destination.id} 
                         destination={destination.destination} 
                         description={destination.description} 
                         city={destination.city} 
                         country={destination.country}
                         img_url={destination.img_url}
                         flag_img_url={destination.flag_img_url} 
                    />
                ) : <h3 className="noResults">{'No Destinations Yet 😞'}</h3>
            }
        </div>  
    )
}

export default ReadDestinations;