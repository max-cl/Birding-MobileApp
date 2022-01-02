import React, { useState, createContext, useEffect } from "react";
import axios from "axios";
import { API_URL } from "@env";

// Contexts
import { useGlobalSpinnerActionsContext } from "../context/spinner-context";

// Create Context Object
export const PlacesContext = createContext();

// Create a provider for components to consume and subscribe to changes
const PlacesContextProvider = (props) => {
    // Context States
    const [setGlobalSpinner] = useGlobalSpinnerActionsContext();
    // Local Staes
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        let isMounted = true;
        (async () => {
            try {
                setGlobalSpinner(true);
                const placesFetched = await axios.get(`${API_URL}/place`);
                // console.log("placesFetched: ", placesFetched);
                if (isMounted) {
                    setPlaces(placesFetched.data);
                    setGlobalSpinner(false);
                } else {
                    return null;
                }
            } catch (error) {
                console.log("Error Places-Context: ", error);
            }
        })();
        return () => {
            isMounted = false;
        };
    }, [setGlobalSpinner]);

    const placesSetters = {
        places,
    };

    return <PlacesContext.Provider value={{ ...placesSetters }}>{props.children}</PlacesContext.Provider>;
};

export default PlacesContextProvider;
