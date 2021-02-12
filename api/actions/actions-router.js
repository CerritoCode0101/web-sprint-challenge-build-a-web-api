// Write your "actions" router here!
const actModel = require("./actions-model");
const mw = require("../middleware")
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  actModel
    .get()
    .then((action) => res.status(200).json(action))
    .catch((err) =>
      res.status(404).json({ message: `Actions not found: ${err}` })
    );
});

router.get("/:id", mw.validateActionId, (req, res) => {
  const idVar = req.params.id;
  actModel
    .get(idVar)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch(() => res.status(404).json({ message: `The action was not found` }));
});

router.post("/", (req, res) => {
  const actions = req.body;
  actModel
    .insert(actions)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      console.log("Server Error", err);
      res.status(500).json({ message: `Error adding action` });
    });
});

router.put("/:id", mw.validateActionId, (req, res) => {
  const idVar = req.params.id;
  const changes = req.body;
  actModel
    .update(idVar, changes)
    .then((changes) => {
      res
        .status(200)
        .json({ message: `The Action at id: ${changes.id} has been updated!` });
    })
    .catch((err) => {
      console.log("Server Error", err);
      res.status(500).json({ message: "Error updating action" });
    });
});

router.delete("/:id", mw.validateActionId, (req, res) => {
  const idVar = req.params.body;
  actModel
    .remove(idVar)
    .then((id) => res.status(200).json({ message: `action at ID: ${idVar}` }))
    .catch((err) => {
      console.log("Server Error", err);
      res
        .status(500)
        .json({ message: `The action at ID: ${idVar} could not be deleted` });
    });
});

module.exports = router;
