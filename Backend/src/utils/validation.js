const ValidationSignUp = (req) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is Required!");
  }
};

module.exports = ValidationSignUp;
