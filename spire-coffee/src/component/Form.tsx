import { Box, Button, TextField } from "@mui/material";

type FormField = {
  id: string;
  label: string;
  type: string;
  autoComplete?: string;
};

type FormProps = {
  fields: FormField[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: (event: React.MouseEvent<Element, MouseEvent>) => void;
  errors: { [key: string]: string };
  values: { [key: string]: string };
  buttonLabel: string;
};

const Form = ({
  fields,
  onChange,
  onClick,
  errors,
  values,
  buttonLabel,
}: FormProps) => {
  return (
    <Box component="form" noValidate sx={{ mt: 1 }}>
      {fields.map((field) => (
        <TextField
          key={field.id}
          margin="normal"
          required
          fullWidth
          id={field.id}
          label={field.label}
          type={field.type}
          name={field.id}
          autoComplete={field.autoComplete}
          value={values[field.id] || ""} // Use values prop to set the input value
          onChange={onChange}
          error={!!errors[field.id]}
          helperText={errors[field.id]}
        />
      ))}
      <Button
        color="secondary"
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={onClick}
      >
        {buttonLabel}
      </Button>
    </Box>
  );
};

export default Form;
