import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  TextField,
  Button,
  Typography,
  Box,
  Container,
  Snackbar,
  Alert
} from '@mui/material';

/*FormContainer will have the styled components for form */
const FormContainer = styled(Container)({
  backgroundColor: '#f5f5f5',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  marginTop: '20px',
  '@media (max-width: 600px)': {
    padding: '10px',
  },
});

const ContactInfo = styled(Box)({
  marginTop: '20px',
  padding: '20px',
  backgroundColor: '#2c3e50',
  color: 'white',
  borderRadius: '8px',
  textAlign: 'center',
});

//Snackbar is used to show success message after submitting the form
const StyledSnackbar = styled(Snackbar)({
  '& .MuiAlert-root': {
    fontSize: '1.2rem',
    width: '100%',
    '@media (max-width: 600px)': {
      fontSize: '1rem',
    },
  },
});

const Feedback = () => {
  //sets the intial state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  //validation for email
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  //validation for all required fields
  const validate = () => {
    let tempErrors = {};
    const nameRegex = /^[A-Za-z\s]+$/; // Regular expression to allow only letters and spaces
  
    tempErrors.name = name ? "" : "Name is required.";
    if (name && !nameRegex.test(name)) {
      tempErrors.name = "Only letters are allowed.";
    }
  
    tempErrors.email = email ? "" : "Email is required.";
    if (email && !validateEmail(email)) {
      tempErrors.email = "Email is not valid.";
    }
  
    tempErrors.message = message ? "" : "Message is required.";
  
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === "");
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setShowSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
      setErrors({});
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (errors.name) {
      setErrors((prev) => ({ ...prev, name: '' }));
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: '' }));
    }
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
    if (errors.message) {
      setErrors((prev) => ({ ...prev, message: '' }));
    }
  };

  return (
    <Container maxWidth="sm">
      <StyledSnackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setShowSuccess(false)} severity="success">
          Your feedback has been submitted successfully!
        </Alert>
      </StyledSnackbar>
      <FormContainer>
        <Typography variant="h4" gutterBottom>
          User Feedback
        </Typography>
        <Typography variant="body1" gutterBottom>
          We greatly appreciate your feedback! Your insights help us improve our services and better meet your needs.
        </Typography>
        <form onSubmit={handleSubmit} noValidate>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={name}
            onChange={handleNameChange}
            required
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={handleEmailChange}
            required
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            label="Message"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={message}
            onChange={handleMessageChange}
            required
            error={!!errors.message}
            helperText={errors.message}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Submit Feedback
          </Button>
        </form>
      </FormContainer>
      <ContactInfo>
        <Typography variant="h6">Contact Us</Typography>
        <Typography>Email: support@example.com</Typography>
        <Typography>Phone: +123-456-7890</Typography>
        <Typography>Timings: Mon-Fri, 9am-6pm</Typography>
      </ContactInfo>
    </Container>
  );
};

export default Feedback;
