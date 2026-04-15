import Admin from '../models/Admin.js';
import generateToken from '../utils/generateToken.js';

// @desc    Auth user & get token
// @route   POST /api/admin/login
// @access  Public
export const authAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });

    if (admin && (await admin.matchPassword(password))) {
      res.json({
        _id: admin._id,
        username: admin.username,
        token: generateToken(admin._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Register a new admin (First time setup only)
// @route   POST /api/admin/setup
// @access  Public
export const setupAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const totalAdmins = await Admin.countDocuments();

    if (totalAdmins > 0) {
      return res.status(400).json({ message: "Super admin is already configured" });
    }

    const adminExists = await Admin.findOne({ username });

    if (adminExists) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const admin = await Admin.create({
      username,
      password,
    });

    if (admin) {
      res.status(201).json({
        _id: admin._id,
        username: admin.username,
        token: generateToken(admin._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid admin data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
