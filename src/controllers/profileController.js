const User = require('../models/user');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'username', 'email', 'age', 'chronicConditions', 'medications']
    });
    res.json(user);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Error fetching profile' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { age, chronicConditions, medications } = req.body;
    await User.update(
      { age, chronicConditions, medications },
      { where: { id: req.user.id } }
    );
    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Error updating profile' });
  }
};