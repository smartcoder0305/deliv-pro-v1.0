import React from 'react';
import { useEffect, useState, useRef } from 'react';
import axios from "axios";
import InputText from './InputText';

const REACT_APP_GOOGLE_MAP_API_KEY = "AIzaSyBGMYzjoRqpTmgGRDT1j016yi8TeyjNGAo";

const GoogleMapInput = ({onSelect,
                        type, name, value, placeholder, onChange, className
}) => {
    const containerRef = useRef(null);
    const [possiblePlaces, setPossiblePlaces] = useState([]);
    const [valid, setValid] = useState(true);
    const handleAddRoute = (placeId) => {
        axios.get(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}&key=${REACT_APP_GOOGLE_MAP_API_KEY}`
        ).then(res => {
            if(res.data.status === 'OK') {
                const geometry = res.data.results[0].geometry.location;
                const address = res.data.results[0].address_components[0].short_name;
                onSelect(geometry, address);
                onChange({target: {name: name, value: address}});
                setPossiblePlaces([]);
            }
        }).catch(err => {
            console.log('google map api error', err);
            setPossiblePlaces([]);
        })
    }
    //-----debouncing input----
    const timer = useRef(null);
    useEffect(() => {
        if(!value) {
            setPossiblePlaces([]);
            return;
        }
        setValid(true);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => {
            axios.get(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(value)}&key=${REACT_APP_GOOGLE_MAP_API_KEY}&types=airport|train_station&fields=geometry`,
            ).then(res => {
                if(res.data.status === 'OK') {
                    setPossiblePlaces(res.data.predictions.slice(0, 5));
                } else {
                    setPossiblePlaces([]);
                    setValid(false);
                }
            }).catch(err => {
                console.log(err);
            })
        }, 400);
    }, [value]);
    //-------------------------
    useEffect(() => {
        const handleGlobalClick = (ev) => {
            if(!containerRef.current.contains(ev.target)) {
                setPossiblePlaces([]);
            }
        };
        window.addEventListener("click", handleGlobalClick);
        return () => {
            window.removeEventListener('click', handleGlobalClick);
        }
    }, []);
    return (<div className='text-black flex flex-col grow' ref={containerRef}>
        <InputText type={type} name={name} value={value} placeholder={placeholder} onChange={onChange} className={`${valid ? '' : 'border-b-red-300'} ${className ?? ''}`} />
        { possiblePlaces.length ?
        <div className="relative">
            <ul className={`absolute border border-slate-300 -top-3 left-3 w-full`}>
            {
                possiblePlaces.map((place) => (
                    <li key={place.place_id} className={`
                    bg-white select-none py-1 px-2 cursor-pointer truncate
                    hover:bg-slate-200
                    `} onClick={()=>handleAddRoute(place.place_id)}
                    >{place.description}</li>
                ))
            }
            </ul>
        </div>
        : <></>
        }
    </div>);
}

export default GoogleMapInput;