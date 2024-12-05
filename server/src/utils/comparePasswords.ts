import argon2 from "argon2";

async function comparePasswords(
  hash: string,
  password: string
): Promise<boolean> {
  try {
    const isValid = await argon2.verify(hash, password);

    return isValid;
  } catch (error) {
    throw new Error("An error occurred while comparing passwords.");
  }
}

export default comparePasswords;
