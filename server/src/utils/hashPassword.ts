import argon2 from "argon2";

export async function hashPassword(password: string): Promise<string> {
  try {
    const hash = await argon2.hash(password);

    return hash;
  } catch (err) {
    throw new Error("Erro ao gerar hash da senha.");
  }
}
