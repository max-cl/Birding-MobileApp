import React from "react";

// Container
import BirdDetailsContainer from "../../components/Containers/BirdDetails";

// Context
import { BirdsContextProvider } from "../../context/birds-context";

const BirdDetailsScreen = ({ route }) => {
    return (
        <BirdsContextProvider>
            <BirdDetailsContainer route={route} />
        </BirdsContextProvider>
    );
};

export default BirdDetailsScreen;
