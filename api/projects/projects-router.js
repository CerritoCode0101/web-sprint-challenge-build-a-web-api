// Write your "projects" router here!
const projModel = require("./projects-model");
const mw = require("../middleware")
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  projModel
    .get()
    .then((action) => res.status(200).json(action))
    .catch((err) =>
      res.status(404).json({ message: `Projects not found: ${err}` })
    );
});

router.get("/:id", mw.validateProjectId, (req, res) => {
  const idVar = req.params.id;
  projModel
    .get(idVar)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch(() => res.status(404).json({ message: `The project was not found` }));
});

router.post("/", (req, res) => {
  const project = req.body;
  console.log(project)
  projModel
    .insert(project)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
        console.log("Server Error", err)
      res.status(500).json({ message: `Error adding project` });
    });
});

router.put("/:id", mw.validateProjectId, (req, res) => {
  const idVar = req.params.id;
  const changes = req.body;
  projModel
    .update(idVar, changes)
    .then((changes) => {
      res
        .status(200)
        .json({ message: `The project at id: ${changes.id} has been updated!` });
    })
    .catch((err) => {
      console.log("Server Error", err);
      res.status(500).json({ message: "Error updating action" });
    });
});

router.delete("/:id", mw.validateProjectId, (req, res) => {
  const idVar = req.params.id;
  projModel
    .remove(idVar)
    .then((id) => res.status(200).json({ message: `project at ID: ${idVar}` }))
    .catch((err) => {
      console.log("Server Error", err);
      res
        .status(500)
        .json({ message: `The project at ID: ${idVar} could not be deleted` });
    });
});

//GET to project/actions
router.get('/:id/actions', mw.validateProjectId, (req, res) => {
    projModel.getProjectActions(req.params.id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ message: 'Error retrieving the projects' })
        })
});

module.exports = router;
