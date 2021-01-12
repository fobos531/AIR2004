const bcrypt = require("bcrypt");
const Attendance = require("../models/attendance");
const Lecture = require("../models/lecture");
exports.add = async (req, res) => {
  try {
    await new Attendance({
      ...req.body,
    }).save();
    const lectureId = req.body.lecture;
    console.log('lecture id:', lectureId);
    //const lecture = await Lecture.findById(lectureId).populate("attendingStudents");
    //console.log('lecture: ', lecture);
    await Lecture.findOneAndUpdate({_id : lectureId}, {
      $push: { attendingStudents: req.body.user }
    }, function(err, affected, resp) {
      console.log(resp);
    });
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};

exports.update = async (req, res) => {
  try {
    const attendance = await Attendance.findById(req.params.id);
    Object.assign(attendance, req.body);
    attendance.save();
    res.status(200).json({ success: true, attendance });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};

exports.delete = async (req, res) => {
  try {
    const attendance = await (await Attendance.findById(req.params.id)).deleteOne();
    const data = attendance.toJSON();
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, error }); 
  }
};

exports.getAll = async (req, res) => {
  try {
    const allAttendances = await Attendance.find();
    const data = allAttendances.map((attendance) => attendance.toJSON());

    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};