export interface IUserLoginPayload {
  password: string;
  username: string;
}

export class UserLogin {
  username: string;

  password: string;

  constructor(params: IUserLoginPayload) {
    this._verifyPayload(params);
    this.username = params.username;
    this.password = params.password;
  }

  _verifyPayload(payload: IUserLoginPayload) {
    const { username, password } = payload;

    if (!username || !password) {
      throw new Error("USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (typeof username !== "string" || typeof password !== "string") {
      throw new Error("USER_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }
  }
}
