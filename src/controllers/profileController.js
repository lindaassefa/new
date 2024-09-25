const User = require('../models/user');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'username', 'email', 'age', 'name', 'location', 'chronicConditions', 'medications', 'profilePicture']
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Error fetching profile' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { age, name, location, chronicConditions, medications } = req.body;
    
    const updateData = {
      age: age || null,
      name: name || null,
      location: location || null,
      chronicConditions: chronicConditions || [],
      medications: medications || null
    };

    if (req.file) {
      updateData.profilePicture = `/uploads/${req.file.filename}`;
    }

    await User.update(updateData, {
      where: { id: req.user.id }
    });

    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Error updating profile' });
  }
};