import React from "react";
import useAxios from './useAxios';
// import Map from './components/MapGL';
import MapBox from './components/MapCluster'
export default function App() {
    const data = useAxios("https://api.datos.gob.mx/v1/precio.gasolina.publico?pageSize=500");
    const dataArray = [];



    let geojson = {
        type: "FeatureCollection",
        features: []
    };


    // console.log(typeof(data.data))
    // console.log(data.data)
    for (let x in data.data) {
        // console.log(data.data[x])


        for (let y in data.data[x]) {
            dataArray.push(data.data[x][y])


        }

    }

    dataArray.splice(0, 3)


    // console.log(dataArray)

    for (let i = 0; i < dataArray.length; i++) {

        geojson.features.push({
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [dataArray[i].longitude, dataArray[i].latitude]
            },
            "properties": {
                "id": dataArray[i]._id,
                "name": dataArray[i].razonsocial,
                "direccion": dataArray[i].calle,
                "precioRegular": dataArray[i].regular,
                "precioPremium": dataArray[i].premium
            }
        });

    }

    // console.log(geojson)
    localStorage.setItem('informacion', JSON.stringify(geojson));

    let guardado = JSON.parse(localStorage.getItem('informacion'));

    // console.log('objeto: ', guardado)



    return ( <
        MapBox data = { dataArray }
        / >
    )
}