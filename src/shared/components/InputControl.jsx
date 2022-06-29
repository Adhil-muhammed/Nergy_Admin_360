import React, { forwardRef } from "react";
import { Input, Label } from "reactstrap";
const InputControl = forwardRef((props, ref) => {
  const { label, type, value, ...rest } = props;
  let inputElement = null;
  switch (type) {
    case "textarea":
      inputElement = <Input className="form-control" type={type} {...rest} ref={ref} />;
      break;
    default:
      inputElement = <Input className="form-control" type={type} {...rest} ref={ref} />;
      break;
  }
  return (
    <>
      {props.label && (
        <Label htmlFor={props.name} className="form-label">
          {props.label}
        </Label>
      )}
      {inputElement}
    </>
  );
});

export default InputControl;
