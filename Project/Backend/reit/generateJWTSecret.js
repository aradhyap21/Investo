const crypto = require('crypto');

// Generate a random 256-bit (32-byte) key and convert it to a hex string
const jwtSecret = crypto.randomBytes(32).toString('hex');
console.log('Generated JWT_SECRET:', jwtSecret);
