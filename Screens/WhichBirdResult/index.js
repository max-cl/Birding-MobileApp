import React from "react";

// Container
import WhichBirdResultContainer from "../../components/Containers/WhichBirdResult";

// Context
import { BirdsContextProvider } from "../../context/birds-context";

const WhichBirdResultScreen = ({ route, navigation }) => {
    return (
        <BirdsContextProvider>
            <WhichBirdResultContainer route={route} navigation={navigation} />
        </BirdsContextProvider>
    );
};

export default WhichBirdResultScreen;
