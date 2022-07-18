import React, { Children } from "react";
import { Button, Spinner } from "reactstrap";

export const LoadingButton = (props) => {
  const { isLoading, children, ...rest } = props;
  return (
    <Button disabled={isLoading} {...rest}>
      {isLoading ? "Loading..." : children}
    </Button>
  );
};
