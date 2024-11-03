import { Animated } from "react-native";
import { useEffect, useRef, useState } from "react";

import { PrimaryText } from "@/components/texts/PrimaryText";

import { paragraphLargeFontSize } from "@/utils/constants/components/typography";

interface FadingTextProps {
  rotatingTexts: string[];
  duration: number;
}

function FadingText({ rotatingTexts, duration }: FadingTextProps) {
  const [activeTextIndex, setActiveTextIndex] = useState(0);

  const opacity = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = (callback: () => void) => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      if (callback) callback();
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fadeOut(() => {
        setActiveTextIndex(
          (prevIndex) => (prevIndex + 1) % rotatingTexts.length
        );
        fadeIn();
      });
    }, duration / rotatingTexts.length + 1);

    // Start with a fade-in for the first text
    fadeIn();

    return () => clearInterval(interval);
  }, []);

  return (
    <Animated.View style={{ opacity }}>
      <PrimaryText fontSize={paragraphLargeFontSize}>
        {rotatingTexts[activeTextIndex]}
      </PrimaryText>
    </Animated.View>
  );
}

export { FadingText };
