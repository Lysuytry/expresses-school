'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

const scoreRoute = (0, _express.Router)();

scoreRoute.get('/scores');
scoreRoute.post('/scores');
scoreRoute.get('/scores/:id');
scoreRoute.put('/scores/:id');
scoreRoute.delete('/scores/:id');

exports.default = scoreRoute;
//# sourceMappingURL=score.route.js.map