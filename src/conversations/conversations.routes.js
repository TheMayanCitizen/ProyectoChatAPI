const router = require("express").Router();

const conversationsServices = require("./conversations.services");
const JwtPassport = require("../middlewares/auth.middleware");

router
  .route("/")
  .get(
    JwtPassport.authenticate("jwt", { session: false }),
    conversationsServices.getAllConversations
  )
  .post(
    JwtPassport.authenticate("jwt", { session: false }),
    conversationsServices.postNewConversation
  );

router
  .route("/:conversation_id")
  .get(
    JwtPassport.authenticate("jwt", { session: false }),
    conversationsServices.getConversationById
  )
  .patch(
    JwtPassport.authenticate("jwt", { session: false }),
    conversationsServices.patchConversation
  )
  .delete(
    JwtPassport.authenticate("jwt", { session: false }),
    conversationsServices.deletedConversation
  );

router.get(
  "/:conversarion_id/messages",
  JwtPassport.authenticate("jwt", { session: false }),
  conversationsServices.getAllMessagesInConversation
);

module.exports = router;
