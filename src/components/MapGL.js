import React, { useState } from 'react';
import MapGL, { GeolocateControl, Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import CityPin from './city-pin';

const TOKEN = 'pk.eyJ1IjoidmVscnliYSIsImEiOiJjazBkMmpwbm8wM251M2NvYzNqazB0Y2RiIn0.gB7xUSuLZC7JdGmyOhSIRg'

const geolocateStyle = {
    position: 'absolute',
    margin: '10',
    top: '0',
    left: '0'
};

const Map = (props) => {
    let data = [];

    props = Object.values(props).flat()

    // console.log(JSON.parse(localStorage.getItem('informacion')))


    const [viewport, setViewPort] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
        latitude: 23,
        longitude: -101,
        zoom: 4.3
    })

    const _onViewportChange = viewport => setViewPort({...viewport })

    for (let x in props) {

        console.log(props[x])
        data.push(props[x])
    }

    // console.log(data)

    const _renderCityMarker = ((city, index) => {
        // console.log(city)
        return ( <
            Marker key = { `marker-${city._id}` }
            longitude = { parseFloat(city.longitude) }
            latitude = { parseFloat(city.latitude) } >
            <
            CityPin size = { 20 }
            />  < /
            Marker >
        );
    });


    const result = data.filter(d => d.latitude !== '0' ? d : null)

    // console.log(result)

    // data.map(x => console.log(x.longitude))
    return ( <
        MapGL {...viewport }
        mapboxApiAccessToken = { TOKEN }
        mapStyle = "mapbox://styles/velryba/ck0iehp6b0ene1dr1imlg39us"
        onViewportChange = { _onViewportChange } >
        <
        GeolocateControl style = { geolocateStyle }
        positionOptions = {
            { enableHighAccuracy: true }
        }
        trackUserLocation = { true }
        /> {result.map(_renderCityMarker)} < /
        MapGL >

    )
}

export default Map;