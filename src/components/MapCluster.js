import React, { useState, useEffect } from 'react'
import MapGL, { GeolocateControl, Marker, Popup } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const TOKEN = "pk.eyJ1IjoidmVscnliYSIsImEiOiJjazBkMmpwbm8wM251M2NvYzNqazB0Y2RiIn0.gB7xUSuLZC7JdGmyOhSIRg"

const geolocateStyle = {
    float: 'left',
    margin: '50px',
    padding: '10px'
};
const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

const pinStyle = {
    cursor: 'pointer',
    fill: '#886A08',
    stroke: 'none'
};

const MapBox = (props) => {

    let data = [];

    props = Object.values(props).flat()

    // console.log(props)

    const [viewport, setViewPort] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
        latitude: 23,
        longitude: -101,
        zoom: 4.3
    })
    const [selectMark, setSelectMark] = useState(null);

    useEffect(() => {
        const listener = e => {
            if (e.key === "Escape") {
                setSelectMark(null)
            }
        }
        window.addEventListener("keydown", listener);

        return () => {
            window.removeEventListener("keydown", listener);
        };
    }, [])

    const _onViewportChange = viewport => setViewPort({...viewport })

    for (let x in props) {

        // console.log(props[x])
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
            svg id = 'marker'
            height = "20"
            viewBox = "0 0 24 24"
            style = {
                {
                    ...pinStyle,
                    transform: `translate(${-20 / 2}px,${-20}px)`
                }
            }
            onClick = {
                e => {
                    e.preventDefault();
                    setSelectMark(city);
                }
            } >
            <
            path d = { ICON }
            /> < /
            svg > < /
            Marker >
        );
    });

    // console.log(selectMark)

    return ( <
            div style = {
                { margin: '0 auto' }
            } >
            <
            MapGL {...viewport }
            mapboxApiAccessToken = { TOKEN }
            mapStyle = "mapbox://styles/mapbox/dark-v9"
            onViewportChange = { _onViewportChange } >
            <
            GeolocateControl style = { geolocateStyle }
            positionOptions = {
                { enableHighAccuracy: true }
            }
            trackUserLocation = { true }
            /> {data.map(_renderCityMarker)} {
            selectMark ? ( <
                Popup latitude = { parseFloat(selectMark.latitude) }
                longitude = { parseFloat(selectMark.longitude) }
                onClose = {
                    () => {
                        return setSelectMark(null);
                    }
                } >
                <
                div >
                <
                h2 > { selectMark.razonsocial } < /h2> <
                p > Precio regular $ { selectMark.regular } < /p> <
                p > Precio premium $ { selectMark.premium } < /p> < /
                div >

                <
                /Popup>
            ) : null
        } <
        /
    MapGL > <
        /div>
)
}

export default MapBox;