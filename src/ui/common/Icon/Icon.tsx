import { default as React, FC } from "react";
import { HandySvg } from "@handy-ones/handy-svg";

interface IconProps {
  className: string;
  src: string;
}

export const Icon: FC<IconProps> = ({ className, src }) => {
  return <HandySvg className={className} src={src} />;
};
