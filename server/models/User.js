//MongoDB(Mongoose)에서 데이터 구조를 정의하는 틀 = Schema

const mongoose = require('mongoose');

//입력하는 데이터 구조 틀. 예를들면 회원가입할 때 이름,전번 입력하는거 구별해놓는 것.
const userSchema = mongoose.Schema({

    name:{
        type:String, maxlength:50
    },
    email:{
        type: String, trim:true, // trim 공백 제거
        unique:1 // 특수하게 하나만!!
    },
    password:{
        type:String,
        maxlength:100
    },
    lastname:{
        type:String,
        maxlength:50
    },
    role:{ // 일번유저,관리자 구별.
        type: Number, 
        default:0
    },
    token:{
        type:String
    },
    tokentime:{
        type:Number
    }
})

const bcrypt = require("bcrypt")
const saltRounds = 10 // 10자리 salt를 만들어서 암호화함.

userSchema.pre("save", function(next){
    var up = this // 화살표 함수로 하면 this참조가 바뀐다.

    if(up.isModified("password")){
        //비밀번호 암호화 salt 만드는 것.
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err){
                next(err)
                return 
            }  // 에러뜨면 넘겨주기.
            bcrypt.hash(up.password, salt, function(err, hash) {
                if(err) {
                    next(err)
                    return
                }   
                up.password = hash
                next() // 다시 save()로 보냄
            });
        });
    } // 비밀번호를 바꿀 때만 암호화 해주는 것.
    else{
        next() // 그 외의 경우엔 빠져나가게 하기.
    }

}) // save()전에 무엇인가를 하는. 몽고 전용 매소드. ★절대 화살표 함수 쓰지마.

userSchema.methods.truePassword = async function (plainPassword) {
    try {
      const isMatch = await bcrypt.compare(plainPassword, this.password);
      return isMatch;
    } catch (err) {
      throw err;
    }
};
  
const jbt = require("jsonwebtoken")
userSchema.methods.getToken = async function () {
    const user = this;
    const token = jbt.sign(user._id.toHexString(), "secretToken");
    user.token = token;
  
    try {
      await user.save();
      return token;
    } catch (err) {
      throw err;
    }
};

// 이놈은 statics 이다!! 전체 데이터베이스 수준의 작업을 처리한다
// method 는 특정 문서의 데이터를 처리.

userSchema.statics.findByToken = async function (token) {
    try{
        const decoded = jbt.verify(token, "secretToken")

        const user = await this.findOne({"_id":decoded, "token":token})

        return user;
    }catch(err){
        console.error('Token validation error:', err.message);
        return null;
    }
}

  
const User = mongoose.model("User",userSchema) // 위의 구조 쓰기

module.exports = { User } // 다른 곳에서도 쓸 수 있게 해주는 것.