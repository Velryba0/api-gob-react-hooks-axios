import React from "react";
// import useFetch from "./useFetch";
import useAxios from './useAxios';
export default function App() {
    const data = useAxios("https://api.datos.gob.mx/v1/precio.gasolina.publico");
    const dataArray = [];

    console.log(typeof(data.data))
    console.log(data.data)
    for (let x in data.data) {
        console.log(data.data[x])
        for (let y in data.data[x]) {
            // console.log(data.data[x][y])
            dataArray.push(data.data[x][y])
        }

    }

    dataArray.splice(0, 3)


    console.log(dataArray)

    return ( <
        div >
        <
        ul > {
            dataArray.map(el => ( <
                li key = { el._id } > { `${el.regular} - ${el.premium} - ${el.razonsocial}` } < /li>
            ))
        } <
        /ul> < /
        div >
    );
}