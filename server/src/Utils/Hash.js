import bcrypt from 'bcrypt';

export const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    return undefined;
  }
};

export const comparePassword = async (text, hashed) => {
  try {
    console.log(text, hashed);
    const valid = await bcrypt.compare(text, hashed);
    return valid;
  } catch (error) {
    console.log(error);
  }
};
