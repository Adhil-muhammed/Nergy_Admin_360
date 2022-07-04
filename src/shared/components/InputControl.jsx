import React, { forwardRef } from "react";
import { Input, Label } from "reactstrap";
import Select from "react-select";

const InputControl = forwardRef((props, ref) => {
  const customStyles = {
    control: (base, state) => ({
      ...base,
      // state.isFocused can display different borderColor if you need it
      borderColor: state.isFocused ? "#ddd" : props.isValid ? "#ddd" : "red",
      // overwrittes hover style
      "&:hover": {
        borderColor: state.isFocused ? "#ddd" : props.isValid ? "#ddd" : "red",
      },
    }),
  };
  const { label, type, value, ...rest } = props;
  let inputElement = null;
  switch (type) {
    case "react-select":
      inputElement = (
        <Select styles={customStyles} closeMenuOnSelect {...rest} value={value} ref={ref} />
      );
      break;
    default:
      inputElement = (
        <Input className="form-control" value={value} type={type} {...rest} ref={ref} />
      );
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
