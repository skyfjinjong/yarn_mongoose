const express = require("express");
const mongoose = require("mongoose");
const User = require("./model");
const app = express();
const data = require("./movieData");
const path = require("path");

// GET params, query: 여러가지 데이터 가능
// POST body

// 바디는 JSON 형태로 받을 수 있다.

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userData = [
    {
        id: "elice",
        pw: "1234",
    },
];

function movieSearch(name) {
    return data.movieData.filter((v) => {
        return v.name.includes(name);
    });
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

function middle1(req, res, next) {
    req.params.temp = "중간에 낀 값";
    console.log("중간과정");
    next();
}

app.use(middle1);

app.get("/middle", /*middle1,*/ (req, res) => {
    console.log("마무리 >>>", req.params.temp);
    res.send("Hello");
})

app.get("/middle2", (req, res) => {
    res.send("middle2");
})

app.post("/login", (req, res) => {
    console.log("클라이언트 값", req.body);
    const { id, pw } = req.body;

    User.findOne({ id: id })
        .then((result) => {
            console.log(result);
            if (result.pw === pw) {
                res.send({
                status: "로그인 성공",
            });
            } else {
                res.send({
                status: "비밀번호 틀림",
            });
            }
        })
        .catch((err) => {
            res.send({
                status: "아이디가 없음.",
            });
    });
    // const id = req.body.id;
    // const pw = req.body.pw;
  
    // const findElement = userData.find((v) => v.id === id);
    // if (findElement !== undefined && findElement.pw === pw) {
    //   // 성공
    //   res.send({
    //     status: "succ",
    //   });
    // }
    // res.send({
    //   status: "fail",
    // });
  });

app.get("/search", (req, res) => {
    const query = req.query;
    console.log(query);
    const name = req.query.name;
    const result = movieSearch(name);
    res.send({
        result,
    });
});

app.post("/register", (req, res) => {
    const { id, pw } = req.body;
    const newUser = new User({
        id: id,
        pw: pw,
    });
    newUser
        .save()
        .then((v) => {
            res.send({
                status : "succ",
            });
        })
        .catch((e) => {
            res.send({
                status : "fail",
            })
        })
})

app.listen(3000, () => {
    console.log("3000 port listen!");

    mongoose.connect(
        "mongodb+srv://admin:1234@cluster0.yfbio.mongodb.net/elice",
        (err) => {
            console.log("MongoDB Connect");
        }
    );
});