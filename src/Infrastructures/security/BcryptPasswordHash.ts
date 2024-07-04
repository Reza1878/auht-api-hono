import { PasswordHash } from "../../Applications/security/PasswordHash";
import { compare, hash } from "bcrypt";
import { AuthenticationError } from "../../Commons/execptions/AuthenticationError";

export class BcryptPasswordHash extends PasswordHash {
  async compare(plain: string, encrypted: string): Promise<void> {
    const result = await compare(plain, encrypted);

    if (!result) {
      throw new AuthenticationError("kredensial yang Anda masukkan salah");
    }
  }

  async hash(password: string): Promise<string> {
    return hash(password, 10);
  }
}
