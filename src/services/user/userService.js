import User from "../../models/user/user.js";
import * as bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

const UserService = {
  login: async (userData) => {
    try {
      // check if the user exists on the database.
      let user = await User.findOne({ username: userData.username });
      // if he doesn't exist, we deny them permission to login.
      if (!user) {
        return {
          message: "Username not found!",
        };
      }
      // else we check if they've provided the correct credentials.
      const isPasswordCorrect = await bcrypt.compare(
        userData.password,
        user.password
      );
      // if the passwords don't match, we reject the user
      if (!isPasswordCorrect) {
        return {
          message: "Password is wrong.",
        };
      }
      // else we generate a token for the user.
      const { username } = user;
      const token = JWT.sign({ username }, process.env.JWT_SECRET, {
        expiresIn: "10h",
      });
      user = user.toJSON();
      // remove the password from the returned properties of the user.
      const { password, ...rest } = user;
      return { ...rest, token: token, message: "Successfully loggedin" };
    } catch (error) {
      return {
        message: "An error has occured",
      };
    }
  },
};

export default UserService;
