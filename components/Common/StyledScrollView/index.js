import React from "react";
import styled from "styled-components/native";

const ContainerScrollView = styled.ScrollView``;

const StyledScrollView = ({ children }) => {
    return <ContainerScrollView>{children}</ContainerScrollView>;
};

export default StyledScrollView;
