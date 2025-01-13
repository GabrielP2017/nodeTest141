//패키지의 서버 시작점. -- 백엔드의 시작점.

// Express 모듈을 가져옵니다.
const express = require('express')

// Express 애플리케이션을 생성합니다.
const app = express()

// 사용할 포트를 지정합니다. 여기서는 3000번 포트를 사용합니다.
const port = 3000

//몽고DB와 어플 연결결

mongoose.connect('mongodb+srv://adminLE:fuck391cc@cluster0.o7vdg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
).then(() => console.log("MONGODB 연결됨...")).catch(console.error);
// 써주는 이유 : 에러 때문에.
//connect - MongoDB 데이터베이스에 연결을 시도합니다, then - MongoDB 연결에 성공하면 호출, catch - 연결이 실패하면 에러가 발생하며, 이 에러를 처리할 수 있습니다.


// GET 요청으로 '/' 경로에 접근했을 때 실행되는 라우터(핸들러)입니다.
app.get('/', (req, res) => {
  // 클라이언트(브라우저)에게 'Hello World!' 문자열을 응답으로 보냅니다.
  res.send('Hello World! 이것은 테스트 입니다.')
})

// 지정한 포트에서 서버를 실행합니다.
app.listen(port, () => {
  // 서버가 정상적으로 실행되면 콘솔에 로그 메시지를 출력합니다.
  console.log(`Example app listening on port ${port}`)
})
