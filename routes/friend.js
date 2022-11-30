const {
    addFriend,
    getUserByPhoneNumber,
    getCurrentFriend,
    getIdOfListFriendByPhoneNumber,
    getAllCurrentFriend,
} = require("../controllers/friendController");

const router = require("express").Router();

router.post("/addFriend", addFriend);
router.post("/getUserByPhoneNumber", getUserByPhoneNumber);
router.post("/getCurrentFriend", getCurrentFriend);
router.post("/getIdOfListFriendByPhoneNumber", getIdOfListFriendByPhoneNumber);
router.post("/getAllCurrentFriend", getAllCurrentFriend);

module.exports = router;
