import React from "react";
import { ActivityIndicator } from "react-native";
import { useGlobalSpinnerContext } from "../../../context/spinner-context";
import StyledContentView from "../StyledContentView";

const StyledSpinner = () => {
    // Global States
    const [isGlobalSpinnerOn] = useGlobalSpinnerContext();

    return isGlobalSpinnerOn ? (
        <StyledContentView>
            <ActivityIndicator size="large" />
        </StyledContentView>
    ) : null;
};

export default StyledSpinner;
