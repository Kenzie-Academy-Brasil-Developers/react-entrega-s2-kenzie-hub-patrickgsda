import React from "react";
import Btn from "@material-ui/core/Button";

function Button({ selected = "contained", children, ...rest }) {
  return (
    <Btn variant={selected} {...rest}>
      {children}
    </Btn>
  );
}

export default Button;
