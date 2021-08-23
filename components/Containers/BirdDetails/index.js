import React, { useContext } from "react";
import styled from "styled-components/native";

const TextButton = styled.Text`
    color: #ffffff;
    font-size: 16px;
    font-weight: 800;
    text-align: center;
`;

const ContainerText = styled.View`
    padding: 16px 16px 8px;
    justify-content: space-between;
`;

const TextBirdName = styled.Text`
    font-size: 20px;
    font-weight: 600;
    text-align: center;
    margin-bottom: 16px;
`;

const TextDescription = styled.Text`
    font-size: 12px;
    font-weight: 400;
    text-align: justify;
`;

const ContainerCharacteristics = styled.View`
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 8px 16px;
`;

const CharacteristicName = styled.Text`
    font-size: 12px;
    font-weight: 800;
`;

// Components
import { StyledSafeAreaView, StyledScrollView, CustomImage, StyledContentView, StyledPressable } from "../../Common";

// Utils
import imagesUtil from "../../../assets/images/images";

// Context
import { BirdsContext } from "../../../context/birds-context";

const BirdDetailsContainer = ({ route }) => {
    const { birdId } = route.params;
    // Global State
    const { birds, updateBirdChecked } = useContext(BirdsContext);

    return (
        <StyledSafeAreaView>
            <StyledScrollView>
                {birds
                    .filter((f) => f.id === birdId)
                    .map((bird) => (
                        <StyledContentView key={bird.id} fDirection="column">
                            <CustomImage height={260} imgSrc={imagesUtil[`${bird.img}`]} />
                            <StyledPressable onPress={() => updateBirdChecked(birdId)}>
                                <TextButton>{bird.checked ? "Mark as seen" : "No seen"}</TextButton>
                            </StyledPressable>
                            <ContainerText>
                                <TextBirdName>{bird.name}</TextBirdName>
                                <TextDescription>{bird.description}</TextDescription>
                            </ContainerText>

                            <ContainerCharacteristics>
                                <CharacteristicName>Size: </CharacteristicName>
                                <TextDescription>{bird.size}</TextDescription>
                            </ContainerCharacteristics>
                        </StyledContentView>
                    ))}
            </StyledScrollView>
        </StyledSafeAreaView>
    );
};

export default BirdDetailsContainer;
