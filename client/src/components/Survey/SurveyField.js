import React from "react";

//material ui
import { TextField } from "@material-ui/core";

export default ({ input, label, meta: { error, touched }, rows, variant, multiline }) => {
  return (
    <div style={{ marginBottom: 10, marginTop: 10 }}>
      <TextField
        fullWidth
        {...input}
        label={label}
        error={touched && error}
        helperText={error && touched ? error : ""}
        rows={rows}
        variant={variant}
        multiline={multiline}
      />
    </div>
  );
};
