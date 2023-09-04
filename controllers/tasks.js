const e = require("express");
const Task = require("../models/Task");
const { options } = require("../routes/tasks");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  //  res.status(200).json({ tasks: task }); //if name of key/property is same as value of property in this case if both are tasks then //no need to pass as key value pair
  res.status(200).json({ tasks });
});

const createTasks = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  //console.log(typeof task);
  res.status(201).json({ task });
});

const updateTasks = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;

  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return next(
      createCustomError(`no task with id: ${req.params.id} found`, 404)
    );
    // const err = new Error("not found");
    // err.status = 404;
    // return next(err);
    // return res
    //   .status(404)
    //   .json({ msg: `no task with id: ${req.params.id} found` });
  }

  res.status(200).json({ task });
});

const deleteTasks = asyncWrapper(async (req, res) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id });
  if (!task) {
    return next(
      createCustomError(`no task with id: ${req.params.id} found`, 404)
    );
    // const err = new Error("not found");
    // err.status = 404;
    // return next(err);
    // return res
    //   .status(404)
    //   .json({ msg: `no task with id: ${req.params.id} found` });
  }
  const display = await Task.find({});
  res.status(200).json({ display });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const task = await Task.findOne({ _id: req.params.id });
  if (!task) {
    return next(
      createCustomError(`no task with id: ${req.params.id} found`, 404)
    );
    // const err = new Error("not found");
    // err.status = 404;
    // return next(err);
    // return res
    //   .status(404)
    //   .json({ msg: `no task with id: ${req.params.id} found` });
  }
  res.status(200).json({ task });
  console.log(task);
  // res.json({ id: req.params.id });
});

module.exports = {
  getAllTasks,
  createTasks,
  getTask,
  updateTasks,
  deleteTasks,
};
