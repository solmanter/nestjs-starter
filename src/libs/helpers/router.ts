import { initContract, RouterOptions, AppRouter } from "@ts-rest/core";
import { z } from "zod";

const contract = initContract();

export function RouterOptions(pathPrefix: string = ''): RouterOptions {
  return {
    pathPrefix,
    strictStatusCodes: true,
    baseHeaders: z.object({
      Authorization: z.string(),
    }),
    commonResponses: {
      401: contract.type<{ message: 'Unauthorized', reason: string }>(),
      404: contract.type<{ message: 'Not Found'; reason: string }>(),
      500: contract.otherResponse({
        contentType: 'text/plain',
        body: z.literal('Server Error'),
      }),
    },
  }
}


export function TsRestResponse<T>(success: T) {
  return {
    200: success,
    400: z.object({
      message: z.string().default('Bad Request'),
    }),
    401: z.object({
      message: z.string().default('Unauthorized')
    }),
    404: z.object({
      message: z.string().default('Not Found')
    }),
  }
}