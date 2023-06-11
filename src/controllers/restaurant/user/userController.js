import UserService from "../../../services/user/userService.js";

const Usercontroller = {
  login: async (req, resp, next) => {
    const data = await UserService.login(req.body);
    return resp.status(200).json({
      user: data,
    });
  },
};

export default Usercontroller;
