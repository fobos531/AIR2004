const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ success: false, message: "Email or password not valid!" });

  // Check if passwords match
  const match = await bcrypt.compareSync(password, user.password);
  if (!match) return res.status(401).json({ success: false, message: "Email or password not valid!" });

  const token = jwt.sign(
    { email: user.email, jmbag: user.jmbag, phoneNumber: user.phoneNumber, name: user.name, surname: user.surname },
    process.env.JWT_SECRET
  );

  res.status(200).json({
    success: true,
    user: {
      token,
      email: user.email,
      jmbag: user.jmbag,
      phoneNumber: user.phoneNumber,
      userType: user.userType,
      name: user.name,
      surname: user.surname,
    },
  });
};

exports.loginTablet = async (req, res) => {
  try {
    // Validate JWT
    const token = req.header("Authorization").replace("Bearer ", "");
    const user = jwt.verify(token, process.env.JWT_SECRET);

    // Validate authentication token from QR code
    const authToken = req.body.token;

    let tabletSocket;
    for (let socket of global.io.of("/").sockets.values()) if (socket.data && socket.data.token == authToken) tabletSocket = socket;
    if (!tabletSocket) throw "Authentication token is invalid";

    // Send response to the tablet where user signed in
    tabletSocket.emit("loginSuccess", { ...user, token });

    // Remove the auth token from the socket
    tabletSocket.data.token = null;

    // Send response to the mobile app
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, error });
  }
};

exports.register = async (req, res) => {
  const { role } = req.params;

  if (!["student", "teacher"].includes(role)) return res.status(400).json({ success: false, error: "Valid roles are student, teacher" });

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await new User({
      ...req.body,
      password: hashedPassword,
      userType: role,
    }).save();
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};

exports.getAllUsers = async (req, res) => {
  const { role } = req.params;

  if (!["student", "teacher", "admin"].includes(role))
    return res.status(400).json({
      success: false,
      error: "Valid roles are student, teacher, admin",
    });

  try {
    const allUsers = await User.find({ userType: role });
    const data = allUsers.map((user) => user.toJSON());
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};

exports.verify = async (req, res) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const user = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(400).json({ success: false, error: "Invalid or missing token!" });
  }
};
