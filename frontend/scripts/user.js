let token = localStorage.getItem("loginToken");
let urlLink = `http://localhost:8080`
let cont = document.getElementById("allUsers")
let form = document.getElementById("form")
let updateStatus = false
let idU;
function getUsers(){
     console.log(token)
    fetch(`${urlLink}/user`,{
        method:"GET",
        headers:{
            "content-type":"application/json",
            "authorization": `bearer ${token}`
        }
    }).then((res)=> res.json()).then((res)=>{
        console.log(res)
        let ans = AppnedUser(res)
        cont.innerHTML = ans
        updateUser()
    }).catch((err)=>{
        console.log(err)
    })
}

getUsers()


function AppnedUser(data){
   let arr = data.map((el,i)=>{
         return appendCard(el.username,el.email,el.role,el.dob,el.location, el._id)
   })

   return arr.join(" ")

}

function appendCard(name, email, role, dob, location,_id){
    let card = `
    <div class="card">
        <h3>Name: ${name}</h3>
        <h4>emil: ${email}</h4>
        <h4>role: ${role}</h4>
        <h4>dob: ${dob}</h4>
        <h4>location: ${location}</h4>
        <div class="card-btn" > 
        <button class="btn" data-id=${_id} >Update</button>
        </div>
    </div>
    `

    return card
}


function updateUser(){
    let cardBtn =  document.querySelectorAll(".btn")
    for(let btn of cardBtn){
        btn.addEventListener("click",   function(e){
            e.preventDefault();
            let id = e.target.dataset.id
            //  console.log(e.target)
            //  alert(id)
            
            let username = form.username
            let email = form.email
            let dob = form.dob
            // let role =  form.role.value; 
            let location= form.location
            // let password = form.password.value;
            // let confirmPassword = form.confirmPassword.value;
            fetch(`${urlLink}/user/ind/${id}`,{
                method:"GET",
                headers:{
                    "content-type":"application/json",
                    "authorization": `bearer ${token}`
                },
               
            }).then((res)=>res.json()).then((res)=>{
                console.log(res)
                //  username.value = res.username
                 email.value = res.email
                 dob.value = res.dob
                 location.value= res.location
               
                 updateStatus = true
                 idU = id
               
            }).catch((err)=>{
                console.log(err)
            })

           
        })
    }

}


form.addEventListener("submit", function(){
    updateFn()
})

function updateFn(){
    event.preventDefault()
    console.log(idU)
    if(!updateStatus){
        alert("Click on Update Button First")
    }
    // let username = form.username.value
    let email = form.email.value
    let dob = form.dob.value
    // let role =  form.role.value; 
    let location= form.location.value
    // let password = form.password.value;
    // let confirmPassword = form.confirmPassword.value;
    let data = {email,dob,location}

    console.log(data)

    fetch(`${urlLink}/user/update/${idU}`,{
        method:"PATCH",
        headers:{
                "content-type":"application/json",
                "authorization": `bearer ${token}`
        },
        body:JSON.stringify(data)
    }).then((res)=>res.json()).then((res)=>{
        console.log(res)
        alert(res.msg)
        getUsers()
    }).catch((err)=>{
        console.log(err)
    })

}

// dob
// email
// location
// password
// role
// username


