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
    margin: 8px 0;
    padding: 16px;
    background-color: ${(props) => (props.selected ? "coral" : "oldlace")};
    align-self: flex-start;
    min-width: 50%;
`;

const StyledButtonLabelOptions = styled.Text`
    font-size: 14px;
    font-weight: 500;
    color: ${(props) => (props.selected ? "white" : "coral")};
    text-align: center;
`;

const StyledTouchableOpacity = styled.TouchableOpacity``;

const StyledButtonLabel = styled.Text`
    font-size: 14px;
    font-weight: 400;
    color: coral;
    text-align: center;
`;

const StyledBox = styled.View`
    width: 132px;
    height: 132px;
    padding: 4px;
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
    bottom: 8px;
    left: 8px;
    font-size: 8px;
`;

const StyledPressableResetFilter = styled(Pressable)`
    padding: 16px;
    background-color: oldlace;
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
