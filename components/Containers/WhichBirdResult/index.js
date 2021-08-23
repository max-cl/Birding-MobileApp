import React, { useContext } from "react";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import styled from "styled-components/native";

// Components
import { StyledSafeAreaView, StyledScrollView, CustomImage, StyledContentView } from "../../Common";

// Utils
import imagesUtil from "../../../assets/images/images";

// Context
import { BirdsContext } from "../../../context/birds-context";

const StyledTouchableOpacity = styled(TouchableOpacity)``;

const StyledBox = styled.View`
    width: 100px;
    height: 100px;
    padding: 2px;
    background-color: #f0f0f0;
    position: relative;
`;

const StyledBirdName = styled.Text`
    position: absolute;
    font-weight: 600;
    bottom: 2px;
    left: 4px;
    font-size: 8px;
`;

const StyledMaterialIcons = styled(MaterialIcons)`
    position: absolute;
    left: 0;
    top: 0;
`;

const WhichBirdResultContainer = ({ route, navigation }) => {
    // Route Params
    const { filterBird } = route.params;
    // Global States
    const { birds } = useContext(BirdsContext);

    const onPressBirdDetails = (birdId) =>
        navigation.push("Details", {
            birdId: birdId,
        });

    return (
        <StyledSafeAreaView>
            <StyledScrollView>
                <StyledContentView>
                    {birds.length > 0 &&
                        birds
                            .sort((a, b) => a.name < b.name)
                            .filter((f) =>
                                filterBird.size === undefined
                                    ? true
                                    : f.size.toUpperCase() === filterBird.size.toUpperCase()
                            )
                            .filter((f) => (filterBird.color === undefined ? true : f.color.includes(filterBird.color)))
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
            </StyledScrollView>
        </StyledSafeAreaView>
    );
};

export default WhichBirdResultContainer;
