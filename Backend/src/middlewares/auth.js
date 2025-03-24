const adminAuth = (req, res, next) => {
  console.log("Admin Auth is there");
  const token = "xyz";
  const isAuthorized = token === "xyz";
  if (!isAuthorized) {
    res.status(401).send({
      error: "Invalid Credentials",
    });
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  console.log("User Auth is there");
  const token = "xyz";
  const isAuthorized = token === "xyz";
  if (!isAuthorized) {
    res.status(401).send({
      error: "Invalid Credentials",
    });
  } else {
    next();
  }
};

module.exports = {
  adminAuth,
  userAuth,
};
