import React, { useState } from "react";
import { styled } from "styled-components/native";
import { SliderBox } from "react-native-image-slider-box";

const BannerContainer = styled.View`
  width: 100%;
  justify-content: center;
  margin-bottom: 20px;
  border-radius: 20px;
  overflow: hidden;
`;

const Banner = () => {
  const [parentHeight, setParentHeight] = useState(0);
  const onLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    setParentHeight(width);
  };
  return (
    <BannerContainer onLayout={onLayout}>
      <SliderBox
        parentWidth={parentHeight}
        images={[
          require("../../../assets/slide/slide1.png"),
          require("../../../assets/slide/slide2.png"),
          require("../../../assets/slide/slide3.png"), // Network image
        ]}
        onCurrentImagePressed={(index) => console.log(`image ${index} pressed`)}
        autoplay
      />
    </BannerContainer>
  );
};
export default Banner;
