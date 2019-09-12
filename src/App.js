import React, { useState, useEffect } from "react";
import useAxios from './useAxios';
import Map from './components/MapboxGLMap';
export default function App() {
    const data = useAxios("https://api.datos.gob.mx/v1/precio.gasolina.publico?pageSize=100");
    const dataArray = [];



    console.log(typeof(data.data))
    console.log(data.data)
    for (let x in data.data) {
        console.log(data.data[x])
        for (let y in data.data[x]) {
            dataArray.push(data.data[x][y])


        }

    }

    dataArray.splice(0, 3)


    console.log(dataArray.map(x => x.latitude))


    return ( <
        Map data = { dataArray }
        / >
    )
}