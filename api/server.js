const express = require("express");
const server = express();

server.use(express.json());

const Users = require("../users/users-model");

server.post("/users", (req, res) => {
    const user = {
        username: req.body.username, 
        password:req.body.password, 
        department:req.body.department
    }  
    Users.add(user)
      .then(saved => {
        res.status(201).json(saved);
      })
      .catch(error => { 
        res
          .status(500)
          .json({ message: `There was an error with this op ${error}` });
      });
});

server.delete("/users/:id", (req, res) => {
    const id = req.params.id
    Users.remove(id)
      .then(() => {
        res.status(200).json({ message: "The user has been deleted" });
      })
      .catch((error) => {
        res.status(500).json({
          message: `Error removing the user: ${error.message}`
        });
      });
  })

module.exports = server;
