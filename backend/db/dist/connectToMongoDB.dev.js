"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var connectToMongoDB = function connectToMongoDB() {
  var uri;
  return regeneratorRuntime.async(function connectToMongoDB$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          uri = "mongodb+srv://admin:admin@mentormentieechatapp.vyntdxt.mongodb.net/cd";

          if (uri) {
            _context.next = 4;
            break;
          }

          throw new Error("MongoDB URI not found in environment variables");

        case 4:
          _context.next = 6;
          return regeneratorRuntime.awrap(_mongoose["default"].connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
          }));

        case 6:
          console.log("Connected to MongoDB");
          _context.next = 12;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          console.error("Error connecting to MongoDB:", _context.t0.message);

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

var _default = connectToMongoDB;
exports["default"] = _default;