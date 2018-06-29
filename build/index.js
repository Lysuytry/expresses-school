"use strict";

var _app = require("./app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const port = 3000;

_app2.default.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(`Something broke!`);
});

_app2.default.listen(port, () => {
    console.log(`Listen from port : ${port}`);
});
//# sourceMappingURL=index.js.map