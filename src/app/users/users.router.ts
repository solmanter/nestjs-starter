import { RouterOptions, TsRestResponse } from "@packages/router/helpers";
import { initContract } from "@ts-rest/core";
import { z } from "zod";
import { UserSchema } from "./users.schema";

const contract = initContract();

export const usersRouter = contract.router({
  getUsers: {
    method: 'GET',
    path: '',
    responses: TsRestResponse(z.array(UserSchema)),
    summary: 'Get Users'
  }
}, RouterOptions('users'));