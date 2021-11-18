import React, { useContext } from "react";
import styled from "styled-components/native";

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

const TextTitle = styled.Text`
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
                            <StyledCarousel data={place.images} />
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
