
const Task = require('../models/task');

const insert = async(req, res) => {
    const {title, description} = req.body;
    const task = new Task({title, description});
    await task.save();
    res.json({status: 'Task Saved'});
}


module.exports={
    insert
}