let urlLink = `http://localhost:8080`


let form = document.getElementById("form")
form.addEventListener("submit", ()=>{
  submitFn()  
 
})


function User(u,e,d,r,l,p){
    this.username = u;
    this.email = e;
    this.dob=d;
    this.role=r;
    this.location=l;
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

function submitFn(){
    event.preventDefault()
    let username = form.username.value;
    let email = form.email.value;
    let dob = form.dob.value;
    let role =  form.role.value; 
    let location= form.location.value;
    let password = form.password.value;
    let confirmPassword = form.confirmPassword.value;
    // console.log(password, confirmPassword)
    if(!username || !email || !dob || !role || !location || !password || !confirmPassword){
         alert("Please Enter All The Fields")
         window.location.href="signup.html"
    }
    if(password!==confirmPassword){
        alert("Password Not Matching");
        window.location.href="signup.html"
    }

  let newUser = new User(username,email,dob,role,location,password);
  console.log(newUser)
  console.log(`${urlLink}/user/register`)


  fetch(`${urlLink}/user/register`,{
    method:"POST",
    headers:{"content-type": "application/json"},
    body:JSON.stringify(newUser)
}).then((res)=> res.json()).then((res)=>{
    console.log(res)
    if(res.status){
        let msg = res.userName
        alert(`The user with username ${msg} has been registered sucesfully`)
        window.location.href="login.html"
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