import React from "react";
import styled from "styled-components/native";

const ContainerTextInput = styled.TextInput`
    height: ${(props) => props.theme.height * 6}px;
    width: ${(props) => props.theme.width * 30}px;
    padding: ${(props) => props.theme.padding}px;
    border-color: ${(props) => props.theme.borderColor};
    border-width: ${(props) => props.theme.borderWidth}px;
`;

const StyledTextInput = ({ children, placeholder, value, onChangeText }) => {
    return (
        <ContainerTextInput placeholder={placeholder} value={value} onChangeText={onChangeText}>
            {children}
        </ContainerTextInput>
    );
};

export default StyledTextInput;
