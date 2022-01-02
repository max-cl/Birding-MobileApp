import React, { useContext } from "react";
import styled from "styled-components/native";

const ContainerText = styled.View`
    padding: ${(props) => props.theme.padding * 2}px ${(props) => props.theme.padding * 2}px
        ${(props) => props.theme.padding}px;
    justify-content: space-between;
`;

const TextTitle = styled.Text`
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

// Components
import { StyledSafeAreaView, StyledScrollView, StyledContentView, StyledCarousel } from "../../Common";

// Context
import { PlacesContext } from "../../../context/places-context";

const PlaceDetailsContainer = ({ route }) => {
    const { placeId } = route.params;
    // Global State
    const { places } = useContext(PlacesContext);

    return (
        <StyledSafeAreaView>
            <StyledScrollView>
                {places
                    .filter((f) => f._id === placeId)
                    .map((place) => (
                        <StyledContentView key={place._id} fDirection="column">
                            <StyledCarousel data={place.images} topDots={128} />
                            <ContainerText>
                                <TextTitle>{place.title}</TextTitle>
                                <TextDescription>{place.description}</TextDescription>
                            </ContainerText>
                        </StyledContentView>
                    ))}
            </StyledScrollView>
        </StyledSafeAreaView>
    );
};

export default PlaceDetailsContainer;
