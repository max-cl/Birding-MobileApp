import React, { useContext, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import styled from "styled-components/native";

// Components
import { StyledSafeAreaView, StyledScrollView, StyledModal } from "../../Common";

// Context
import { BirdsContext } from "../../../context/birds-context";

const StyledPressable = styled(Pressable)`
    padding: 8px;
    background-color: ${(props) => (props.selected ? "coral" : "#2196f3")};
    text-align: center;
    width: 72px;
`;

const StyledButtonLabel = styled.Text`
    font-size: 12px;
    font-weight: 400;
    color: ${(props) => props.reset || "#ffffff"};
    text-align: center;
`;

const StyledPressableColors = styled(Pressable)`
    background-color: ${(props) => props.color};
    border-radius: 50px;
    width: 64px;
    height: 64px;
    margin: 4px;
    border-color: #c0c0c0;
    border-width: 1px;
`;

const StyledContainerResetFilter = styled.View`
    position: absolute;
    top: 24px;
    right: 16px;
`;

const StyledPressableResetFilter = styled(Pressable)`
    width: 100px;
    text-align: center;
    padding: 8px;
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
    padding: 8px;
    background-color: coral;
    text-align: center;
    width: 96px;
`;

const StyledFilterNumer = styled.Text`
    font-size: 24px;
    font-weight: 600;
`;

const StyledFilterDescription = styled.Text`
    font-size: 12px;
    font-weight: 200;
`;

const StyledModalViewColors = ({ children }) => (
    <View
        style={{
            margin: 0,
            backgroundColor: "white",
            position: "relative",
            borderRadius: 20,
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            width: 240,
            height: 400,
            justifyContent: "space-evenly",
            flexDirection: "row",
            flexWrap: "wrap",
            paddingVertical: 56,
            paddingHorizontal: 12,
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
    const [openSizeModal, setOpenSizeModal] = useState(false);
    const [openColorModal, setOpenColorModal] = useState(false);

    const onPressWhichBirdResult = () =>
        navigation.navigate("WhichBirdResult", {
            filterBird: filterBird,
        });

    return (
        <StyledSafeAreaView>
            <StyledScrollView>
                {/**  START Size */}
                <StyledModal openModal={openSizeModal} onRequestClose={() => setOpenSizeModal(!openSizeModal)}>
                    {birdSizes.map((size, index) => (
                        <StyledPressable
                            key={index}
                            selected={filterBird.size === size}
                            onPress={() => {
                                setFilterBird({ ...filterBird, size });
                                setOpenSizeModal(!openSizeModal);
                            }}
                        >
                            <StyledButtonLabel>{size}</StyledButtonLabel>
                        </StyledPressable>
                    ))}

                    <AntDesign
                        name="closecircle"
                        size={24}
                        color="black"
                        onPress={() => setOpenSizeModal(!openSizeModal)}
                        style={{ position: "absolute", right: 8, top: 8 }}
                    />
                </StyledModal>
                {/**  END Size */}

                {/**  START Color */}
                <StyledModal openModal={openColorModal} onRequestClose={() => setOpenColorModal(!openColorModal)}>
                    <StyledModalViewColors>
                        {birdColors.map((color, index) => (
                            <StyledPressableColors
                                key={index}
                                color={color}
                                onPress={() => {
                                    setFilterBird({ ...filterBird, color });
                                    setOpenColorModal(!openColorModal);
                                }}
                            >
                                <Text>{"                  "}</Text>
                            </StyledPressableColors>
                        ))}

                        <AntDesign
                            name="closecircle"
                            size={24}
                            color="black"
                            onPress={() => setOpenColorModal(!openColorModal)}
                            style={{ position: "absolute", right: 8, top: 8 }}
                        />
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
                        <StyledPressable
                            selected={filterBird.size !== undefined}
                            onPress={() => setOpenSizeModal(!openSizeModal)}
                        >
                            <StyledButtonLabel>{filterBird.size !== undefined ? "Chosen" : "Choose"}</StyledButtonLabel>
                        </StyledPressable>
                    </StyledRow>
                    <StyledRow>
                        <StyledFilterNumer>2</StyledFilterNumer>
                        <StyledFilterDescription> What color is the bird?</StyledFilterDescription>
                        <StyledPressable
                            selected={filterBird.color !== undefined}
                            onPress={() => setOpenColorModal(!openColorModal)}
                        >
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
