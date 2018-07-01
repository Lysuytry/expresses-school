'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const customizeQuery = exports.customizeQuery = req => {
  let { limit, skip, status } = req.query;
  req.query.limit = limit < 20 ? +limit : 20;
  req.query.skip = skip ? +skip : 0;
  req.query.status = status ? status : 'active';
};
//# sourceMappingURL=query.js.map