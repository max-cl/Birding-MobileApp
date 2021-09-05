import React from "react";
import styled from "styled-components/native";

const ContainerTextInput = styled.TextInput`
    height: 48px;
    width: 240px;
    padding: 8px;
    border-color: #c0c0c0;
    border-width: 1px;
`;

const StyledTextInput = ({ children, placeholder, value, onChangeText }) => {
    return (
        <ContainerTextInput placeholder={placeholder} value={value} onChangeText={onChangeText}>
            {children}
        </ContainerTextInput>
    );
};

export default StyledTextInput;
