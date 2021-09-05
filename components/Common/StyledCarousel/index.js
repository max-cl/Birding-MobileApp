import React, { useState, useRef } from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";

// Components
import CustomImage from "../CustomImage";

// Util
import imagesUtil from "../../../assets/images/images";

const SliderWidth = Dimensions.get("screen").width;

const StyledCarousel = ({ data = [] }) => {
    // Local States
    const [activeIndex, setActivateIndex] = useState(0);
    // Ref
    const carouselRef = useRef();

    const _onPressCarousel = (index) => {
        // here handle carousel press
        carouselRef.current.snapToItem(index);
    };

    const _renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    _onPressCarousel(index);
                }}
                style={{
                    backgroundColor: "white",
                    // borderRadius: 20,
                    height: 400,
                    // padding: 50,
                }}
            >
                <CustomImage height="80%" imgSrc={imagesUtil[`${item}`]} />
            </TouchableOpacity>
        );
    };

    const PaginationContainer = () => {
        return (
            <Pagination
                dotsLength={data.length}
                activeDotIndex={activeIndex}
                containerStyle={{
                    backgroundColor: "transparent",
                    position: "absolute",
                    width: "100%",
                }}
                dotStyle={{
                    width: 6,
                    height: 6,
                    borderRadius: 5,
                    marginHorizontal: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.75)",
                    top: 52,
                }}
                inactiveDotStyle={
                    {
                        // Define styles for inactive dots here
                    }
                }
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
        );
    };

    return (
        <React.Fragment>
            <Carousel
                layout={"default"}
                ref={carouselRef}
                data={data}
                sliderWidth={SliderWidth}
                itemWidth={400}
                layoutCardOffset={9}
                renderItem={_renderItem}
                useScrollView
                onSnapToItem={(index) => setActivateIndex(index)}
                activeSlideAlignment="center"
            />
            <PaginationContainer />
        </React.Fragment>
    );
};

export default StyledCarousel;
