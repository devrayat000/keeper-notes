// import { model, Schema } from 'mongoose'

// // const passValidator = require("./validator").passValidator;

// const userSchema = new Schema({
//   email: {
//     type: String,
//     required: true,
//     // unique: true,
//   },
//   name: {
//     type: String,
//     required: true,
//   },
//   todos: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: 'todos',
//     },
//   ],
//   labels: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: 'labels',
//     },
//   ],
//   listMode: {
//     type: Boolean,
//     required: true,
//     default: false,
//   },
//   darkMode: {
//     type: Boolean,
//     required: true,
//     default: false,
//   },
// })
// // userSchema.plugin(passportLocalMongoose, {
// //   usernameField: "email",
// //   usernameQueryFields: ["email"],
// //   limitAttempts: true,
// //   maxAttempts: 10,
// //   passwordValidatorAsync: async (password) => {
// //     try {
// //       await passValidator.validate(password);
// //     } catch (error) {
// //       throw error;
// //     }
// //   },
// // });

// const userModel = model('users', userSchema)

// export default userModel

export {}
