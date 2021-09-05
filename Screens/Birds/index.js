import React from "react";

// Container
import BirdsContainer from "../../components/Containers/Birds";

const BirdsScreen = ({ route, navigation }) => {
    return <BirdsContainer route={route} navigation={navigation} />;
};

export default BirdsScreen;
