import { useState, useEffect } from "react";
import axios from 'axios';

export default function useAxios(url) {
    const [data, setData] = useState([]);

    async function getData() {
        const response = await axios.get(url);
        const data = response;
        setData(data);
    }

    useEffect(() => {
        getData();
    }, []);

    return data;
}