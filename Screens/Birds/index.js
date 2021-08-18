import React from "react";

// Container
import BirdsContainer from "../../components/Containers/Birds";

// Context
import { BirdsContextProvider } from "../../context/birds-context";

const BirdsScreen = ({ route, navigation }) => {
    return (
        <BirdsContextProvider>
            <BirdsContainer route={route} navigation={navigation} />
        </BirdsContextProvider>
    );
};

export default BirdsScreen;
