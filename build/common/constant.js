"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const mongoDBOptions = exports.mongoDBOptions = {
  socketTimeoutMS: 0,
  keepAlive: true,
  reconnectTries: 30,
  poolSize: 10 // Maintain up to 10 socket connections
};
const ENDPOINT = exports.ENDPOINT = `/api/v1/`;
//# sourceMappingURL=constant.js.map