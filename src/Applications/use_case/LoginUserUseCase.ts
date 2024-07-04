import { UserRepository } from "../../Domains/users/UserRepository";
import {
  IUserLoginPayload,
  UserLogin,
} from "../../Domains/users/entities/UserLogin";
import { PasswordHash } from "../security/PasswordHash";

interface ILoginUserUseCasePayload {
  userRepository: UserRepository;
  passwordHash: PasswordHash;
}

export class LoginUserUseCase {
  userRepository: UserRepository;
  passwordHash: PasswordHash;

  constructor(payload: ILoginUserUseCasePayload) {
    this.userRepository = payload.userRepository;
    this.passwordHash = payload.passwordHash;
  }

  async execute(payload: IUserLoginPayload) {
    const { password, username } = new UserLogin(payload);

    const encryptedPassword = await this.userRepository.getPasswordByUsername(
      username
    );

    await this.passwordHash.compare(password, encryptedPassword);

    return "Login success";
  }
}
