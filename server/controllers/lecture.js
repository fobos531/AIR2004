const Lecture = require("../models/lecture");

exports.add = async (req, res) => {
  try {
    await new Lecture({
      ...req.body,
    }).save();
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};

exports.getAll = async (req, res) => {
  try {
    const allLectures = await Lecture.find().populate("course");
    const data = allLectures.map((lecture) => lecture.toJSON());
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};
