import React from "react";
import H1 from "@material-ui/core/Typography";

function Typography({
  fontFamily = "Merienda",
  selected = "h1",
  children,
  ...rest
}) {
  return (
    <H1 variant={selected} {...rest}>
      {children}
    </H1>
  );
}

export default Typography;
