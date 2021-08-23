import React from "react";

// Container
import WhichBirdContainer from "../../components/Containers/WhichBird";

// Context
import { BirdsContextProvider } from "../../context/birds-context";

const WhichBirdScreen = ({ route, navigation }) => {
    return (
        <BirdsContextProvider>
            <WhichBirdContainer route={route} navigation={navigation} />
        </BirdsContextProvider>
    );
};

export default WhichBirdScreen;
