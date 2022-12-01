require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");
const cors = require("cors");

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cors({ credentials: true, origin: true }));

/********* Authentication *********/
const User = require("./model/user");

app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!(username && password)) {
      res.status(400).send("All input is required");
    }

    const oldUser = await User.findOne({ username });
    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username: username,
      password: encryptedPassword,
    });

    const token = jwt.sign(
      { user_id: user._id, username },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );

    user.token = token;

    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!(username && password)) {
      return res.status(400).send("All input is required");
    }

    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, username },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      user.token = token;

      return res.status(200).json(user);
    } else return res.status(400).send("Invalid Credentials");
  } catch (error) {
    console.log(error);
  }
});

app.post("/validateToken", auth, (req, res) => {
  res.status(200).send("Valid Token");
});
/**********************************/

/************* To-do *************/
const Todo = require("./model/todo");

app.post("/todo", auth, async (req, res) => {
  try {
    const { user_id, title, description, thumbnail, fileLabel, file } =
      req.body;

    if (!(user_id && title && description)) {
      return res.status(400).send("All input is required");
    }

    const todo = await Todo.create({
      user_id: user_id,
      title: title,
      description: description,
      thumbnail: thumbnail,
      fileLabel: fileLabel,
      file: file,
    });

    return res.status(201).json(todo);
  } catch (error) {
    console.log(error);
  }
});

app.post("/todo/:user_id", auth, async (req, res) => {
  try {
    const { user_id } = req.params;
    const { tag } = req.body;

    if (!(user_id && tag)) {
      return res.status(400).send("All input is required");
    }

    var todo;
    if (tag == "all") todo = await Todo.find({ user_id: user_id });
    else todo = await Todo.find({ user_id: user_id, tag: tag });

    return res.status(200).json(todo);
  } catch (error) {
    console.log(error);
  }
});

app.put("/todo", auth, async (req, res) => {
  try {
    const { _id, title, description, tag, thumbnail, fileLabel, file } =
      req.body;

    if (!(_id && title && description && tag)) {
      return res.status(400).send("All input is required");
    }

    const todo = await Todo.findByIdAndUpdate(
      _id,
      {
        title: title,
        description: description,
        tag: tag,
        thumbnail: thumbnail,
        fileLabel: fileLabel,
        file: file,
        updated_at: Date.now(),
      },
      { new: true }
    );

    return res.status(200).json(todo);
  } catch (error) {
    console.log(error);
  }
});

app.delete("/todo", auth, async (req, res) => {
  try {
    const { _id } = req.body;

    if (!_id) {
      return res.status(400).send("All input is required");
    }

    const todo = await Todo.findByIdAndDelete(_id);

    return res.status(200).json(todo);
  } catch (error) {
    console.log(error);
  }
});

app.post("/todo/search/:user_id", auth, async (req, res) => {
  try {
    const { user_id } = req.params;
    const { searchString, tag } = req.body;

    if (!(user_id && searchString && tag)) {
      return res.status(400).send("All input is required");
    }

    var todo;
    if (tag == "all")
      todo = await Todo.find({
        user_id: user_id,
        $text: { $search: searchString },
      });
    else
      todo = await Todo.find({
        user_id: user_id,
        $text: { $search: searchString },
        tag: tag,
      });

    return res.status(200).json(todo);
  } catch (error) {
    console.log(error);
  }
});
/**********************************/

app.use("*", (req, res) => {
  cors();
  res.status(404).json({
    success: "false",
    message: "Page not found",
    error: {
      statusCode: 404,
      message: "You reached a route that is not defined on this server",
    },
  });
});

module.exports = app;
