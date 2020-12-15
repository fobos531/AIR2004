const bcrypt = require("bcrypt");
const Course = require("../models/course");

exports.add = async (req, res) => {
  try {
    await new Course({
      ...req.body,
    }).save();
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};

exports.getAll = async (req, res) => {
  try {
    const allCourses = await Course.find();
    const data = allCourses.map((course) => course.toJSON());
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};

exports.delete = async (req, res) => {
  try {
    const course = await (await Course.findById(req.params.id)).deleteOne();
    const data = course.toJSON();
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, error }); 
  }
};