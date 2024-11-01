import { TsRestResponse } from '@libs/router/helpers';
import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const contract = initContract();

const TokensSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
});

export const authRouter = contract.router(
  {
    login: {
      method: 'POST',
      path: '/login',
      body: z.object({
        username: z.string().min(1).max(32),
        password: z.string().min(4),
      }),
      responses: TsRestResponse(TokensSchema),
    },
    refresh: {
      method: 'POST',
      path: '/refresh',
      body: z.object({
        refresh_token: z.string(),
      }),
      responses: TsRestResponse(TokensSchema.pick({ access_token: true })),
    },
  },
  {
    pathPrefix: 'auth',
  },
);
