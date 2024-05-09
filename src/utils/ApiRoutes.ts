import { env } from "process";

export const host = env.API_URI
export const loginRoute = `${host}/api/auth/login`
export const getUsersRoute = `${host}/api/auth/allusers`
