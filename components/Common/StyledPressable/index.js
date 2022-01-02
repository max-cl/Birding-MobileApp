import React from "react";
import styled from "styled-components/native";

const ContainerPressable = styled.Pressable`
    background-color: ${(props) => (props.seen ? props.theme.primaryColor : props.theme.tertiaryColor)};
    padding: ${(props) => props.theme.padding * 2}px;
`;
const StyledPressable = ({ children, onPress, seen }) => {
    return (
        <ContainerPressable onPress={onPress} seen={seen}>
            {children}
        </ContainerPressable>
    );
};

export default StyledPressable;
