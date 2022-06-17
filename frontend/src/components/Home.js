import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {

  const [items, setItems] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "http://universities.hipolabs.com/search?country=India"
        );
        setItems(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  return (
    <>

    {items.map((data) => (   
      <div className="card">
        <h1>{data.name}</h1>    
       <h3>{`Located in  ${ data['state-province'] === null  ? data.country : data['state-province'] +" , "+data.country } `}</h3>
        <a href={`${data.web_pages}`}>{data.domains}</a> 
      </div>
      
  ))}
    </>
  );
}
