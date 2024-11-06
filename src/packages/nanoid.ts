import crypto from 'crypto';

const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz';

export function nanoid(size = 20) {
  let nanoId = '';
  const bytes = crypto.randomBytes(size);

  for (let i = 0; i < size; i++) {
    nanoId += alphabet[bytes[i] % alphabet.length];
  }

  return nanoId;
}