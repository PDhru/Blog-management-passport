const Blog = require("../models/blogModel");
const usermodel = require("../models/usermodel");
const userModel = require("../models/usermodel");
const fs = require("fs");
const path = require("path");

const Home = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.render("index", { blogs });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

const signup = async (req, res) => {
  res.render("signup");
};

const signupPage = async (req, res) => {
    try {
        console.log(req.body);
      const { username, password } = req.body;
      const newUser = await usermodel.create({ username, password });
           res.redirect("/login");
    } catch (err) {
      console.log(err);
    }
  };

  

const login = async (req, res) => {
  res.render("login");
};
const addblog = (req, res) => {
  return res.render("addblog");
};
const createblog = async (req, res) => {
  try {
    const { title, description } = req.body; // ADD DATA FROM FORM TITLE AND DESCRIPTION
    const blogImage = req.file ? req.file.path : null; //  WHICH MEANS IF YOU GET ANY FILE THEN TAKE HIS PATH OTHERWISE ITS NULL
    const newBlog = new Blog({ title, description, blogImage }); // PUTTING DATA INTO THE BLOG MODAL
    await newBlog.save(); // ALAWAYS SAVE IT
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
};

const showUpdateBlogForm = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id); // TO FIND THE BLOG FROM THE THEIR ID .. WE WILL GET THE ID FROM THE THE BUTTON WHAT WE PRESS IN INDEX.EJS " /updateblog/<%= blog._id %> "
    if (!blog) {
      return res.status(404).send("Blog not found");
    }
    res.render("updateblog", { blog });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

const updateBlog = async (req, res) => {
  try {
    const { title, description } = req.body;
    const blogImage = req.file ? req.file.path : req.body.oldImage;
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        blogImage,
      },
      { new: true }
    );

    if (!blog) {
      return res.status(404).send("Blog not found");
    }
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBlog = await Blog.findByIdAndDelete(id);
    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.redirect("/");
  } catch (error) {
    console.error("Error deleting blog: ", error.message);
    res.status(500).json({ message: "Server error" });
  }
};



const loginAuth = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      const user = await userModel.findOne({ email });
      if (!user) return res.status(400).send("User Not exist!");
  
      if (password !== user.password) return res.redirect("/login");
  
      res.status(200);
      res.cookie("token", user.id);
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  };

  const edituser = async (req, res) => {
    const user = req.user;
    res.render("edituser", { user });
  };

  const editUserPage = async (req, res) => {
    try {
      const {username,password } = req.body;
      const id = req.user._id;
     
  
      if (req.file) {
        fs.unlinkSync(req.user.image);
        image = req.file.path;
      }
      await userModel.findOneAndUpdate({ _id: id }, {username,password });
  
      res.redirect("/index");
    } catch (err) {
      console.log(err);
    }
  };


  const blogs = async (req, res) => {
    try {
      const user = req.user;
      const myPosts = await postModel.find({ user: user._id });
  
      res.render("index", { user, myPosts });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteuser = async (req, res) => {
    try {
      const id = req.user.id;
  
     
      await postModel.deleteMany({ user: id });
      await userModel.findOneAndDelete({ _id: id });
      res.redirect("/login");
    } catch (error) {
      console.log(error);
    }
  };

module.exports = {
  Home,
  addblog,
  createblog,
  showUpdateBlogForm,
  updateBlog,
  deleteBlog,
  signup,
  signupPage,
  loginAuth,
  editUserPage,
  edituser,
  blogs,
deleteuser,
login,

};
