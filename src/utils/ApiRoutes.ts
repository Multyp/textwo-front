export const host = process.env.NEXT_PUBLIC_API_URI
export const loginRoute = `${host}/api/auth/login`
export const registerRoute = `${host}/api/auth/register`
export const confirmRoute = `${host}/api/auth/confirm`
export const getUsersRoute = `${host}/api/auth/allusers`
export const sendMessageRoute = `${host}/api/messages/addmsg`;
export const recieveMessageRoute = `${host}/api/messages/getmsg`;
