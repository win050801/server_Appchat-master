const {
    requestFriend,
    getAllFriendRequstById,
    agreeRequestFriend,
    rejectRequestFriend,
} = require("../controllers/friendRequestController");

const router = require("express").Router();

router.post("/requestFriend", requestFriend);
router.post("/getAllFriendRequstById", getAllFriendRequstById);
router.post("/agreeRequestFriend", agreeRequestFriend);
router.post("/rejectRequestFriend", rejectRequestFriend);

module.exports = router;
