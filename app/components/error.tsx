"use client";

import { FC, useEffect } from "react";
import EmptyState from "./EmptyState";

type ErrorStateProps = {
  error: Error;
};

const ErrorState: FC<ErrorStateProps> = ({ error }) => {
  useEffect(() => {
    console.log(error);
  });

  return <EmptyState showReset />;
};

export default ErrorState;
