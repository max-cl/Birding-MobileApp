import React from "react";
import { Modal } from "react-native";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";

const StyledButtonCloseModal = styled(AntDesign)`
    position: absolute;
    right: 16px;
    top: 16px;
`;

const CenteredView = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;
const StyledModalView = styled.View`
    margin: 24px;
    position: relative;
    border-radius: 4px;
    padding: 48px;
    align-items: center;
    background-color: #ffffff;
    min-width: 80%;
    min-height: 32%;
    justify-content: center;
    border-color: #c0c0c0;
    border-width: 0.4px;
    shadow-color: #c0c0c0;
    shadow-offset: 4px 4px;
    shadow-opacity: 1;
    shadow-radius: 4px;
    elevation: 5;
`;

const StyledModal = ({ children, openModal, onRequestClose }) => {
    return (
        <Modal animationType="slide" transparent={true} visible={openModal} onRequestClose={onRequestClose}>
            <CenteredView>
                <StyledModalView>
                    {children}
                    <StyledButtonCloseModal name="closecircle" size={32} color="black" onPress={onRequestClose} />
                </StyledModalView>
            </CenteredView>
        </Modal>
    );
};

export default StyledModal;
