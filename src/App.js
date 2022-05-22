import {
  render
} from '@testing-library/react';
import React, {
  useState
} from 'react';
import styles from './App.css'
import axios from 'axios'


function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const url = (`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=9f26fe885fcd6672143809a005f53e44`)

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }

return( 
  <div className='main'>
   <div className='search'>
    <input 
    type ="text" 
    placeholder ="Enter City"
    onChange={event => setLocation(event.target.value)}
    onKeyPress={searchLocation}>
    </input>
   </div>
   <div className='mainweather'>
     <h2 className='city'>{data.name}</h2>
     {data.main ? <h3 className='maintemp'>{data.main.temp.toFixed()}°C</h3> : null}

    {data.main? <h2 className='wind'>{data.weather[0].description}</h2> :null}
   </div>
   <div className='lower'>
     <div className='feels'>
        {data.main ? <h3>{data.main.feels_like.toFixed()}°C</h3> : null}
        <h3>Feels Like</h3>
     </div>
     <div className='humid'>
      {data.main ? <h3> {data.main.humidity}%</h3> : null}
        <h3>Humidity</h3>
     </div>
     <div className='speed'>
        {data.main ? <h3> {data.wind.speed.toFixed()}mph</h3> :null}
        <h3>Wind Speed</h3>
     </div>
   </div>
   </div>)



}
export default App;