import React, { useState, createContext, useEffect } from "react";
import axios from "axios";
import { API_URL } from "@env";

// Create Context Object
export const BirdsContext = createContext();

// Create a provider for components to consume and subscribe to changes
export const BirdsContextProvider = (props) => {
    const [birds, setBirds] = useState([]);
    const [birdColors, setBirdColors] = useState([]);
    const [birdSizes, setBirdSizes] = useState([]);

    useEffect(() => {
        let isMounted = true;
        (async () => {
            try {
                const birdsFetched = await axios.get(`${API_URL}/api/birds`);
                if (isMounted) {
                    setBirds(birdsFetched.data);
                    const colorsFetched = birdsFetched.data.map((bird) => bird.color);
                    setBirdColors([...new Set(colorsFetched.flat(2))]);
                    const sizesFetched = birdsFetched.data.map((bird) => bird.size);
                    setBirdSizes([...new Set(sizesFetched)]);
                } else {
                    return null;
                }
            } catch (error) {
                console.log("Error Bird-Context: ", error);
            }
        })();
        return () => {
            isMounted = false;
        };
    });

    const updateBirdChecked = async (birdId) => {
        try {
            const birdsCopy = [...birds];
            const bird = birdsCopy
                .filter((f) => f.id === birdId)
                .map((b) => {
                    return { ...b, checked: b.checked ? false : true };
                })[0];
            const indexBird = birdsCopy.findIndex((t) => t.id === birdId);
            birdsCopy.splice(indexBird, 1);
            birdsCopy.push(bird);
            await axios.put(`${API_URL}/api/birds`, {
                birdId,
                birdChecked: bird.checked,
            });
            setBirds(birdsCopy);
            console.log("Bird Checked Updated");
        } catch (error) {
            console.log("Error: ", error);
        }
    };

    return (
        <BirdsContext.Provider value={{ birds, setBirds, updateBirdChecked, birdColors, birdSizes }}>
            {props.children}
        </BirdsContext.Provider>
    );
};
