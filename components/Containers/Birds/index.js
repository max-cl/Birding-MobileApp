import React, { useState, useLayoutEffect, useContext } from "react";
import { MaterialIcons, FontAwesome, FontAwesome5, AntDesign } from "@expo/vector-icons";
import styled from "styled-components/native";

// Components
import {
    StyledSafeAreaView,
    StyledScrollView,
    CustomImage,
    StyledContentView,
    StyledModal,
    StyledTextInput,
    StyledPressable,
} from "../../Common";

// Utils
import imagesUtil from "../../../assets/images/images";

// Context
import { BirdsContext } from "../../../context/birds-context";

const StyledTouchableOpacityOptions = styled.TouchableOpacity`
    margin: 8px 8px;
    padding: 8px;
    background-color: ${(props) => (props.selected ? "coral" : "oldlace")};
    align-self: flex-start;
    min-width: 42%;
    text-align: center;
`;

const StyledButtonLabelOptions = styled.Text`
    font-size: 12px;
    font-weight: 500;
    color: ${(props) => (props.selected ? "white" : "coral")};
`;

const StyledTouchableOpacity = styled.TouchableOpacity``;

const StyledButtonLabel = styled.Text`
    font-size: 12px;
    font-weight: 400;
    color: #ffffff;
    text-align: center;
`;

const StyledBox = styled.View`
    width: 100px;
    height: 100px;
    padding: 2px;
    background-color: #f0f0f0;
    position: relative;
`;

const StyledMaterialIcons = styled(MaterialIcons)`
    position: absolute;
    left: 0;
    top: 0;
`;

const StyledBirdName = styled.Text`
    position: absolute;
    font-weight: 600;
    bottom: 2px;
    left: 4px;
    font-size: 8px;
`;

const StyledButtonCloseModal = styled(AntDesign)`
    position: absolute;
    right: 8px;
    top: 8px;
`;

const options = ["All Birds", "Birds I've seen"];
const BirdsContainer = ({ navigation }) => {
    // Local States
    const [selectedIndexOption, setSelectedIndexOption] = useState(0);
    const [showSeen, setShowSeen] = useState(false);
    const [orderBy, setOrderBy] = useState(false);
    const [openSearchModal, setOpenSearchModal] = useState(false);
    const [searchBird, setSearchBird] = useState("");
    // Global States
    const { birds } = useContext(BirdsContext);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <FontAwesome5
                    name="search"
                    size={24}
                    color="black"
                    onPress={() => setOpenSearchModal(!openSearchModal)}
                />
            ),
            headerRight: () => {
                if (orderBy) {
                    return (
                        <FontAwesome
                            name="sort-alpha-desc"
                            size={24}
                            color="black"
                            onPress={() => setOrderBy(!orderBy)}
                        />
                    );
                } else {
                    return (
                        <FontAwesome
                            name="sort-alpha-asc"
                            size={24}
                            color="black"
                            onPress={() => setOrderBy(!orderBy)}
                        />
                    );
                }
            },
        });
    }, [navigation, birds]);

    const onPressBirdDetails = (birdId) => navigation.push("Details", { birdId: birdId });

    const onPressOptions = (optionIndex) => {
        setSelectedIndexOption(optionIndex);
        setShowSeen(!showSeen);
    };
    return (
        <StyledSafeAreaView>
            <StyledScrollView>
                <StyledModal openModal={openSearchModal} onRequestClose={() => setOpenSearchModal(!openSearchModal)}>
                    <StyledTextInput
                        placeholder="Search for a bird..."
                        value={searchBird}
                        onChangeText={setSearchBird}
                    />
                    <StyledPressable onPress={() => setSearchBird("")}>
                        <StyledButtonLabel>Reset</StyledButtonLabel>
                    </StyledPressable>
                    <StyledButtonCloseModal
                        name="closecircle"
                        size={24}
                        color="black"
                        onPress={() => setOpenSearchModal(!openSearchModal)}
                    />
                </StyledModal>

                <StyledContentView>
                    {options.map((option, index) => (
                        <StyledTouchableOpacityOptions
                            key={index}
                            onPress={() => onPressOptions(index)}
                            selected={selectedIndexOption === index}
                        >
                            <StyledButtonLabelOptions selected={selectedIndexOption === index}>
                                {option}
                            </StyledButtonLabelOptions>
                        </StyledTouchableOpacityOptions>
                    ))}
                </StyledContentView>

                {!showSeen ? (
                    <StyledContentView>
                        {birds.length > 0 &&
                            birds
                                .sort((a, b) => (orderBy ? a.name < b.name : a.name > b.name))
                                .filter((b) => b.name.toUpperCase().includes(searchBird.toUpperCase()))
                                .map((d) => (
                                    <StyledTouchableOpacity key={d.id} onPress={() => onPressBirdDetails(d.id)}>
                                        <StyledBox>
                                            <CustomImage height="80%" imgSrc={imagesUtil[`${d.img}`]} />
                                            <StyledBirdName>{d.name}</StyledBirdName>
                                        </StyledBox>
                                        <StyledMaterialIcons
                                            size={16}
                                            color={"coral"}
                                            name={d.checked ? "check-box" : ""}
                                        />
                                    </StyledTouchableOpacity>
                                ))}
                    </StyledContentView>
                ) : (
                    <StyledContentView>
                        {birds.length > 0 &&
                            birds
                                .sort((a, b) => (orderBy ? a.name < b.name : a.name > b.name))
                                .filter((f) => f.checked === showSeen)
                                .map((d) => (
                                    <StyledTouchableOpacity key={d.id} onPress={() => onPressBirdDetails(d.id)}>
                                        <StyledBox>
                                            <CustomImage height="100%" imgSrc={imagesUtil[`${d.img}`]} />
                                            <StyledBirdName>{d.name}</StyledBirdName>
                                        </StyledBox>
                                    </StyledTouchableOpacity>
                                ))}
                    </StyledContentView>
                )}
            </StyledScrollView>
        </StyledSafeAreaView>
    );
};

export default BirdsContainer;
