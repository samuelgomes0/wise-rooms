import argon2 from "argon2";

export async function verifyPassword(
  hash: string,
  password: string
): Promise<boolean> {
  try {
    const isValid = await argon2.verify(hash, password);

    return isValid;
  } catch (err) {
    throw new Error("Erro ao verificar a senha");
  }
}
