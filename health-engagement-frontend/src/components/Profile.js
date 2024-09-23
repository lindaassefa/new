import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import axios from 'axios';

function Profile() {
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    age: '',
    chronicConditions: '',
    medications: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfile(response.data);
    } catch (error) {
      setError('Error fetching profile');
      console.error('Profile fetch error', error);
    }
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put('/api/profile', profile, {
        headers: { Authorization: `Bearer ${token}` }
      });
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
          id="chronicConditions"
          label="Chronic Conditions"
          name="chronicConditions"
          value={profile.chronicConditions}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          fullWidth
          id="medications"
          label="Medications"
          name="medications"
          value={profile.medications}
          onChange={handleChange}
        />
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
}

export default Profile;