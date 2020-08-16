import React from "react";

//material ui
import { TextField } from "@material-ui/core";

class SurveyField extends React.Component {
  render() {
    const {
      input,
      label,
      meta: { error, touched },
      rows,
      variant,
      multiline,
    } = this.props;

    if (input.name === "body") {
      return (
        <div style={{ marginBottom: 25, marginTop: 25 }}>
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
    } else {
      return (
        <div style={{ marginBottom: 25, marginTop: 25 }}>
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
    }
  }
}

export default SurveyField;
