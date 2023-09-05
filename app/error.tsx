"use client";
import React, { useEffect } from "react";
import EmptyState from "./components/EmptyState";

type Props = {
  error: Error;
};

const ErrorPage = ({ error }: Props) => {
  useEffect(() => {
    console.log(error);
  }, [error]);
  return (
    <EmptyState title="Uh-oh! Take cover!" subtitle="Something went wrong!" />
  );
};

export default ErrorPage;
