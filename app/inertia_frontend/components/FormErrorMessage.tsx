import { CrossCircledIcon } from "@radix-ui/react-icons";
import React from "react";

type Props = {
  message: string;
}

const FormErrorMessage = ({ message }: Props) => (
  <p className="flex items-center gap-x-2 text-sm text-red-500 dark:text-red-900"><CrossCircledIcon /> {message}</p>
);

export default FormErrorMessage;
