const Conversations = require("../models/conversations.models");
const uui = require("uuid");
const Participants = require("../models/participants.models");

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

const createConversation = async (obj) => {
  const data = await Conversations.create({
    userId: obj.userId,
    title,
    imgUrl,
  });
  await Participants.create({
    conversationId: data.id,
    userId: obj.userId,
  });
  await Participants.create({
    conversationId: data.id,
    userId: obj.participantId,
  });
  return data;
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
