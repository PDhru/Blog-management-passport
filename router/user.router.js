const { Router } = require("express");
const {
  addblog,
  Home,
  createblog,
  showUpdateBlogForm,
  updateBlog,
  deleteBlog,
  signup,
  editUserPage,
  edituser,
  blogs,
  deleteuser,
  login,
  signupPage,
  loginPage,
} = require("../controllers/user.controller");
const upload = require("../middleware/multer");
const { userInput } = require("../middleware/inputuser");
const { Passport } = require("passport");
const passport = require("passport");
const router = Router();
const {isAuth} = require("../middleware/isauth");



router.get("/", isAuth,Home);
router.get("/addblog",addblog);
router.post("/addblog", upload.single("blogImage"), createblog);



// Routes for updating blog
router.get("/updateblog/:id", showUpdateBlogForm);
router.post("/updateblog/:id", upload.single("blogImage"), updateBlog);
router.post("/deleteblog/:id", deleteBlog);

//login/signup page
router.get("/login",login)
router.get("/signup", signup);
router.post("/adduser",signupPage);

router.post("/edituser",isAuth,editUserPage)
router.get("/edituser",edituser)
router.get("/blogs",isAuth,blogs)
router.get("/deleteuser",isAuth,deleteuser)

router.post("/login", passport.authenticate("local",
  {successRedirect: "/",
  failureRedirect: "back"}
));



router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      res.clearCookie("connect.sid");
      res.redirect("/login");
    });
  });
});

module.exports = router;
