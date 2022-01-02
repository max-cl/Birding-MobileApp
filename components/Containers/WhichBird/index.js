import React, { useContext, useState } from "react";
import { View, Pressable } from "react-native";
import styled from "styled-components/native";

// Components
import { StyledSafeAreaView, StyledScrollView, StyledModal } from "../../Common";

// Context
import { BirdsContext } from "../../../context/birds-context";

// Custom Hooks
import { useToggle } from "../../../custom-hooks";

const StyledPressable = styled(Pressable)`
    padding: ${(props) => props.theme.padding * 2}px;
    background-color: ${(props) => (props.selected ? props.theme.primaryColor : props.theme.tertiaryColor)};
    width: ${(props) => props.theme.width * 11}px;
    text-align: center;
`;

const StyledButtonLabel = styled.Text`
    font-size: ${(props) => props.theme.fontSize * 1.75}px;
    color: ${(props) => props.reset || props.theme.white};
    text-align: center;
`;

const StyledPressableColors = styled(Pressable)`
    background-color: ${(props) => props.color};
    border-radius: ${(props) => props.theme.borderRadius * 5}px;
    width: ${(props) => props.theme.width * 10}px;
    height: ${(props) => props.theme.height * 10}px;
    margin: ${(props) => props.theme.margin}px;
    border-color: ${(props) => props.theme.borderColor};
    border-width: ${(props) => props.theme.borderWidth}px;
`;

const StyledContainerResetFilter = styled.View`
    position: absolute;
    top: ${(props) => props.theme.margin * 2}px;
    right: ${(props) => props.theme.margin * 2}px;
`;

const StyledPressableResetFilter = styled(Pressable)`
    width: ${(props) => props.theme.width * 20}px;
    text-align: center;
    padding: ${(props) => props.theme.padding * 2}px;
    background-color: ${(props) => props.theme.secondaryColor};
`;

const StyledContentView = styled.View`
    flex: 1;
    flex-direction: column;
    justify-content: center;
    margin-top: ${(props) => props.theme.margin * 10}px;
    padding: ${(props) => props.theme.padding * 2}px;
`;

const StyledRow = styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    border-width: ${(props) => (props.find ? 0 : 1)}px;
    border-color: ${(props) => (props.find ? props.theme.white : props.theme.bgColor)};
    padding: ${(props) => props.theme.padding * 1.5}px;
    margin-top: ${(props) => props.theme.margin * 4}px;
`;

const StyledPressableFind = styled(Pressable)`
    padding: ${(props) => props.theme.padding * 2}px;
    background-color: ${(props) => props.theme.primaryColor};
    text-align: center;
    width: ${(props) => props.theme.width * 30}px;
`;

const StyledFilterNumer = styled.Text`
    font-size: ${(props) => props.theme.fontSize * 3}px;
`;

const StyledFilterDescription = styled.Text`
    font-size: ${(props) => props.theme.fontSize * 1.75}px;
    font-weight: ${(props) => props.theme.fontWeight * 2};
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

// const SizeOptions = ["small", "medium", "big"];

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
                            ></StyledPressableColors>
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
