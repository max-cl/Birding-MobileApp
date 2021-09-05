import React from "react";

// Components
import StyledSpinner from "../../components/Common/StyledSpinner";

// Container
import WhichBirdContainer from "../../components/Containers/WhichBird";

const WhichBirdScreen = ({ route, navigation }) => {
    return (
        <React.Fragment>
            <StyledSpinner />
            <WhichBirdContainer route={route} navigation={navigation} />
        </React.Fragment>
    );
};

export default WhichBirdScreen;
