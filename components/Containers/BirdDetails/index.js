import React, { useContext } from "react";
import styled from "styled-components/native";

const TextButton = styled.Text`
    color: ${(props) => props.theme.white};
    font-size: ${(props) => props.theme.fontSize * 2}px;
    font-weight: ${(props) => props.theme.fontWeight * 8};
    text-transform: uppercase;
    text-align: center;
`;

const ContainerText = styled.View`
    padding: ${(props) => props.theme.padding * 2}px ${(props) => props.theme.padding * 2}px
        ${(props) => props.theme.padding / 2}px;
    justify-content: space-between;
`;

const TextBirdName = styled.Text`
    font-size: ${(props) => props.theme.fontSize * 2}px;
    font-weight: ${(props) => props.theme.fontWeight * 6};
    text-align: center;
    margin-bottom: ${(props) => props.theme.margin * 2}px;
    text-transform: uppercase;
`;

const TextDescription = styled.Text`
    font-size: ${(props) => props.theme.fontSize * 1.5}px;
    text-align: justify;
`;

const ContainerCharacteristics = styled.View`
    padding: ${(props) => props.theme.padding * 2}px;
`;

const ContentCharacteristics = styled.View`
    flex: 1;
    flex-direction: row;
    margin-bottom: ${(props) => props.theme.margin}px;
`;

const CharacteristicName = styled.Text`
    font-size: ${(props) => props.theme.fontSize * 1.5}px;
    font-weight: ${(props) => props.theme.fontWeight * 8};
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
