"use client";

import { IButtonProps } from "./Button.types";

const Button = ({ label, link, click, type }: IButtonProps) => {
  return (
    <button onClick={(e) => click!({})} type={type}>
      {label}
    </button>
  );
};

export default Button;
