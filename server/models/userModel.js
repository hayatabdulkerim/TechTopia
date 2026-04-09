const mongoose = require('mongoose')
const bycript = require('bycript')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email:{
        type: String, 
        required: true, 
        unique: true,
    },
    password:{
        type: String, 
        required: true,
    }
})

userSchema.statics.signup = async function(email, password) {  // arrow functions do not allow the use of the "this" keyword so we have to use a normal function
  
  // validation

  if (!email || !password){
    throw Error('All fields must be filled')
  }

  if (!validator.isEmail(email)){
    throw Error ('Email is not valid')
  }
  if (!validator.isStrongPassword(password)){
    throw Error('Password is not strong enough')
  }
  
  const exists = await this.findOne({email})   // check if the users email already exists. We used this keyword bc we donot have access to the model here we are just exporting it so that we may use it somewhere else, but the this key word represents the model we are working with.
  if (exists){
    throw Error('Email already in use')
  }

  const salt = await bcrypt.genSalt(10)   // this generates the string that is hashed with the password that generates different passwords even if two users used the same password which prevents hackers from password matching 
  const hash = await bcrypt.hash(password, salt)   // takes the password and the salt and generates a unique string

  const user = await this.create({email, password: hash})  // this creates a document in the db with the email and the hashed password

  return user   // returning the user so that we can use it in the controller function
}

// static login method

userSchema.statics.login = async function(email, password){

  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({email})

  if(!user){
    throw Error('Incorrect email')
  }

  const match = await bcrypt.compare(password, user.password)

  if (!match){
    throw Error('Incorrect password')
  }

  return user
}





module.exports = mongoose.model('User', userSchema)

//node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"       you can use this to generate a secrete 