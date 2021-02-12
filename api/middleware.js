const actModel = require("./actions/actions-model");
const projModel = require("./projects/projects-model");

const logger = (req, res, next) => {
  console.log(
    ` On [${new Date().toISOString()}] a new ${
      req.method
    } request was made to ${req.url}`
  );
  next();
};

const validateActionId = (req, res, next) => {
  const { id } = req.params;
  actModel
    .get(id)
    .then((action) => {
      if (!action) {
        res
          .status(400)
          .json({ message: `No action with the id: ${id} was found.` });
      } else {
        req.action = action;
        next();
      }
    })
    .catch((err) => {
      console.log("Server Error", err);
      res.status(500).json({ message: "Server Error" });
    });
};

const validateProjectId = (req, res, next) => {
  const { id } = req.params;
  projModel
    .get(id)
    .then((project) => {
      if (!project) {
        res
          .status(400)
          .json({ message: `No project with the id: ${id} was found.` });
      } else {
        req.project = project;
        next();
      }
    })
    .catch((err) => {
      console.log("Server Error", err);
      res.status(500).json({ message: "Server Error" });
    });
};

module.exports = { logger, validateActionId, validateProjectId };
