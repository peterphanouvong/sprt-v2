import React from "react";
import Image from "next/image";
import logo from "../images/sprt.svg";
import logoWhite from "../images/sprt-white.svg";

interface Props {
  color?: "white" | "black";
  size?: "sm" | "md" | "lg";
}

const BaseLogo: React.FC<Props> = ({ color = "black", size = "md" }) => {
  const width = 100;
  const height = 60;

  let sizeMultiplier: number;
  switch (size) {
    case "sm":
      sizeMultiplier = 0.6;
      break;
    case "md":
      sizeMultiplier = 1;
      break;
    case "lg":
      sizeMultiplier = 1.2;
      break;
    default:
      sizeMultiplier = 1;
      break;
  }

  return color === "black" ? (
    <Image
      width={width * sizeMultiplier}
      height={height * sizeMultiplier}
      src={logo}
    />
  ) : (
    <Image
      width={width * sizeMultiplier}
      height={height * sizeMultiplier}
      src={logoWhite}
    />
  );
};

export { BaseLogo };
