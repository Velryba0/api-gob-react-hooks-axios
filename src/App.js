import React from "react";
import useAxios from './useAxios';
import { Bar } from "@nivo/bar";
export default function App() {
    const data = useAxios("https://api.datos.gob.mx/v1/precio.gasolina.publico?pageSize=5");
    const dataArray = [];
    let dataComplete = [];


    console.log(typeof(data.data))
    console.log(data.data)
    for (let x in data.data) {
        console.log(data.data[x])
        for (let y in data.data[x]) {
            dataArray.push(data.data[x][y])
            dataComplete.push(Object.values(data.data[x][y]))

        }

    }

    dataArray.splice(0, 3)


    console.log(dataArray)

    const styles = {
        fontFamily: "sans-serif",
        fontSize: "14px",
        textAlign: "center"
    };

    const commonProperties = {
        width: window.innerWidth,
        height: window.innerHeight,
        data: dataArray,
        keys: ['regular'],
        indexBy: 'razonsocial',
        margin: {
            top: 10,
            right: 10,
            bottom: 60,
            left: 80,
        }
    };



    return ( < div style = { styles } >
        <
        Bar {...commonProperties }
        axisLeft = {
            {
                // using custom function
                format: d => `${d} pesos`
            }
        }
        /> < /
        div >


    );
}