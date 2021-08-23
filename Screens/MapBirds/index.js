import React from "react";

// Container
import MapBirdsContainer from "../../components/Containers/MapBirds";

// Context
import { BirdsContextProvider } from "../../context/birds-context";

const MapBirdsScreen = ({ route, navigation }) => {
    return (
        <BirdsContextProvider>
            <MapBirdsContainer route={route} navigation={navigation} />
        </BirdsContextProvider>
    );
};

export default MapBirdsScreen;
