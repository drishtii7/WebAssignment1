import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

//styling the FormContainer
const FormContainer = styled(Container)({
  backgroundColor: '#f5f5f5', // Light gray color
  color: '#2c3e50',
  padding: '20px',
  borderRadius: '10px',
  maxWidth: '600px', /* Adjusted width for responsiveness */
  margin: '20px auto',
  '@media (max-width: 600px)': {
    padding: '10px',
  }, 
});

const FormTitle = styled(Typography)({
  textAlign: 'center',
  marginBottom: '20px',
});

const FormField = styled('div')({
  marginBottom: '20px', /* Increased margin */
});

const ErrorMessage = styled(Typography)({
  color: 'red',
});

const SuccessMessage = styled(Typography)({
  color: 'green',
  textAlign: 'center',
  marginTop: '20px',
});

const SubmitButton = styled(Button)({
  backgroundColor: '#2c3e50',
  color: 'white',
  '&:hover': {
    backgroundColor: '#34495e',
  },
});

//to see the required fields with asterisk
const LabelWithAsterisk = ({ children }) => (
  <Typography component="label" variant="body1">
    {children} <span style={{ color: 'red' }}>*</span>
  </Typography>
);

const ProfessionalDetailsForm = () => {
  const [formData, setFormData] = useState({
    qualifications: '',
    specialization: '',
    experience: '',
    languages: '',
    memberships: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Cleas previous error message
    if (name === 'experience' && isNaN(value)) {
      setErrors({ ...errors, [name]: 'Years of Experience must be a number' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation for all input fields
    let isValid = true;
    const newErrors = {};
    if (!formData.qualifications) {
      isValid = false;
      newErrors.qualifications = 'Qualifications is required';
    }
    if (!formData.specialization) {
      isValid = false;
      newErrors.specialization = 'Areas of Specialization is required';
    }
    if (!formData.experience) {
      isValid = false;
      newErrors.experience = 'Years of Experience is required';
    } else if (isNaN(formData.experience)) {
      isValid = false;
      newErrors.experience = 'Years of Experience must be a number';
    }

    setErrors(newErrors);

    if (isValid) {
      // Save the form data
      setIsSubmitted(true);
    }
  };

  return (
    <FormContainer>
      <FormTitle variant="h3">Professional Details</FormTitle>
      {isSubmitted ? (
        <SuccessMessage>Your information is saved successfully.</SuccessMessage>
      ) : (
        <form onSubmit={handleSubmit}>
          <FormField>
            <LabelWithAsterisk>Qualifications</LabelWithAsterisk>
            <TextField
              name="qualifications"
              value={formData.qualifications}
              onChange={handleChange}
              multiline
              rows={5}
              fullWidth
              variant="outlined"
            />
            {errors.qualifications && <ErrorMessage>{errors.qualifications}</ErrorMessage>}
          </FormField>
          <FormField>
            <LabelWithAsterisk>Areas of Specialization</LabelWithAsterisk>
            <TextField
              type="text"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
            {errors.specialization && <ErrorMessage>{errors.specialization}</ErrorMessage>}
          </FormField>
          <FormField>
            <LabelWithAsterisk>Years of Experience</LabelWithAsterisk>
            <TextField
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
            {errors.experience && <ErrorMessage>{errors.experience}</ErrorMessage>}
          </FormField>
          <FormField>
            <Typography component="label" variant="body1">Languages Spoken</Typography>
            <TextField
              type="text"
              name="languages"
              value={formData.languages}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
            {errors.languages && <ErrorMessage>{errors.languages}</ErrorMessage>}
          </FormField>
          <FormField>
            <Typography component="label" variant="body1">Professional Memberships</Typography>
            <TextField
              name="memberships"
              value={formData.memberships}
              onChange={handleChange}
              multiline
              rows={5}
              fullWidth
              variant="outlined"
            />
            {errors.memberships && <ErrorMessage>{errors.memberships}</ErrorMessage>}
          </FormField>
          <SubmitButton type="submit" variant="contained" fullWidth>
            Submit
          </SubmitButton>
        </form>
      )}
    </FormContainer>
  );
};

export default ProfessionalDetailsForm;
