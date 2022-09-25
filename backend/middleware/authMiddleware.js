const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const db = require("../config/db");
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //se obtiene el token del header
      token = req.headers.authorization.split(" ")[1];

      //verifica el token si es valido
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      next();
    } catch (error) {
      // console.log(error);
      res.status(401).json({
        sucess: false,
        msg: `Error, No autorizado - Token Invalido`,
      });
    }
  }
  if (!token) {
    res.status(401).json({
      sucess: false,
      msg: `Error, No autorizado, token ausente`,
    });
  }
});

module.exports = { protect };
