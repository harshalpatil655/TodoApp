const { Router } = require("express");
const { TodoModel } = require("../Models/Todo.Model");

const TodoRoute = Router();

TodoRoute.get("/", async (req, res) => {
  const { userId } = req.body;
  const Todos = await TodoModel.find({ userId });

  if (Todos) {
    res.send(Todos);
  } else {
    res.send("Error In getting Data");
  }
});

TodoRoute.post("/create", async (req, res) => {
  const { heading, task, userId } = req.body;

  try {
    if (heading && task && userId) {
      const newTodo = new TodoModel({
        heading,
        task,
        userId,
      });
      await newTodo.save();
      res.send("SuccessFully Created");
    } else {
      res.send({ Message: "Error in Creation" });
    }
  } catch (err) {
    res.send({ Message: `Error:${err}` });
  }
});

TodoRoute.delete("/delete/:todoId", async (req, res) => {
  const { todoId } = req.params;

  const deleteTodo = await TodoModel.findOneAndDelete({
    _id: todoId,
    userId: req.body.userId,
  });

  if (deleteTodo) {
    res.send({ Message: "Successfully Deleted", deleteTodo });
  } else {
    res.send({ Message: "Error in Deletion" });
  }
});

TodoRoute.patch("/edit/:todoId", async (req, res) => {
  const { todoId } = req.params;

  try {
    const updateTodo = await TodoModel.findOneAndUpdate(
      { _id: todoId, userId: req.body.userId },
      { ...req.body }
    );
    if (updateTodo) {
      res.send({
        Message: "Successfully Updated",
        updateTodo,
      });
    } else {
      res.status(500).send({ Message: "Error in Edit" });
    }
  } catch (err) {
    res.status.send({ Message: "Error in Edit trycatch" });
  }
});

module.exports = { TodoRoute };
