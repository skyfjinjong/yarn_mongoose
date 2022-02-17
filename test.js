const mongoose = require("mongoose");
const User = require("./model");
// mongodb+srv://admin:1234@cluster0.yfbio.mongodb.net/elice

mongoose.connect(
    "mongodb+srv://admin:1234@cluster0.yfbio.mongodb.net/elice",
    (err) => {
        console.log("MongoDB Connect");
        const newUser = new User({
            id : "jjj",
            pw : "1212",
        })
        newUser
        .save()
        .then(() => console.log("success"))
        .catch((e) => console.log("fail"))

        User.find({ id: 'apple' }).then((result) => {
            console.log(result);
        })
    }
);