import React from "react";
import styled from "styled-components/native";

const ContainerPressable = styled.Pressable`
    background-color: ${(props) => (props.seen ? "coral" : "#2196f3")};
    padding: 16px;
`;
const StyledPressable = ({ children, onPress, seen }) => {
    return (
        <ContainerPressable onPress={onPress} seen={seen}>
            {children}
        </ContainerPressable>
    );
};

export default StyledPressable;
