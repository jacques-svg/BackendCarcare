const db =  require('../config/connexion')
const express = require("express");
const jwt = require("jsonwebtoken")
const app = express();
const bcrypt = require('bcrypt');
const saltRounds = 10;

app.use(express.json({ extended: false }));

//signup route api
exports.signupUser = async (req, res) => {

    const { email,username, password } = req.body;
   
    const sqlVerify = 'SELECT * FROM user WHERE email=? OR username=?'
    const sql = "INSERT INTO user(email,username,password) VALUES(?,?,?)"

    db.query(sqlVerify,[email,username],(err,rows)=>{

      if(err){
        return res.json('Insert failed!')
      }
      if(rows[0].email == email){
        res.json({message:"Email already taken"})
      }
      else if (rows[0].username == username){
        res.json({message:"Username already taken"})
      }
      else{

        bcrypt.hash(password,saltRounds,function(err,hash){

          if(err) return console.error(err)
    
          db.query(sql,[email,username,hash],(err,rows)=>{
            console.log(rows)
    
            return res.json({
              email:email,
              username:username,
              password:hash
            });
    
          })
        })
      }
    })

};

exports.login = async (req, res) => {

  const { email,username, password } = req.body;
  
  const sql = "SELECT * FROM user WHERE email=? OR username=?"

    db.query(sql,[email,username],(err,rows)=>{

      if(err){
        res.send('Login failed!')
      }
      if(rows.length>0){

        bcrypt.compare(password,rows[0].password,(err,response)=>{
          if(response){

            console.log(rows[0])
            var token = jwt.sign({id:rows[0].id},"password")
  
            return res.json({
              id:rows[0].id,
              email:email,
              username:username,
              password:password,
              token:token
            });
  
          }
          return res.json({message:'Wrong password please enter the correct password!'})
        })
        
      }
      else{
        return res.json({message : "no user found with that email"})
      }
    })
};

exports.deleteUser = async (req, res) => {

  //const {email} = req.body
  const sql = "DELETE FROM users"

  db.query(sql,(err,rows)=>{
    if(err){
      console.log(err)
    }
    else{
      
      //res.send(`${req.body.email} delete succefully!`);
    }
  })
  
};

exports.privateRoute = async (req, res) => {

let token = req.header("token")

if(!token) {
  res.json({msg: "sorry this is a private route"})
}
var decoded = jwt.verify(token, "password")
console.log(decoded.id)
//return res.json({msg:"you are in the private route"})

//get user infos by his token
const sql = "SELECT * FROM users WHERE id=?"
db.query(sql,decoded.id,(err,rows)=>{
  return res.json({
    id:decoded.id,
    email:rows[0].email, 
    password:rows[0].password
  })
})
};

exports.fetchUsers = async (req, res) => {

  const sql = "SELECT * FROM users"

  db.query(sql,(err,rows)=>{
    if(err){
      console.log(err)
    }
    else{
      //res.send(`${email} Insert successfully!`)
      //res.json();
      res.send(rows);
    }
  })
  
};



