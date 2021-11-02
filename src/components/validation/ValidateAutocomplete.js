import React from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const ValidateAutocomplete = ({ id , options, value, onBlur, onChange, name, variant, label, error, touched, ...rest }) => {

  const isError = !!error && touched;
    return (
      <Autocomplete
        id={id}
        options={options}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        name={name}
        {...rest}
        renderInput={params => (
          <TextField 
            {...params} 
            id={id}
            variant={variant}
            label={label}
            error={isError}
            helperText={isError ? error : ''}
            fullWidth
          />
        )}
      />
    );
};

export default ValidateAutocomplete;