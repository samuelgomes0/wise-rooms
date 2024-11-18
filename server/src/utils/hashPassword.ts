import argon2 from "argon2";

export async function hashPassword(password: string): Promise<string> {
  try {
    const hash = await argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 2 ** 16,
      timeCost: 4,
      parallelism: 1,
    });

    return hash;
  } catch (err) {
    throw new Error("Erro ao gerar hash da senha.");
  }
}
