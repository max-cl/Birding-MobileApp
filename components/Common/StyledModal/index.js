import React from "react";
import { Modal } from "react-native";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";

const StyledButtonCloseModal = styled(AntDesign)`
    position: absolute;
    right: ${(props) => props.theme.margin * 2}px;
    top: ${(props) => props.theme.margin * 2}px;
`;

const CenteredView = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;
const StyledModalView = styled.View`
    margin: ${(props) => props.theme.margin * 3}px;
    position: relative;
    border-radius: ${(props) => props.theme.borderRadius / 2}px;
    padding: ${(props) => props.theme.padding * 6}px;
    align-items: center;
    background-color: ${(props) => props.theme.white};
    min-width: 80%;
    min-height: 32%;
    justify-content: center;
    border-color: ${(props) => props.theme.borderColor};
    border-width: 0.4px;
    shadow-color: ${(props) => props.theme.borderColor};
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
