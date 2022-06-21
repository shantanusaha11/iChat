import jwt from "jsonwebtoken";

const auth = async (req, _res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
//     const isCustomAuth = token.length < 500;
//     && isCustomAuth

    let decodedData;

    if (token) {
      decodedData = jwt.verify(token, "iChat@123");

      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub;
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
