//미들웨어, 인증과 관련된 작업을 처리

const { User } = require("../models/User");

let auth = async ( req, res, next)=>{
        //인증 처리.(ID 토큰 비교)

        //클라이언트 쿠키에서 토큰 가져오기
        let token = req.cookies.test_cookie

        //복호화 해서 유저 찾기
        const user = await User.findByToken(token)

        if(!user){
            return res.status(401).json({isAuth: false, error:true}) //유저가 없으면 false
        }
        
        //유저가 있으면 인증 true
        req.token = token;
        req.user = user;
        next();

}

//다른 파일에서도 쓸 수 있게
module.exports = { auth };