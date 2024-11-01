import { usersRouter } from "@app/users/users.router";
import { initContract } from "@ts-rest/core"

const contract = initContract();

export const router = contract.router({
  Users: usersRouter
})