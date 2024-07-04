import { createContainer } from "instances-container";

import { pool } from "./database/postgres/pool";
import { PasswordHash } from "../Applications/security/PasswordHash";
import { BcryptPasswordHash } from "./security/BcryptPasswordHash";

// Repository
import { UserRepository } from "../Domains/users/UserRepository";
import { UserRepositoryPostgres } from "./repository/UserRepositoryPostgres";

// Use Case
import { LoginUserUseCase } from "../Applications/use_case/LoginUserUseCase";

const container = createContainer();

container.register([
  {
    key: UserRepository.name,
    Class: UserRepositoryPostgres,
    parameter: {
      injectType: "destructuring",
      dependencies: [{ name: "pool", concrete: pool }],
    },
  },
]);

container.register([{ key: PasswordHash.name, Class: BcryptPasswordHash }]);

container.register([
  {
    key: LoginUserUseCase.name,
    Class: LoginUserUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        { name: "userRepository", internal: UserRepository.name },
        { name: "passwordHash", internal: PasswordHash.name },
      ],
    },
  },
]);

export default container;
