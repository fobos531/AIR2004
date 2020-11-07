const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ email });
  if (!user)
    return res
      .status(401)
      .json({ success: false, message: "Email or password not valid!" });

  // Check if passwords match
  const match = await bcrypt.compareSync(password, user.password);
  if (!match)
    return res
      .status(401)
      .json({ success: false, message: "Email or password not valid!" });

  const token = jwt.sign({}, process.env.JWT_SECRET);

  res.status(200).json({
    success: true,
    user: {
      token,
      email: user.email,
      jmbag: user.jmbag,
      phoneNumber: user.phoneNumber,
      userType: user.userType,
    },
  });
};

exports.register = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await new User({ ...req.body, password: hashedPassword }).save();
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({});
    const data = allUsers.map((user) => user.toJSON());
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};
