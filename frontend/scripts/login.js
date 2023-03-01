

let urlLink = `http://localhost:8080`




let form = document.getElementById("form")
form.addEventListener("submit", ()=>{
  LoginFn()  
 
})


function User(u,p){
    this.username = u;
    this.password = p

}

// <!-- {
//     username:{type: String, unique:true},
//     email:{type: String, unique:true},
//     dob:String,
//     role:{type:String, enum:["Admin","Explorer"]},
//     location:String,
//     password:String
// } -->

function  LoginFn()  {
    event.preventDefault()
    let username = form.username.value;
    let password = form.password.value;
    
    // console.log(password, confirmPassword)
    if(!username || !password ){
         alert("Please Enter All The Fields")
         window.location.href="signup.html"
    }
    
  let newUser = new User(username,password);
  console.log(newUser)
  console.log(`${urlLink}/user/register`)


  fetch(`${urlLink}/user/login`,{
    method:"POST",
    headers:{"content-type": "application/json"},
    body:JSON.stringify(newUser)
}).then((res)=> res.json()).then((res)=>{
    console.log(res)

    if(res.status){
      let msg = res.msg
        alert(msg)
        localStorage.setItem("loginToken", res.token)
        window.location.href = "user.html"
    }
    else{
        let msg = res.msg
        alert(msg)
        window.location.reload()
    }
   
}).catch((err)=>{
    console.log(err)
    // alert()
})
  
}