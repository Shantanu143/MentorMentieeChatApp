"use strict";

var _path = _interopRequireDefault(require("path"));

var _express = _interopRequireDefault(require("express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _authRoutes = _interopRequireDefault(require("./routes/auth.routes.js"));

var _messageRoutes = _interopRequireDefault(require("./routes/message.routes.js"));

var _userRoutes = _interopRequireDefault(require("./routes/user.routes.js"));

var _connectToMongoDB = _interopRequireDefault(require("./db/connectToMongoDB.js"));

var _socket = require("./socket/socket.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PORT = process.env.PORT || 5000;

var _dirname = _path["default"].resolve();

_dotenv["default"].config();

_socket.app.use(_express["default"].json()); // to parse the incoming requests with JSON payloads (from req.body)


_socket.app.use((0, _cookieParser["default"])());

_socket.app.use("/api/auth", _authRoutes["default"]);

_socket.app.use("/api/messages", _messageRoutes["default"]);

_socket.app.use("/api/users", _userRoutes["default"]);

_socket.app.use(_express["default"]["static"](_path["default"].join(_dirname, "/frontend/dist")));

_socket.app.get("*", function (req, res) {
  res.sendFile(_path["default"].join(_dirname, "frontend", "dist", "index.html"));
});

_socket.server.listen(PORT, function () {
  (0, _connectToMongoDB["default"])();
  console.log("Server Running on port ".concat(PORT));
});