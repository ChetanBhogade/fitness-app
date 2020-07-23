const { Dimensions } = require("react-native");

const FigmaWidth = 411;
const FigmaHeight = 823;

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

export const getFlexiblePixels = (pixels, isWidth = true) => {
  const currentPercentage =
    (pixels / (isWidth ? FigmaWidth : FigmaHeight)) * 100;
  const getValue =
    (currentPercentage / 100) * (isWidth ? SCREEN_WIDTH : SCREEN_HEIGHT);

  return getValue;
};
