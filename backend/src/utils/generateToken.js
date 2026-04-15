import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback-secret-key-123', {
    expiresIn: '30d',
  });
};

export default generateToken;
