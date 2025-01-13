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
        maxlength:5
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

const User = mongoose.model("User",userSchema) // 위의 구조 쓰기

module.exports = { User } // 다른 곳에서도 쓸 수 있게 해주는 것.