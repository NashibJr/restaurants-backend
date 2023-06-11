import JWT from "jsonwebtoken";

const authorization = (req, resp, next) => {
  try {
    const authorization = req.headers.authorization;
    const token = authorization.split(" ")[1];
    const payload = JWT.verify(token, process.env.JWT_SECRET);
    if (!payload) {
      return resp.status(500).json({
        message: "You are not authorized",
      });
    }
    return next();
  } catch (error) {
    return resp.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export default authorization;
