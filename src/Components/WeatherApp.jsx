import React, { useEffect, useRef, useState } from 'react'
import './WeatherApp.css'
import search from '../assets/search.png'
import clear from '../assets/clear.png'
import cloud from '../assets/cloud.png'
import drizzle from '../assets/drizzle.png'
import hero from '../assets/hero.png'
import rain from '../assets/rain.png'
import snow from '../assets/snow.png'
import humidity from '../assets/humidity.png'
import wind from '../assets/wind.png'

const WeatherApp = () => {

    const Inputref = useRef();
    const [Weatherdata, setWeatherdata] = useState(false)

const  Weathericons = {
    "01d" : clear,
    "02d" : cloud,
    "03d" : cloud,
    "04d": drizzle,
    "09d": rain,
    "10d": rain,
    "13d": snow,
    
}
    const Search = async (city) =>
    {
        if (city === "")
            {
                alert("Enter City Name ")
                return;
            }
        
        try {

            //  console.log(import.meta.env.VITE_APP_ID);
             const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`
            const response = await fetch(url);
            const data = await response.json();  
            console.log(data);
            if (!response.ok)
            {
                alert(data.message);
            }
            const icon =  Weathericons[data.weather[0].icon] || clear ;
            setWeatherdata ( {
                speed : data.wind.speed,
                humidity : data.main.humidity,
                temp : data.main.temp,
                cityname : data.name,
                icon : icon,
            });
            
        } catch (error) {
            setWeatherdata(false);
            console.error(error);
            
        }
    }
   
   const handleSubmit = (event) =>
    {
        event.preventDefault()
        Search(Inputref.current.value);


    };

  return (
    <div className='Weather'>
        <div className='search-bar'>
              <form  onSubmit={handleSubmit} action="">
                <input ref ={Inputref} className = "search-bar" type="text" placeholder='Search' />
                <button> <img   src={search} alt="" className ="SearchIcon" type= "submit" /></button>
              </form> 
        </div>

        {Weatherdata ? <>
        <img src = {Weatherdata.icon} alt="" className='Weather-icon' />
        <p className='Temp'>{Weatherdata.temp} °C </p>
        <p className='Location'>{Weatherdata.cityname}</p>

        <div className='WeatherData'>
            <div className='column'>
                <img src={humidity} alt="" />
                <div>
                    <p>{Weatherdata.humidity} %</p>
                    <span>Humidity</span>
                </div>
            </div>
             <div className='column'>
                <img src={wind} alt="" />
                <div>
                    <p>{Weatherdata.speed} Km/h</p>
                    <span>Wind Speed</span>
                </div>
            </div>
        </div>
        </> : <></>}


        

    </div>
  )
}

export default WeatherApp