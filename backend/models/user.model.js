const mongoose=require("mongoose")


const userSchema = mongoose.Schema(
    {
    username:{type: String, unique:true},
    email:{type: String, unique:true},
    dob:String,
    role:{type:String, enum:["Admin","Explorer"]},
    location:String,
    password:String
})


const UserModel = mongoose.model("b23mini",userSchema);


module.exports = {UserModel}

// ///username ==> Input Field
// -email ==> Input Field
// -DOB ==> Input Field
// -Role ==> Dropdown Menu (Admin, Explorer)
// -location ==> Input Field
// -password ==> Input Field (Type: Password)