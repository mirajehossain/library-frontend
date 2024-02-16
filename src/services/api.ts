import axios from 'axios';

import {IBook} from "../libs/types";

export const getBooks = async (page = 1, limit = 10): Promise<IBook[]> => {
    try {
        const apiURL = `${process.env.REACT_APP_SERVER_HOST}/api/v1.0.0/books?page=${page}&limit=${limit}`
        const response = await axios.get(apiURL);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error;
    }
}

export const createBook = async (payload: Partial<IBook>): Promise<IBook> => {
    try {
        const apiURL = `${process.env.REACT_APP_SERVER_HOST}/api/v1.0.0/books`
        const response = await axios.post(apiURL,  payload,{
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data.data;
    } catch (error) {
        console.error('Error creating books:', error);
        throw error;
    }
}