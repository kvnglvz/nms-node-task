import crypto from 'crypto';

export default function comparePassword(
  currentPassword: string,
  currentSalt: crypto.BinaryLike,
  password: crypto.BinaryLike
): boolean {
  const encPassword = crypto.pbkdf2Sync(
    password,
    currentSalt,
    10000,
    512,
    'sha512',
  ).toString('hex');
  return encPassword === currentPassword;
}