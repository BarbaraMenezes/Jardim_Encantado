import { useQuery } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios"
import { CatalogoData } from "../interface/CatalogoData";


const API_URL = 'http://localhost:8080';

const fetchData = async (): AxiosPromise<CatalogoData[]> => {
    const response = axios.get(API_URL + '/catalogo');
    return response;
}

export function userCatalogoData(){
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['catalogo-data'],
        retry: 2
    })

    return {
        ...query,
        data: query.data?.data
    }
}