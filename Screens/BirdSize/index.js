import React from "react";

// Container
import BirdSizeContainer from "../../components/Containers/BirdSize";

// Context
import { FilterContextProvider } from "../../context/filter-context";

const BirdSizeScreen = ({ route, navigation }) => {
    return (
        <FilterContextProvider>
            <BirdSizeContainer route={route} navigation={navigation} />
        </FilterContextProvider>
    );
};

export default BirdSizeScreen;
