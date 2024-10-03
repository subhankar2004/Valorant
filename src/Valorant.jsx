import React, { useEffect, useState } from 'react';
import './index.css';

const Valorant = () => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState(null);

  const API = 'https://valorant-api.com/v1/agents';

  const fetchValorant = async () => {
    try {
      const res = await fetch(API);
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await res.json();
      console.log(data);

      const detailsValorant = data.data.map((item) => ({
        id: item.uuid,
        name: item.displayName,
        description: item.description,
        icon: item.displayIcon,
        abilities: item.abilities, // Array of abilities
        role: item.role?.displayName || 'Unknown', // Display 'Unknown' if role is missing
      }));

      setApiData(detailsValorant);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchValorant();
  }, []);

  //Search Functionality

  const searchData=apiData.filter((items)=>{
    if(search === null){
      return items
    }else if(items.name.toLowerCase().includes(search.toLowerCase())){
      return items
    } 
  })

  return (
    <section className="container">
      <header>
        <h1>Valorant Agents</h1>
      </header>
      <div className='valorant-search'>
        <input type="text" placeholder="Search Agent" value={search} onChange={(e) => setSearch(e.target.value)}/>
      </div>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <ul className="cards">
            {searchData.map((item) => (
              <li key={item.id} className="valorant-card">
                <figure>
                  <img src={item.icon} alt={item.name} className="valorant-image" />
                </figure>
                <h1 className="valorant-name">{item.name}</h1>
                <div className="valorant-info valorant-highlight">
                  <p>Role: <span>{item.role}</span></p>
                </div>
                <div className='grid-three-cols'>
                  <p className='valorant-info'>
                    <span>Ability1: </span>
                    {item.abilities[0]?.displayName}
                    
                    </p>
                    <p>
                    <span>Ability2: </span>
                    {item.abilities[1]?.displayName}
                    
                    </p>
                    <p>
                    <span>Ability3: </span>
                    {item.abilities[2]?.displayName}
                    
                    </p>
                  
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default Valorant;



