import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { mapPhotosAndPosts } from '../utils/dataMapping';
import { useLocation } from 'react-router-dom';

// Create the global context variable. It will work like a global variable in node. In a real app, obviously you never do something like this. 
export const GlobalState = createContext();

export const useGlobalState = () => {
    const [posts, setPosts] = useState([]);
    const [isDataRetrieved, setIsDataRetrieved] = useState(false); 

    const location = useLocation();
    const acceptedRoutes = ['/'];

    useEffect(() => {
        if (!isDataRetrieved && acceptedRoutes.includes(location.pathname)) {
            getData();
            console.log('Posts:', posts );
        }
    }, [isDataRetrieved, location.pathname]);

    const getData = async () => {
        try {
            const [postsData, photosData] = await Promise.all([
                axios.get('http://localhost:5000/api/posts'),
                axios.get('http://localhost:5000/api/photos'),
            ]);
            const combinedData = mapPhotosAndPosts(postsData.data, photosData.data);
            setPosts(combinedData);
            setIsDataRetrieved(true);
        } catch (error) {
            console.log('Error getData:', error);
        }
    };

    return { posts, getData, isDataRetrieved };
};
