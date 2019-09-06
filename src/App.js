import React from "react";
import useFetch from "./useFetch";
export default function DataLoader() {
    const data = useFetch("https://api.datos.gob.mx/v1/precio.gasolina.publico");
    const dataArray = [];

    console.log(typeof(data.results))
    console.log(data.results)

    for (let x in data.results) {
        // console.log(x)
        console.log(data.results[x])
        console.log(Object.values(data.results[x]))
        dataArray.push(Object.values(data.results[x]))
    }

    console.log(dataArray)

    return ( <
        div >
        <
        ul > {
            dataArray.map(el => ( <
                li key = { el[0] } > { `${el[4]} - ${el[11]} - ${el[12]}` } < /li>
            ))
        } <
        /ul> < /
        div >
    );
}