import React from "react";
import styled from "styled-components/native";

const ContainerSafeAreaView = styled.SafeAreaView`
    flex: 1;
    background-color: ${(props) => props.theme.bgColor};
`;

const StyledSafeAreaView = ({ children }) => {
    return <ContainerSafeAreaView>{children}</ContainerSafeAreaView>;
};

export default StyledSafeAreaView;
