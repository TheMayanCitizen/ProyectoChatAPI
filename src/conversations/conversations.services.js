const conversationsControllers = require("./conversations.controllers");

const getAllConversations = (req, res) => {
  conversationsControllers
    .findAllConverstaions()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ message: "Bad request", err });
    });
};

const getConversationById = (req, res) => {
  const id = req.params.id;

  conversationsControllers
    .findConverstionById(id)
    .then((data) => {
      if (!data)
        return res
          .status(404)
          .json({ message: `Conversation with id ${id} does not exist` });
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ message: "Bad request", err });
    });
};

const getAllMessagesInConversation = (req, res) => {
  const id = req.params.id;

  conversationsControllers
    .findAllMessagesInConversation(id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
};

const postNewConversation = (req, res) => {
  const conversationObj = req.body;
  conversationsControllers
    .createConversation(conversationObj)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      res.status(400).json({ message: "Bad request", err });
    });
};

const patchConversation = (req, res) => {
  const id = req.params.id;
  const conversationObj = req.body;

  conversationsControllers
    .updateConversation(id, conversationObj)
    .then((data) => {
      if (!data) return res.status(404).json({ message: "Invalid ID" });
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ message: "Bad request", err });
    });
};

const deletedConversation = (req, res) => {
  const id = req.params.id;
  conversationsControllers
    .deletedConversation(id)
    .then((data) => {
      if (!data) return res.status(404).json({ message: "Invalid ID" });
      res.status(204).json();
    })
    .catch((err) => {
      res.status(400).json({ message: "Bad request", err });
    });
};

module.exports = {
  getAllConversations,
  getConversationById,
  getAllMessagesInConversation,
  postNewConversation,
  patchConversation,
  deletedConversation,
};
