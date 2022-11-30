const RequestFriend = require("../models/friendRequestModal");
const User = require("../models/userModel");
var mongoose = require("mongoose");
module.exports.requestFriend = async (req, res, next) => {
    console.log("Request Friend");
    try {
        const { received, senderId } = req.body;
        const currentRequest = await RequestFriend.find({
            senderId: {
                $all: [senderId],
            },
            received: {
                $all: [received],
            },
        });
        const allRequest = await RequestFriend.find({});

        //   if(allRequest.indexOf())
        const data = await RequestFriend.create({
            received: received,
            senderId: senderId,
            agreed: false,
        });
        res.status(200).json({
            data: data,
        });
    } catch (ex) {
        next(ex);
    }
};

module.exports.getAllFriendRequstById = async (req, res, next) => {
    try {
        const { received, currentPhoneNumber, phoneNumber } = req.body;
        console.log(phoneNumber);
        const allRequest = await RequestFriend.find({
            agreed: false,
        });
        const listRequest = await RequestFriend.find({
            received: {
                $all: [currentPhoneNumber],
            },
            agreed: false,
        });

        const listSendedRequest = await RequestFriend.find({
            senderId: {
                $all: [currentPhoneNumber],
            },
            received: {
                $all: [phoneNumber],
            },
            agreed: false,
        });

        const listPhoneRequest = [];
        listRequest.map((m, i) => {
            listPhoneRequest.push(m.senderId);
        });

        const listPhoneAllUser = [];

        const allUser = await User.find();
        allUser.forEach((element) => {
            listPhoneAllUser.push(element.phonenumber);
        });

        const listUserRequest = [];
        listPhoneAllUser.forEach(async (m, i) => {
            listPhoneRequest.forEach((e, index) => {
                if (listPhoneAllUser.indexOf(e) === -1) {
                } else {
                    listUserRequest.push(allUser[listPhoneAllUser.indexOf(e)]);
                }
            });
        });
        let uniqueChars = [...new Set(listUserRequest)];

        res.status(200).json({
            data: uniqueChars,
            //Các yêu cầu kết bạn chưa đồng ý
            data2: listRequest,
            //Các yêu cầu kết bạn đã gửi
            data3: listSendedRequest,
            //Tất cả các lời mời chưa được đồng ý
            data4: allRequest,
        });
    } catch (ex) {
        next(ex);
    }
};

module.exports.agreeRequestFriend = async (req, res, next) => {
    console.log("Agree Request Friend");
    try {
        const { received, senderId } = req.body;

        const filter = { received: received, senderId: senderId };
        const update = { agreed: true };
        const request = await RequestFriend.findOneAndUpdate(filter, update);

        res.status(200).json({
            data: "Them ban thanh cong",
        });
    } catch (error) {}
};
module.exports.rejectRequestFriend = async (req, res, next) => {
    console.log("reject Request Friend");
    try {
        const { received, senderId } = req.body;

        const filter = { received: received, senderId: senderId };
        const update = { agreed: true };
        const request = await RequestFriend.deleteOne(filter);

        res.status(200).json({
            data: "Xoa thanh cong",
        });
    } catch (error) {}
};
