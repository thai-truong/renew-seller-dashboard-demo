import React from "react";
import { ThemeToggle } from "./ThemeToggle";

export const TitleBar = () => (
  <div className="flex justify-between items-center w-full py-[20px] px-[15px]">
    <h2>reNEW Seller Dashboard</h2>
    <ThemeToggle />
  </div>
)

