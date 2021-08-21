import React, { useState, createContext, useEffect } from "react";

// Create Context Object
export const FilterContext = createContext();

// Create a provider for components to consume and subscribe to changes
export const FilterContextProvider = (props) => {
    const [filter, setFilter] = useState({ birdSizeSelected: undefined, birdColorSelected: undefined });

    // useEffect(() => {
    //     console.log("Filter Context: ", filter);
    // });

    const selectSizeBird = async (size) => {
        console.log("selectSizeBird Context: ", size);
        setFilter({ ...filter, birdSizeSelected: size });
    };

    return (
        <FilterContext.Provider value={{ filter, setFilter, selectSizeBird }}>{props.children}</FilterContext.Provider>
    );
};
