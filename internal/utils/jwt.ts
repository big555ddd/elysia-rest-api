import jwt from 'jsonwebtoken';
import { loadConfig } from '../../src/config/config';

// ปรับฟังก์ชันให้คืนค่า jwtSecret และ jwtDuration
export const getJwt = () => {
  const { jwtSecret, jwtDuration } = loadConfig();
  return { jwtSecret, jwtDuration };
};

export const createToken = (payload: object) => {
  const { jwtSecret, jwtDuration } = getJwt(); // โหลด jwtSecret และ jwtDuration
  return jwt.sign(payload, jwtSecret, { expiresIn: jwtDuration });
};

export const verifyToken = (token: string) => {
  const { jwtSecret } = getJwt(); // โหลด jwtSecret
  try {
    return jwt.verify(token, jwtSecret);
  } catch (err) {
    return null;
  }
};
