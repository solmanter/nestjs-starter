import { RouterOptions } from "@ts-rest/core";
import { z } from "zod";

const responses = {
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


export function RouterOptions(pathPrefix: string = ''): RouterOptions {
  return {
    pathPrefix,
    strictStatusCodes: true,
    baseHeaders: z.object({
      Authorization: z.string(),
    }),
    commonResponses: responses
  }
}


export function TsRestResponse<T>(success: T) {
  return {
    200: success,
    ...responses
  }
}