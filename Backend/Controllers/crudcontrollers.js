const UserModel = require("../models/Users");

const getData = (req, res) => {
  UserModel.find({})
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
};

const createUser = async (req, res) => {
  try {
    const { email } = req.body;
    const checkuser = await UserModel.findOne({ email });
    if (checkuser) {
      // console.log("Email Already Registerd");
      return res.status(500).send({
        message: "Email Already Registerd",
      });
    } else {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (emailRegex.test(email)) {
        UserModel.create(req.body)
          .then((users) => res.status(200).json({
            message:"User Create Successfully"
          }))
          .catch((err) => res.json(err));
      } else {
        console.log("Write Proper Email");
      }
    }
  } catch (error) {
    console.log("Error In Register API", error);
    res.status(500).send({
      success: false,
      message: "Error In Register API",
      error,
    });
  }
};

const updateUser = (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndUpdate(
    { _id: id },
    {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
    }
  )
  .then((users) => res.status(200).json({
    message:"User Upadate Successfully"
  }))
    .catch((err) => res.json(err));
};

const Getdataforupdate = (req, res) => {
  const id = req.params.id;
  UserModel.findById({ _id: id })
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
};

const Delete = (req, res) => {
  try {
    const id = req.params.id;
    UserModel.findByIdAndDelete({ _id: id })
    .then((users) => res.status(200).json({
      message:"User Delete Successfully"
    }))
      .catch((err) => res.json(err));
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getData,
  createUser,
  updateUser,
  Getdataforupdate,
  Delete,
};
