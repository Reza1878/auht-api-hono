import { createFactory } from "hono/factory";
import container from "../../../../Infrastructures/container";
import { LoginUserUseCase } from "../../../../Applications/use_case/LoginUserUseCase";
import { validator } from "hono/validator";

const factory = createFactory();

export const handlers = factory.createHandlers(
  validator("json", (value, c) => {
    const { password, username } = value;
    if (!password || !username) return c.json({ message: "Invalid body" }, 400);
    return {
      password,
      username,
    };
  }),
  async (c) => {
    const userCase: LoginUserUseCase = container.getInstance(
      LoginUserUseCase.name
    );

    const body = await c.req.json();

    const response = await userCase.execute(body);

    return c.json({ data: response });
  }
);
