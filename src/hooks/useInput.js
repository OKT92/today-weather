import { useState } from "react";

const useInput = (props = {}) => {
  const { componentProps = {}, ...customizeProps } = props;

  const { validator } = customizeProps;

  const [value, setValue] = useState(
    componentProps.defaultValue || componentProps.value || ""
  );

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const clear = () => {
    setValue("");
  };

  return [
    { value, onChange },
    { setValue, clear },
  ];
};

export default useInput;
