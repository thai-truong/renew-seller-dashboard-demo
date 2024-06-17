import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type WarningAndErrorProps = {
  type: "warning" | "error";
  title?: string;
  message: string;
}

type InfoProps = {
  type: "info";
  title: string;
  message: string;
}

type Props = WarningAndErrorProps | InfoProps;

const Banner = ({ type, title, message }: Props) => {
  const bannerTitle = () => {
    if (type === "info" || title) {
      return title;
    } else {
      if (type === "error") {
        return "Error encountered!";
      } else {
        return "Warning!"
      }
    }
  }
  const bannerTypeColor = () => {
    switch (type) {
      case "warning":
        return "text-yellow-500 dark:text-yellow-900";
      case "error":
        return "text-red-500 dark:text-red-900";
      case "info":
        return "text-teal-500 dark:text-teal-900";
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className={bannerTypeColor()}>{bannerTitle()}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className={bannerTypeColor()}>{message}</p>
      </CardContent>
    </Card>
  )
}

export default Banner;
