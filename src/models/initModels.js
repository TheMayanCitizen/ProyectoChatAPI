const Users = require("./users.models");
const Conversations = require("./conversations.models");
const Messages = require("./messages.models");
const Participants = require("./participants.models");

const initModels = () => {
  //? Users -> Participants 1:M
  Users.hasMany(Participants);
  Participants.belongsTo(Users);

  //? Conversations -> Participants 1:M
  Conversations.hasMany(Participants);
  Participants.belongsTo(Conversations);

  //? Participants -> Messages 1:M
  Participants.hasMany(Messages);
  Messages.belongsTo(Participants);
};

module.exports = initModels;
