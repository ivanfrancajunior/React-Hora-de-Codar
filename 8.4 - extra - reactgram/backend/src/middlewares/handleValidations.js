const { validationResult } = require("express-validator");

const validate = (req, res, next) => {
  const errors = validationResult(req);

  console.log(errors);

  if (!errors.isEmpty()) {
    const extractedErros = [];

    errors.array().map((err) => extractedErros.push(err.msg));

    return res.status(400).json({ errors: extractedErros });
  }

  return next();
};

module.exports = validate;
