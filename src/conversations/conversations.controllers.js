const Conversations = require("../models/conversations.models");
const uui = require("uuid");
const Participants = require("../models/participants.models");
const Users = require("../models/users.models");

const findAllConverstaions = async () => {
  const conversations = await Conversations.findAll();
  return conversations;
};
const findAllMessagesInConversation = async (id) => {
  const conversations = await Conversations.findAll({
    where: { id: id },
    include: [{ model: Participants, include: [{ model: Messages }] }],
  });
  return conversations;
};

const findConverstionById = async (id) => {
  const data = await Conversations.findOne({
    where: {
      id: id,
    },
  });
  return data;
};

const createConversation = async (conversationObj) => {
  const userGuest = await Users.findOne({
    where: {
      id: conversationObj.guestId,
    },
  });
  if (!userGuest) return false;

  const newConversations = await Conversations.create({
    id: uui.v4(),
    name: conversationObj.name,
    profileImage: conversationObj.profileImage,
    isGroup: conversationObj.isGroup,
  });

  await Participants.create({
    id: uui.v4(),
    userId: conversationObj.ownerId,
    conversationId: newConversations.id,
    isAdmin: true,
  });

  await Participants.create({
    id: uui.v4(),
    userId: conversationObj.guestId,
    conversationId: newConversations.id,
    isAdmin: false,
  });
  return newConversations;
};

const updateConversation = async (conversationId, conversationObj) => {
  const selectedConversation = await Conversations.findOne({
    where: {
      id: conversationId,
    },
  });
  if (!selectedConversation) return null;
  const updatedConversation = await selectedConversation.update(
    conversationObj
  );
  return updatedConversation;
};

const deletedConversation = async (id) => {
  const conversation = await Conversations.destroy({
    where: {
      id: id,
    },
  });
  return conversation;
};

module.exports = {
  findAllConverstaions,
  findConverstionById,
  findAllMessagesInConversation,
  createConversation,
  updateConversation,
  deletedConversation,
};
