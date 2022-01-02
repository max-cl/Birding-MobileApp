import React, { useContext } from "react";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import styled from "styled-components/native";

// Components
import { StyledSafeAreaView, StyledScrollView, CustomImage, StyledContentView, StyledSpinner } from "../../Common";

// Utils
import imagesUtil from "../../../assets/images/images";

// Context
import { BirdsContext } from "../../../context/birds-context";
import { UserContext } from "../../../context/user-context";

const StyledTouchableOpacity = styled(TouchableOpacity)``;

const StyledBox = styled.View`
    width: ${(props) => props.theme.width * 17}px;
    height: ${(props) => props.theme.height * 17}px;
    padding: ${(props) => props.theme.padding / 4}px;
    position: relative;
`;

const StyledBirdName = styled.Text`
    position: absolute;
    font-weight: ${(props) => props.theme.fontWeight * 6};
    bottom: ${(props) => props.theme.margin / 4}px;
    left: ${(props) => props.theme.margin / 2}px;
    font-size: ${(props) => props.theme.fontSize * 1.25}px;
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
    const { user } = useContext(UserContext);

    const onPressBirdDetails = (birdId) =>
        navigation.push("Details", {
            birdId: birdId,
        });

    return (
        <StyledSafeAreaView>
            <StyledScrollView>
                <StyledSpinner />
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
                                <StyledTouchableOpacity key={d._id} onPress={() => onPressBirdDetails(d._id)}>
                                    <StyledBox>
                                        <CustomImage height="80%" imgSrc={imagesUtil[`${d.thumbnail}`]} />
                                        <StyledBirdName>{d.name}</StyledBirdName>
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
                                    </StyledBox>
                                </StyledTouchableOpacity>
                            ))}
                </StyledContentView>
            </StyledScrollView>
        </StyledSafeAreaView>
    );
};

export default WhichBirdResultContainer;
