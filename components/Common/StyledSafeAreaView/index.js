import React from "react";
import styled from "styled-components/native";

const ContainerSafeAreaView = styled.SafeAreaView`
    flex: 1;
    background-color: #f8f8f8;
`;

const StyledSafeAreaView = ({ children }) => {
    return <ContainerSafeAreaView>{children}</ContainerSafeAreaView>;
};

export default StyledSafeAreaView;
