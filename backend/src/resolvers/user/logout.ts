import { MyContext } from "../../types";

const handleLogout = (ctx: MyContext) => {
  const { req, res } = ctx;
  return new Promise((resolve) => {
    req.session.destroy((error) => {
      res.clearCookie("userId");
      if (error) {
        console.log(error);
        resolve(false);
        return;
      }
      resolve(true);
    });
  });
};

export default handleLogout;
