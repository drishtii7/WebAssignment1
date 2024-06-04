import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

//styling the Profile Container
const ProfileContainer = styled.div`
  flex: 1;
  padding: 20px;
  
  @media (max-width: 600px) {
    padding: 10px;
  }
`;

const Heading = styled.h1`
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 48%;
`;

const Label = styled.label`
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;

const SuccessMessage = styled.span`
  color: green;
  font-size: 14px;
  margin-top: 10px;
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${props => (props.primary ? '#3498db' : '#e74c3c')};
  color: white;
`;

//using static values to display in form data
const UserProfile = () => {
  const [formData, setFormData] = useState({
    firstName: 'Olivia',
    lastName: 'Parker',
    email: 'olivia.parker@gmail.com',
    phone: '902-882-7709',
    designation: 'Licensed Clinical Psychologist',
    bio: 'Hello, I am a compassionate therapist who believes in empowering clients to overcome challenges and improve their mental well-being.',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const storedData = localStorage.getItem('userProfileData');
    if (storedData) {
      setFormData(JSON.parse(storedData));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setSuccessMessage(''); 
  };

  const validate = () => {
    const newErrors = {};
    //handling validations for input fields
    if (!formData.firstName) newErrors.firstName = 'First Name is required';
    if (!formData.lastName) newErrors.lastName = 'Last Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    else if (!/^\d{3}-\d{3}-\d{4}$/.test(formData.phone)) newErrors.phone = 'Phone number should be in format xxx-xxx-xxxx';
    if (!formData.designation) newErrors.designation = 'Designation is required';
    if (!formData.bio) newErrors.bio = 'Bio is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      localStorage.setItem('userProfileData', JSON.stringify(formData));
      setSuccessMessage('Your changes have been saved successfully!');
    }
  };

  const handleCancel = () => {
    localStorage.removeItem('userProfileData');
    setFormData({
      firstName: 'Olivia',
      lastName: 'Parker',
      email: 'olivia.parker@example.com',
      phone: '902-882-7709',
      designation: 'Licensed Clinical Psychologist',
      bio: 'Hello, I am a compassionate therapist who believes in empowering clients to overcome challenges and improve their mental well-being.',
    });
    setErrors({});
    setSuccessMessage('');  
  };

  return (
    <ProfileContainer>
      <Heading>Account Settings</Heading>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Column>
            <Label>First Name</Label>
            <Input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
            {errors.firstName && <ErrorMessage>{errors.firstName}</ErrorMessage>}
          </Column>
          <Column>
            <Label>Last Name</Label>
            <Input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
            {errors.lastName && <ErrorMessage>{errors.lastName}</ErrorMessage>}
          </Column>
        </Row>
        <Row>
          <Column>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          </Column>
          <Column>
            <Label>Phone</Label>
            <Input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
          </Column>
        </Row>
        <Row>
          <Column>
            <Label>Designation</Label>
            <Input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
            />
            {errors.designation && <ErrorMessage>{errors.designation}</ErrorMessage>}
          </Column>
        </Row>
        <Column>
          <Label>Bio</Label>
          <TextArea
            name="bio"
            rows="4"
            value={formData.bio}
            onChange={handleChange}
          />
          {errors.bio && <ErrorMessage>{errors.bio}</ErrorMessage>}
        </Column>
        <ButtonContainer>
          <Button primary type="submit">Update</Button>
          <Button type="button" onClick={handleCancel}>Cancel</Button>
        </ButtonContainer>
      </Form>
      {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
    </ProfileContainer>
  );
};

export default UserProfile;
