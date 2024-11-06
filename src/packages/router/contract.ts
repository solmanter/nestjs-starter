import { usersRouter } from "@app/users/users.router";
import { initContract } from "@ts-rest/core"

const contract = initContract();

export const RouterContract = contract.router({
  Users: usersRouter
})