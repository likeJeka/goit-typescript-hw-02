import React from "react";

type ErrorMessageProps = {
  message: string;
};

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return <p>{message}</p>;
};

export default ErrorMessage;
