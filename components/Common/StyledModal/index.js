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
    border-radius: 16px;
    padding: 48px;
    align-items: center;
    background-color: #ffffff;
    min-width: 80%;
    min-height: 40%;
    justify-content: center;
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
