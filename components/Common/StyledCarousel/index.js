import React, { useState, useRef } from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";

// Components
import CustomImage from "../CustomImage";

// Util
import imagesUtil from "../../../assets/images/images";

const SliderWidth = Dimensions.get("screen").width;

const StyledCarousel = ({ data = [], topDots = 40 }) => {
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
                    height: 420,
                    // paddingVertical: 8,
                }}
            >
                <CustomImage height="100%" imgSrc={imagesUtil[`${item}`]} />
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
                    // Define styles for active dots
                    width: 14,
                    height: 14,
                    borderRadius: 10,
                    marginHorizontal: 0,
                    backgroundColor: "rgba(228, 113, 122, 1)",
                    top: topDots,
                }}
                inactiveDotStyle={{
                    // Define styles for inactive dots
                    width: 8,
                    height: 8,
                    borderRadius: 5,
                    backgroundColor: "rgba(255, 255, 255, 1)",
                }}
                inactiveDotOpacity={1}
                inactiveDotScale={1}
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
                itemWidth={420}
                layoutCardOffset={8}
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
