const express = require("express");
const app = express();
const path = require("path");
const multer = require("multer");
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

const jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");

const JWT_SECRET =
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";

const mongoUrl = "mongodb://127.0.0.1:27017/users";

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));

require("./userDetails");
const imageModel = require("./imageDetails");

const User = mongoose.model("UserInfo");
const Images = mongoose.model("ImageDetails");

app.post("/register", async (req, res) => {
  const { fname, lname, email, password, userType } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.json({ error: "User Exists" });
    }
    await User.create({
      fname,
      lname,
      email,
      password: encryptedPassword,
      // password,
      userType,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});

app.post("/login-user", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ error: "User Not found" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, JWT_SECRET, {
      expiresIn: "15m",
    });

    if (res.status(201)) {
      return res.json({ status: "ok", data: token });
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ status: "error", error: "InvAlid Password" });
});

app.post("/userData", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET, (err, res) => {
      if (err) {
        return "token expired";
      }
      return res;
    });
    console.log(user);
    if (user == "token expired") {
      return res.send({ status: "error", data: "token expired" });
    }

    const useremail = user.email;
    User.findOne({ email: useremail })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
});

app.listen(5000, () => {
  console.log("Server Started");
});

app.get("/getAllUser", async (req, res) => {
  try {
    const allUser = await User.find({});
    res.send({ status: "ok", data: allUser });
  } catch (error) {
    console.log(error);
  }
});

app.post("/deleteUser", async (req, res) => {
  const { userid } = req.body;
  console.log(req.body);
  console.log(userid);
  try {
    const que = User.findByIdAndDelete(userid);
    que.exec();
    res.send({ status: "Ok", data: "Deleted" });
  } catch (error) {
    console.log(error);
  }
});

app.get("/updateUser/:id", async (req, res) => {
  let result = await User.findOne({ _id: req.params.id });
  if (result) {
    res.send(result);
  } else {
    res.send({ result: "no record" });
  }
});

app.put("/updateUser/:id", async (req, res) => {
  let id = req.params.id;
  let result = await User.updateOne(
    { _id: id },
    {
      $set: req.body,
    }
  );
  res.send(result);
});

//upload image

// const storage = multer.diskStorage({
//   destination: "./uploads",
//   filename: function (req, file, cb) {
//     cb(null, "FILE-" + Date.now() + path.extname(file.originalname));
//   },
// });

// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 100000000000000000 },
// }).array("myfile", 12);

// const obj = (req, res, next) => {
//   try {
//     upload(req, res, () => {
//       next();
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// app.post("/upload-image", obj, async (req, res) => {
//   try {
//     const file = new imageModel();
//     file.path = req.file.path;
//     await file.save();
//     res.status(200).send({ msg: "zinda h" });
//   } catch (error) {
//     console.log(error);
//   }
// });

// app.get("/get-image", async (req, res) => {
//   try {
//     await Images.find({}).then((data) => {
//       res.send({ status: "ok", data: data });
//     });
//   } catch (error) {}
// });

// firstMethod
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads");
//   },
//   filename: function (req, file, cb) {
//     cb(null, "FILE-" + Date.now() + path.extname(file.originalname));
//   },
// });

// const upload = multer({ storage: storage });

// app.post("/upload-image", upload.array("files"), function (req, res) {
//   console.log(req.files);
//   // array of uploaded files
//   res.send("Files uploaded successfully");
// });

// anotherMethod

const upload = multer({ dest: "./uploads" });

const fileSchema = new mongoose.Schema(
  {
    path: {},
  },
  {
    collection: "imgDtls",
  }
);

const File = mongoose.model("File", fileSchema);

app.post("/upload-image", upload.array("files"), function (req, res) {
  const files = req.files;

  const fileObjects = files.map((file) => {
    const newFile = new File({
      path: file.path,
    });

    newFile.save();

    return newFile.toObject();
  });

  res.json(fileObjects);
});
