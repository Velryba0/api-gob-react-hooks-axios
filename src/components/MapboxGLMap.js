import React, { useState } from 'react'
import MapGL, { GeolocateControl, Marker, Popup } from 'react-map-gl'
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

    const [viewport, setViewPort] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
        latitude: 0,
        longitude: 0,
        zoom: 2
    })

    const _onViewportChange = viewport => setViewPort({...viewport })

    for (let x in props) {

        console.log(props[x])
        data.push(props[x])
    }

    console.log(data)

    const _renderCityMarker = (city, index) => {
        console.log(city)
        return ( <
            Marker key = { `marker-${city._id}` }
            longitude = { parseInt(city.longitude) }
            latitude = { parseInt(city.latitude) } >
            <
            CityPin size = { 20 }
            />  < /
            Marker >
        );
    };

    data.map(x => console.log(x.longitude))
    return ( <
        MapGL {...viewport }
        mapboxApiAccessToken = { TOKEN }
        mapStyle = "mapbox://styles/mapbox/light-v9"
        onViewportChange = { _onViewportChange } >
        <
        GeolocateControl style = { geolocateStyle }
        positionOptions = {
            { enableHighAccuracy: true }
        }
        trackUserLocation = { true }
        /> {data.map(_renderCityMarker)}< /
        MapGL >

    )
}

export default Map;