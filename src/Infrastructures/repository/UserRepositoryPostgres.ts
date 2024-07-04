import { Pool } from "pg";
import { UserRepository } from "../../Domains/users/UserRepository";
import { InvariantError } from "../../Commons/execptions/InvariantError";

interface IUserRepositoryPostgresPayload {
  pool: Pool;
}

export class UserRepositoryPostgres extends UserRepository {
  pool: Pool;

  constructor(params: IUserRepositoryPostgresPayload) {
    super();
    this.pool = params.pool;
  }

  async getPasswordByUsername(username: string): Promise<string> {
    const query = {
      text: "SELECT password FROM users WHERE username = $1",
      values: [username],
    };

    const result = await this.pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError("username tidak ditemukan");
    }

    return result.rows[0].password as string;
  }
}
