import React, { useState, useLayoutEffect, useContext } from "react";
import { MaterialIcons, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { View, Pressable } from "react-native";
import styled from "styled-components/native";

// Components
import {
    StyledSafeAreaView,
    StyledScrollView,
    CustomImage,
    StyledContentView,
    StyledModal,
    StyledTextInput,
    StyledSpinner,
} from "../../Common";

// Utils
import imagesUtil from "../../../assets/images/images";

// Context
import { BirdsContext } from "../../../context/birds-context";
import { UserContext } from "../../../context/user-context";

// Custom Hooks
import { useToggle } from "../../../custom-hooks";

const StyledTouchableOpacityOptions = styled.TouchableOpacity`
    margin: ${(props) => props.theme.margin}px 0;
    padding: ${(props) => props.theme.padding * 2}px;
    background-color: ${(props) => (props.selected ? props.theme.primaryColor : props.theme.secondaryColor)};
    align-self: flex-start;
    min-width: 50%;
`;

const StyledButtonLabelOptions = styled.Text`
    font-size: ${(props) => props.theme.fontSize * 1.75}px;
    font-weight: ${(props) => props.theme.fontWeight * 5};
    color: ${(props) => (props.selected ? props.theme.white : props.theme.primaryColor)};
    text-align: center;
`;

const StyledTouchableOpacity = styled.TouchableOpacity``;

const StyledButtonLabel = styled.Text`
    font-size: ${(props) => props.theme.fontSize * 1.75}px;
    font-weight: ${(props) => props.theme.fontWeight * 4};
    color: ${(props) => props.theme.primaryColor};
    text-align: center;
`;

const StyledBox = styled.View`
    width: ${(props) => props.theme.width * 17}px;
    height: ${(props) => props.theme.height * 17}px;
    padding: ${(props) => props.theme.padding / 4}px;
    position: relative;
`;

const StyledMaterialIcons = styled(MaterialIcons)`
    position: absolute;
    left: 0;
    top: 0;
`;

const StyledBirdName = styled.Text`
    position: absolute;
    font-weight: ${(props) => props.theme.fontWeight * 6};
    bottom: ${(props) => props.theme.margin}px;
    left: ${(props) => props.theme.margin}px;
    font-size: ${(props) => props.theme.fontSize * 1.25}px;
`;

const StyledPressableResetFilter = styled(Pressable)`
    padding: ${(props) => props.theme.padding * 2}px;
    background-color: ${(props) => props.theme.primaryColor};
`;

const options = ["All Birds", "Birds I've seen"];
const BirdsContainer = ({ navigation }) => {
    // Local States
    const [selectedIndexOption, setSelectedIndexOption] = useState(0);
    const [showSeen, setShowSeen] = useToggle();
    const [orderBy, setOrderBy] = useToggle();
    const [openSearchModal, setOpenSearchModal] = useToggle();
    const [searchBird, setSearchBird] = useState("");
    // Global States
    const { birds } = useContext(BirdsContext);
    const { user } = useContext(UserContext);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => <FontAwesome5 name="search" size={24} color="black" onPress={setOpenSearchModal} />,
            headerRight: () => {
                if (orderBy) {
                    return <FontAwesome name="sort-alpha-desc" size={24} color="black" onPress={setOrderBy} />;
                } else {
                    return <FontAwesome name="sort-alpha-asc" size={24} color="black" onPress={setOrderBy} />;
                }
            },
        });
    }, [navigation, birds]);

    const onPressBirdDetails = (birdId) => navigation.navigate("Details", { birdId: birdId });

    const onPressOptions = (optionIndex) => {
        setSelectedIndexOption(optionIndex);
        setShowSeen();
    };
    return (
        <StyledSafeAreaView>
            <StyledScrollView>
                <StyledModal openModal={openSearchModal} onRequestClose={setOpenSearchModal}>
                    <View style={{ height: 120, justifyContent: "space-evenly" }}>
                        <StyledTextInput
                            placeholder="Search for a bird..."
                            value={searchBird}
                            onChangeText={setSearchBird}
                        />
                        <StyledPressableResetFilter onPress={() => setSearchBird("")}>
                            <StyledButtonLabel>Reset</StyledButtonLabel>
                        </StyledPressableResetFilter>
                    </View>
                </StyledModal>

                <StyledSpinner />

                {birds.length > 0 && (
                    <React.Fragment>
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
                                {birds
                                    .sort((a, b) => (orderBy ? a.name < b.name : a.name > b.name))
                                    .filter((b) => b.name.toUpperCase().includes(searchBird.toUpperCase()))
                                    .map((d) => (
                                        <StyledTouchableOpacity key={d._id} onPress={() => onPressBirdDetails(d._id)}>
                                            <StyledBox>
                                                <CustomImage height="80%" imgSrc={imagesUtil[`${d.thumbnail}`]} />
                                                <StyledBirdName>{d.name}</StyledBirdName>
                                            </StyledBox>
                                            {Object.keys(user).length > 0 &&
                                                user.data
                                                    .filter((f) => f.birdId === d._id)
                                                    .map((b) => (
                                                        <StyledMaterialIcons
                                                            key={b.birdId}
                                                            size={16}
                                                            color="coral"
                                                            name={b.checked ? "check-box" : ""}
                                                        />
                                                    ))}
                                        </StyledTouchableOpacity>
                                    ))}
                            </StyledContentView>
                        ) : (
                            <StyledContentView>
                                {Object.keys(user).length > 0 &&
                                    user.data.map((u) => (
                                        <React.Fragment key={u.birdId}>
                                            {birds
                                                .sort((a, b) => (orderBy ? a.name < b.name : a.name > b.name))
                                                .filter((f) => f._id === u.birdId && u.checked === showSeen)
                                                .map((d) => (
                                                    <StyledTouchableOpacity
                                                        key={d._id}
                                                        onPress={() => onPressBirdDetails(d._id)}
                                                    >
                                                        <StyledBox>
                                                            <CustomImage
                                                                height="80%"
                                                                imgSrc={imagesUtil[`${d.thumbnail}`]}
                                                            />
                                                            <StyledBirdName>{d.name}</StyledBirdName>
                                                        </StyledBox>
                                                    </StyledTouchableOpacity>
                                                ))}
                                        </React.Fragment>
                                    ))}
                            </StyledContentView>
                        )}
                    </React.Fragment>
                )}
            </StyledScrollView>
        </StyledSafeAreaView>
    );
};

export default BirdsContainer;
