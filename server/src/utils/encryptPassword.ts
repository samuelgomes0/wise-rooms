import { sha256 } from "js-sha256";

export function encryptPassword(password: string): string {
  const hash = sha256.create();
  hash.update(password);
  return hash.hex();
}
