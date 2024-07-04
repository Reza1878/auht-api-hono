export abstract class UserRepository {
  abstract getPasswordByUsername(username: string): Promise<string>;
}
