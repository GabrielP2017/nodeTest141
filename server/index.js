//패키지의 서버 시작점. -- 백엔드의 시작점.(api 만드는 중)

// Express 모듈을 가져옵니다.
const express = require('express')

// Express 애플리케이션을 생성합니다.
const app = express()

// 사용할 포트를 지정합니다.
const port = 4355

const { User } = require("./models/User");
// const models = require("./models/User");
// const User = models.User;
//이걸 생략하는 것.
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
app.use(cookieParser());

//바디파서 옵션
app.use(bodyParser.urlencoded({extended: true})); // application/x-www-form-urlencoded 데이터를 가져옴
app.use(bodyParser.json()); //application/json 데이터 가져옴
// `body-parser`는 HTTP 요청 본문은 문자열 형태로 전달되는데 JavaScript 객체로 변환해야 쉽게 다룰 수 있어어
//`req.body`에 객체 형태로 저장하여 데이터를 쉽게 다룰 수 있게 합니다.

//몽고DB와 어플 연결
const mongoose = require("mongoose")
const config = require("./config/key")

mongoose.connect(config.mongoURI).then(() => console.log("MONGODB 연결됨...")).catch(console.error);
// 써주는 이유 : 에러 때문에.
//connect - MongoDB 데이터베이스에 연결을 시도합니다, then - MongoDB 연결에 성공하면 호출, catch - 연결이 실패하면 에러가 발생하며, 이 에러를 처리할 수 있습니다.

const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000', // 프론트엔드 URL
  credentials: true,               // 인증 정보 포함 시 필요
}));


// GET 요청으로 '/' 경로에 접근했을 때 실행되는 라우터(핸들러)입니다.
app.get('/', (req, res) => {
  // 클라이언트(브라우저)에게 'Hello World!' 문자열을 응답으로 보냅니다.
  res.send('Hello World! 이것은 테스트 입니다. 추가 내용입니다.')
})

app.get('/api/hello', (req, res) => {
  res.send('테스트 안녕?!');
});

//강의하고 다른점
app.post("/api/register", async (req, res) => {
  try {
    const user = new User(req.body); // body-parser를 이용해서 클라이언트 정보를 받아옴
    await user.save(); // 사용자 정보를 MongoDB에 저장
    res.status(200).json({ success: true }); 
    console.log("Received data:", req.body); // 클라이언트에서 전달된 데이터 로그
  } catch (err) {
    console.error("Error during registration:", err); // 에러 발생 시 로그
    res.status(500).json({ success: false, error: err.message });
  }
});
//postman 관련

//로그인 예제.
app.post("/api/login", async(req, res)=>{
  try{
      //요청된 이메일을 데이터베이스에서 있는지 찾기.
      const user = await User.findOne({ email: req.body.email });

      if (!user) {
        return res.json({
          loginSuccess: false,
          message: "제공된 이메일에 해당하는 유저가 없습니다."
        });
      }

      //요청된 이메일이 데이터베이스에 있으면 비밀번호가 맞는 비밀번호인지 확인.
      const isMatch = await user.truePassword(req.body.password);

      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다."
        });
      }
      //비밀번호가 맞다면 토큰을 생성해주기. (jsonwebtoken 라이브러리 필요.)
      const token = await user.getToken();
      res.cookie("test_cookie", token).status(200).json({loginSuccess:true,userId: user._id})

  }catch(err){
    console.error(err);
    res.status(500).json({
      loginSuccess: false,
      message: "서버 에러가 발생했습니다."
    });
  }
})

//실시간으로 계속 ID와 토큰을 비교함
// Auth = 위의 내용을 하기전 중간에서 해주는 것.

const {auth} = require("./middleware/auth")
app.get("/api/auth",auth,(req,res)=>{

  //Auth true 이후의 일.
  res.status(200).json({
    _id:req.user._id,
    isAdmin: req.user.role === 0 ? false:true // 어드민인지 보는 것.
    ,isAuth:true,
    name:req.user.name,
    email:req.user.email,
    password:req.user.password
  })

})

//로그아웃 : Auth를 통해 ID를 실시간으로 토큰과 비교하다가 클라이언트의 토큰을 지워주면 인증이 안됨.
app.get("/api/logout",auth, async (req, res)=>{
  try{
    const user = await User.findOneAndUpdate( //findOneAndUpdate = MongoDB에서 기본으로 써주는 메서드.
      {_id:req.user._id},
      {token:""},
      {new:true} // 업데이트 전에 존재하던 문서를 반환하지 않게 하기.
    ) // 아이디 찾아주기.
    res.status(200).send({success:true}) // 로그아웃 잘되면 됨.
  }catch(err){
    res.status(500).json({ isAuth: false, error: err.message })
  }
})

// 지정한 포트에서 서버를 실행합니다.
app.listen(port, () => {
  // 서버가 정상적으로 실행되면 콘솔에 로그 메시지를 출력합니다.
  console.log(`Example app listening on port ${port}`)
})