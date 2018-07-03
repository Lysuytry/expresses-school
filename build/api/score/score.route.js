'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _score = require('./score.api');

var _score2 = require('./score.middleware');

const scoreRoute = (0, _express.Router)();

scoreRoute.get('/scores', _score.getScoreList);
scoreRoute.post('/scores', _score2.validateCreatingScore, _score.createScore);
scoreRoute.delete('/scores', _score.deletedScore);
scoreRoute.get('/scores/:id', _score.getScoreById);
scoreRoute.put('/scores/:id', _score2.validateUpdatingScore, _score.updateScoreById);
scoreRoute.delete('/scores/:id', _score.deleteScoreById);

exports.default = scoreRoute;
//# sourceMappingURL=score.route.js.map