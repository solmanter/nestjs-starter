import { RouterOptions, TsRestResponse } from "@libs/router/helpers";
import { initContract } from "@ts-rest/core";
import { z } from "zod";

const contract = initContract();

export const usersRouter = contract.router({
  getUsers: {
    method: 'GET',
    path: '',
    responses: TsRestResponse(z.any()),
  }
}, RouterOptions('users'));