const HospitalValidation = (values) => {
    const errors = {};
  
    // Validate hospital name
    if (!values.hospital_name || values.hospital_name.trim() === "") {
      errors.hospital_name = "Hospital name is required";
    } else if (values.hospital_name.length < 3) {
      errors.hospital_name = "Hospital name must be at least 3 characters";
    }
  
    // Validate hospital address
    if (!values.hospital_address || values.hospital_address.trim() === "") {
      errors.hospital_address = "Hospital address is required";
    } else if (values.hospital_address.length < 10) {
      errors.hospital_address = "Address must be at least 10 characters";
    }
  
    // Validate password
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    } else if (!/(?=.*[0-9])(?=.*[a-zA-Z])/.test(values.password)) {
      errors.password = "Password must contain at least one letter and one number";
    }
  
    return errors;
  };
  
  export default HospitalValidation;
  