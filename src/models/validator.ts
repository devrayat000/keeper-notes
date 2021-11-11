// const yup = require("yup");

// const passValidator = yup
//   .string()
//   .required("Password is required!")
//   .min(8, ({ min }) => `Password must be atleast ${min} characters long!`)
//   .max(32, ({ max }) => `Password cannot exceed ${max} characters!`);

// const emailValidator = yup.string().required().email().min(6).max(40);

// const nameValidator = yup.string().required().min(6).max(40);

// exports.emailValidator = emailValidator;
// exports.passValidator = passValidator;
// exports.nameValidator = nameValidator;

// exports.registrationBodyValidator = yup.object().shape({
//   email: emailValidator,
//   password: passValidator,
//   name: nameValidator,
// });

export {}
