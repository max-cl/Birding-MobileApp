import React from "react";
import styled from "styled-components/native";

const ContainerPressable = styled.Pressable`
    background-color: #2196f3;
    padding: 16px;
`;
const StyledPressable = ({ children, onPress }) => {
    return <ContainerPressable onPress={onPress}>{children}</ContainerPressable>;
};

export default StyledPressable;
