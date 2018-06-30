export const mongoDBOptions = {
  socketTimeoutMS: 0,
  keepAlive: true,
  reconnectTries: 30,
  poolSize: 10, // Maintain up to 10 socket connections
};
export const ENDPOINT = `/api/v1/`;
