import React from "react";
import { Modal } from "react-native";
import styled from "styled-components/native";

const ContainerModal = styled(Modal)``;
const CenteredView = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    margin-top: 22px;
`;
const StyledModalView = styled.View`
    margin: 20px;
    position: relative;
    border-radius: 20px;
    padding: 48px;
    align-items: center;
    background-color: #ffffff;
`;

const StyledModal = ({ children, openModal, onRequestClose }) => {
    return (
        <ContainerModal animationType="slide" transparent={true} visible={openModal} onRequestClose={onRequestClose}>
            <CenteredView>
                <StyledModalView>{children}</StyledModalView>
            </CenteredView>
        </ContainerModal>
    );
};

export default StyledModal;
