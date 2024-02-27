"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _userModel = _interopRequireDefault(require("../models/user.model.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var JWT_SECRET = "SoME9Bv1SxX/jZT4";

var protectRoute = function protectRoute(req, res, next) {
  var token, decoded, user;
  return regeneratorRuntime.async(function protectRoute$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          token = req.cookies.jwt;

          if (token) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", res.status(401).json({
            error: "Unauthorized - No Token Provided"
          }));

        case 4:
          decoded = _jsonwebtoken["default"].verify(token, JWT_SECRET);

          if (decoded) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", res.status(401).json({
            error: "Unauthorized - Invalid Token"
          }));

        case 7:
          _context.next = 9;
          return regeneratorRuntime.awrap(_userModel["default"].findById(decoded.userId).select("-password"));

        case 9:
          user = _context.sent;

          if (user) {
            _context.next = 12;
            break;
          }

          return _context.abrupt("return", res.status(404).json({
            error: "User not found"
          }));

        case 12:
          req.user = user;
          next();
          _context.next = 20;
          break;

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](0);
          console.log("Error in protectRoute middleware: ", _context.t0.message);
          res.status(500).json({
            error: "Internal server error"
          });

        case 20:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 16]]);
};

var _default = protectRoute;
exports["default"] = _default;