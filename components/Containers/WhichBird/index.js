import React, { useContext, useState } from "react";
import { View, Text, Pressable } from "react-native";
import styled from "styled-components/native";

// Components
import { StyledSafeAreaView, StyledScrollView, StyledModal } from "../../Common";

// Context
import { BirdsContext } from "../../../context/birds-context";

// Custom Hooks
import { useToggle } from "../../../custom-hooks";

const StyledPressable = styled(Pressable)`
    padding: 16px;
    background-color: ${(props) => (props.selected ? "coral" : "#2196f3")};
    text-align: center;
    width: 88px;
`;

const StyledButtonLabel = styled.Text`
    font-size: 14px;
    font-weight: 400;
    color: ${(props) => props.reset || "#ffffff"};
    text-align: center;
`;

const StyledPressableColors = styled(Pressable)`
    background-color: ${(props) => props.color};
    border-radius: 50px;
    width: 80px;
    height: 80px;
    margin: 8px;
    border-color: #c0c0c0;
    border-width: 1px;
`;

const StyledContainerResetFilter = styled.View`
    position: absolute;
    top: 24px;
    right: 16px;
`;

const StyledPressableResetFilter = styled(Pressable)`
    width: 120px;
    text-align: center;
    padding: 16px;
    background-color: oldlace;
`;

const StyledContentView = styled.View`
    flex: 1;
    flex-direction: column;
    justify-content: center;
    margin-top: 80px;
    padding: 16px;
`;

const StyledRow = styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    border-width: ${(props) => (props.find ? "0" : "1px")};
    border-color: ${(props) => (props.find ? "#FFFFFF" : "#e0e0e0")};
    padding: 12px;
    margin-top: 24px;
`;

const StyledPressableFind = styled(Pressable)`
    padding: 16px;
    background-color: coral;
    text-align: center;
    width: 240px;
`;

const StyledFilterNumer = styled.Text`
    font-size: 24px;
    font-weight: 600;
`;

const StyledFilterDescription = styled.Text`
    font-size: 14px;
    font-weight: 200;
`;

const StyledModalViewColors = ({ children }) => (
    <View
        style={{
            backgroundColor: "white",
            position: "relative",
            alignItems: "center",
            justifyContent: "space-evenly",
            flexDirection: "row",
            flexWrap: "wrap",
        }}
    >
        {children}
    </View>
);

const SizeOptions = ["small", "medium", "big"];

const WhichBirdContainer = ({ navigation }) => {
    // Global State
    const { birds, birdSizes, birdColors } = useContext(BirdsContext);
    // Local States
    const [filterBird, setFilterBird] = useState({ size: undefined, color: undefined });
    const [openSizeModal, setOpenSizeModal] = useToggle();
    const [openColorModal, setOpenColorModal] = useToggle();

    const onPressWhichBirdResult = () =>
        navigation.navigate("WhichBirdResult", {
            filterBird: filterBird,
        });

    return (
        <StyledSafeAreaView>
            <StyledScrollView>
                {/**  START Size */}
                <StyledModal openModal={openSizeModal} onRequestClose={setOpenSizeModal}>
                    {birdSizes.map((size, index) => (
                        <StyledPressable
                            key={index}
                            selected={filterBird.size === size}
                            onPress={() => {
                                setFilterBird({ ...filterBird, size });
                                setOpenSizeModal();
                            }}
                        >
                            <StyledButtonLabel>{size}</StyledButtonLabel>
                        </StyledPressable>
                    ))}
                </StyledModal>
                {/**  END Size */}

                {/**  START Color */}
                <StyledModal openModal={openColorModal} onRequestClose={setOpenColorModal}>
                    <StyledModalViewColors>
                        {birdColors.map((color, index) => (
                            <StyledPressableColors
                                key={index}
                                color={color}
                                onPress={() => {
                                    setFilterBird({ ...filterBird, color });
                                    setOpenColorModal();
                                }}
                            >
                                <Text>{"                  "}</Text>
                            </StyledPressableColors>
                        ))}
                    </StyledModalViewColors>
                </StyledModal>
                {/**  END Color */}

                <StyledContainerResetFilter>
                    <StyledPressableResetFilter onPress={() => setFilterBird({ size: undefined, color: undefined })}>
                        <StyledButtonLabel reset="coral">Reset filter</StyledButtonLabel>
                    </StyledPressableResetFilter>
                </StyledContainerResetFilter>

                <StyledContentView>
                    <StyledRow>
                        <StyledFilterNumer>1</StyledFilterNumer>
                        <StyledFilterDescription> Which size is the bird?</StyledFilterDescription>
                        <StyledPressable selected={filterBird.size !== undefined} onPress={setOpenSizeModal}>
                            <StyledButtonLabel>{filterBird.size !== undefined ? "Chosen" : "Choose"}</StyledButtonLabel>
                        </StyledPressable>
                    </StyledRow>
                    <StyledRow>
                        <StyledFilterNumer>2</StyledFilterNumer>
                        <StyledFilterDescription> What color is the bird?</StyledFilterDescription>
                        <StyledPressable selected={filterBird.color !== undefined} onPress={setOpenColorModal}>
                            <StyledButtonLabel>
                                {filterBird.color !== undefined ? "Chosen" : "Choose"}
                            </StyledButtonLabel>
                        </StyledPressable>
                    </StyledRow>
                    <StyledRow find={true}>
                        <StyledPressableFind onPress={() => onPressWhichBirdResult()}>
                            <StyledButtonLabel>Find Birds</StyledButtonLabel>
                            <StyledButtonLabel>
                                {`${
                                    birds
                                        .filter((f) =>
                                            filterBird.size === undefined
                                                ? true
                                                : f.size.toUpperCase() === filterBird.size.toUpperCase()
                                        )
                                        .filter((f) =>
                                            filterBird.color === undefined ? true : f.color.includes(filterBird.color)
                                        ).length
                                } results`}
                            </StyledButtonLabel>
                        </StyledPressableFind>
                    </StyledRow>
                </StyledContentView>
            </StyledScrollView>
        </StyledSafeAreaView>
    );
};

export default WhichBirdContainer;
