import React from "react";
import Image from "next/image";
import logo from "../images/sprt.svg";
import logoWhite from "../images/sprt-white.svg";

interface Props {
  color?: "white" | "black";
}

const Logo: React.FC<Props> = ({ color = "black" }) => {
  return color === "black" ? (
    <Image width={100} height={60} src={logo} />
  ) : (
    <Image width={100} height={60} src={logoWhite} />
  );
};

export default Logo;
