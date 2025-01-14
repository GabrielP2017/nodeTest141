//패키지의 서버 시작점. -- 백엔드의 시작점.

// Express 모듈을 가져옵니다.
const express = require('express')

// Express 애플리케이션을 생성합니다.
const app = express()

// 사용할 포트를 지정합니다. 여기서는 3000번 포트를 사용합니다.
const port = 3000 // http://localhost/3000

const { User } = require("./models/User");
// const models = require("./models/User");
// const User = models.User;
//이걸 생략하는 것.
const bodyParser = require("body-parser");

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


// GET 요청으로 '/' 경로에 접근했을 때 실행되는 라우터(핸들러)입니다.
app.get('/', (req, res) => {
  // 클라이언트(브라우저)에게 'Hello World!' 문자열을 응답으로 보냅니다.
  res.send('Hello World! 이것은 테스트 입니다. 추가 내용입니다.')
})

//강의하고 다른점
app.post("/register", async (req, res) => {
  //회원가입에 필요한 정보들을 클라이언트에서 가져오면 그것들을 데이터베이스에 넣어준다.
try{
  const user = new User(req.body) // body-parser를 이용해서 클라이언트 정보를 받아줌.
  await user.save()
  res.status(200).json({success:true})

}catch(err){
  res.status(500).json({success:false, error:err.message})

}

})
//postman 관련


// 지정한 포트에서 서버를 실행합니다.
app.listen(port, () => {
  // 서버가 정상적으로 실행되면 콘솔에 로그 메시지를 출력합니다.
  console.log(`Example app listening on port ${port}`)
})
