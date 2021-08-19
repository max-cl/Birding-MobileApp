import React, { useState, createContext, useEffect } from "react";
import axios from "axios";

// Create Context Object
export const BirdsContext = createContext();

// Create a provider for components to consume and subscribe to changes
export const BirdsContextProvider = (props) => {
    const [birds, setBirds] = useState([]);

    useEffect(() => {
        let isMounted = true;
        (async () => {
            const birdsFetched = await axios.get("http://localhost:3001/api/birds");
            if (isMounted) setBirds(birdsFetched.data);
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
            await axios.put("http://localhost:3001/api/birds", {
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
        <BirdsContext.Provider value={{ birds, setBirds, updateBirdChecked }}>{props.children}</BirdsContext.Provider>
    );
};
