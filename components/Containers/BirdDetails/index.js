import React, { useContext } from "react";
import styled from "styled-components/native";
import { View } from "react-native";

const TextButton = styled.Text`
    color: white;
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
    flex-direction: column;
    justify-content: space-evenly;
    align-items: flex-start;
    padding: 8px 16px;
`;

const ContentCharacteristics = styled.View`
    flex: 1;
    flex-direction: row;
    margin-bottom: 8px;
`;

const CharacteristicName = styled.Text`
    font-size: 12px;
    font-weight: 800;
`;

// Components
import { StyledSafeAreaView, StyledScrollView, StyledContentView, StyledPressable, StyledCarousel } from "../../Common";

// Context
import { BirdsContext } from "../../../context/birds-context";
import { UserContext } from "../../../context/user-context";

const BirdDetailsContainer = ({ route }) => {
    const { birdId } = route.params;
    // Global State
    const { birds } = useContext(BirdsContext);
    const { user, updateUserBirdChecked } = useContext(UserContext);

    return (
        <StyledSafeAreaView>
            <StyledScrollView>
                {birds
                    .filter((f) => f._id === birdId)
                    .map((bird) => (
                        <StyledContentView key={bird._id} fDirection="column">
                            <StyledCarousel data={bird.images} />
                            {Object.keys(user).length > 0 &&
                                user.data
                                    .filter((f) => f.birdId === bird._id)
                                    .map((b) => (
                                        <StyledPressable
                                            key={b.birdId}
                                            onPress={() => updateUserBirdChecked(birdId)}
                                            seen={b.checked}
                                        >
                                            <TextButton seen={b.checked}>
                                                {b.checked ? "Mark as seen" : "No seen"}
                                            </TextButton>
                                        </StyledPressable>
                                    ))}
                            <ContainerText>
                                <TextBirdName>{bird.name}</TextBirdName>
                                <TextDescription>{bird.description}</TextDescription>
                            </ContainerText>

                            <ContainerCharacteristics>
                                <ContentCharacteristics>
                                    <CharacteristicName>Size: </CharacteristicName>
                                    <TextDescription>{bird.size}</TextDescription>
                                </ContentCharacteristics>
                                <ContentCharacteristics>
                                    <CharacteristicName>Lenght: </CharacteristicName>
                                    <TextDescription>{bird.information.length}</TextDescription>
                                </ContentCharacteristics>
                                <ContentCharacteristics>
                                    <CharacteristicName>Wingspan: </CharacteristicName>
                                    <TextDescription>{bird.information.wingspan}</TextDescription>
                                </ContentCharacteristics>
                            </ContainerCharacteristics>
                        </StyledContentView>
                    ))}
            </StyledScrollView>
        </StyledSafeAreaView>
    );
};

export default BirdDetailsContainer;
