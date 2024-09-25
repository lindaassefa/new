import React, { useEffect, useState } from 'react';
import { Container, Typography, TextField, Button, Box, Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import { fetchProfile, updateProfile } from './apiService'; // Adjust the path as necessary

const conditions = ['Asthma', 'Digestive Issues', 'Mild Anxiety'];

const Profile = () => {
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    age: '',
    name: '',
    location: '',
    chronicConditions: [],
    medications: '',
    profilePicture: null
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profileData = await fetchProfile();
        setProfile(profileData.data);
      } catch (error) {
        setError('Failed to fetch profile');
        console.error('Profile fetch error:', error);
      }
    };

    loadProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleConditionChange = (condition) => {
    setProfile(prevProfile => ({
      ...prevProfile,
      chronicConditions: prevProfile.chronicConditions.includes(condition)
        ? prevProfile.chronicConditions.filter(c => c !== condition)
        : [...prevProfile.chronicConditions, condition]
    }));
  };

  const handleFileChange = (event) => {
    setProfile(prevProfile => ({
      ...prevProfile,
      profilePicture: event.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (const key in profile) {
        if (key === 'chronicConditions') {
          formData.append(key, JSON.stringify(profile[key]));
        } else if (key === 'profilePicture' && profile[key]) {
          formData.append(key, profile[key]);
        } else {
          formData.append(key, profile[key]);
        }
      }
      await updateProfile(formData);
      alert('Profile updated successfully');
    } catch (error) {
      setError('Error updating profile');
      console.error('Profile update error', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Your Profile
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          fullWidth
          id="username"
          label="Username"
          name="username"
          value={profile.username}
          disabled
        />
        <TextField
          margin="normal"
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          value={profile.email}
          disabled
        />
        <TextField
          margin="normal"
          fullWidth
          id="age"
          label="Age"
          name="age"
          type="number"
          value={profile.age}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          fullWidth
          id="name"
          label="Full Name"
          name="name"
          value={profile.name}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          fullWidth
          id="location"
          label="Location"
          name="location"
          value={profile.location}
          onChange={handleChange}
        />
        <Typography variant="h6" component="h2" gutterBottom>
          Chronic Conditions
        </Typography>
        <FormGroup>
          {conditions.map((condition) => (
            <FormControlLabel
              key={condition}
              control={
                <Checkbox
                  checked={profile.chronicConditions.includes(condition)}
                  onChange={() => handleConditionChange(condition)}
                  name={condition}
                />
              }
              label={condition}
            />
          ))}
        </FormGroup>
        <TextField
          margin="normal"
          fullWidth
          id="medications"
          label="Medications"
          name="medications"
          value={profile.medications}
          onChange={handleChange}
          multiline
          rows={4}
        />
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="raised-button-file"
          type="file"
          onChange={handleFileChange}
        />
        <label htmlFor="raised-button-file">
          <Button variant="contained" component="span">
            Upload Profile Picture
          </Button>
        </label>
        {profile.profilePicture && <Typography>{profile.profilePicture.name}</Typography>}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Update Profile
        </Button>
      </Box>
    </Container>
  );
};

export default Profile;
