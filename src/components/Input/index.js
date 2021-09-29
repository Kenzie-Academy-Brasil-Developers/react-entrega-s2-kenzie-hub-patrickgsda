import React from "react";
import TextField from "@material-ui/core/TextField";

function Input({ helper, nameLabel, register, name, nameError, ...rest }) {
  return (
    <TextField
      error={nameError}
      helperText={helper}
      label={nameLabel}
      {...register(name)}
      {...rest}
    />
  );
}

export default Input;
