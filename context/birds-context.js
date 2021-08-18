import React, { useState, createContext } from "react";

// FakeData
import { fakeData } from "../fakeData";

// Create Context Object
export const BirdsContext = createContext();

// Create a provider for components to consume and subscribe to changes
export const BirdsContextProvider = (props) => {
    const [birds, setBirds] = useState(fakeData);

    return <BirdsContext.Provider value={[birds, setBirds]}>{props.children}</BirdsContext.Provider>;
};
