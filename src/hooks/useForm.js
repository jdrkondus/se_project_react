import { useState } from "react";

// useForm() accepts an object of default values as an argument,
// creates a state object, its setter, and a change handler, and
// returns them.
export function useForm(defaultValues) {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});

  // Simple validation rules for login form
  const validate = (name, value) => {
    let error = "";
    if (name === "email") {
      if (!value) {
        error = "Email is required.";
      } else if (!/^\S+@\S+\.\S+$/.test(value)) {
        error = "Enter a valid email address.";
      }
    }
    if (name === "password") {
      if (!value) {
        error = "Password is required.";
      } else if (value.length < 6) {
        error = "Password must be at least 6 characters.";
      }
    }
    if (name === "name") {
      if (!value) {
        error = "Name is required.";
      } else if (value.length < 2 || value.length > 30) {
        error = "Name must be between 2 and 30 characters.";
      }
    }
    if (name === "avatar") {
      if (!value) {
        error = "Avatar URL is required.";
      } else if (value && !/^https?:\/\/.+\..+/.test(value)) {
        error = "Enter a valid URL.";
      }
    }
if (name === "email" && !value) {
  error = "Email or password is incorrect.";
} else if (name === "password" && !value) {
  error = "Email or password is incorrect.";
}
    setErrors((prev) => ({ ...prev, [name]: error }));
  
    return error;
  };

  function handleChange(event) {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
    validate(name, value);
  };


  return { values, handleChange, setValues, errors, setErrors  };
}