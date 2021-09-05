import React from "react";
import styled from "styled-components/native";

const ContainerContentView = styled.View`
    flex: 1;
    flex-direction: ${(props) => props.fDirection || "row"};
    flex-wrap: wrap;
    justify-content: center;
    position: relative;
`;
const StyledContentView = ({ children, fDirection }) => {
    return <ContainerContentView fDirection={fDirection}>{children}</ContainerContentView>;
};

export default StyledContentView;
