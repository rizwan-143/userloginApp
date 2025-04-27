

let registrationForm = document.getElementById("myRegisterForm");
if(registrationForm){

    registrationForm.addEventListener(`submit` , function(e){
        e.preventDefault();
        let usersArray = JSON.parse(localStorage.getItem(`users`)) || [];
    
        
        let isDuplicate = usersArray.find((a) =>{
            return a.userEmail === e.target.userRegisterEmail.value;
        } );
        
        if(isDuplicate){
            alert("This Email is alreday Exists !")
            return ;
        }
    
        let isPassword = e.target.userRegisterPassword;
        if(isPassword.value.length < 6){
            alert("password can not be less than 8 characters");
            return;
        }
        
        let usersObject = {
            userName : e.target.userRegisterName.value,
            userEmail : e.target.userRegisterEmail.value,
            userPassword : e.target.userRegisterPassword.value,
        };
    
        usersArray.push(usersObject);
    
        localStorage.setItem(`users` ,JSON.stringify( usersArray));
        e.target.reset();
    
    });
}


let myLoginForm = document.getElementById("myLoginForm");
if(myLoginForm){
    
    myLoginForm.addEventListener(`submit` , function(e){
        e.preventDefault();
    
        let storedUsers = JSON.parse(localStorage.getItem(`users`));
    
        let matchUser = storedUsers.find((u) =>{
             return (
                e.target.userLoginEmail.value === u.userEmail &&
                e.target.userLoginPassword.value === u.userPassword // Corrected password comparison
            );
        });
        if(matchUser){
            localStorage.setItem('loggedInUser', JSON.stringify(matchUser));
            window.location.href = "./home.html";
        }else{
            alert("enter a valid details !")
        }
    
    });
}

let loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

if (loggedInUser) {
    // Display the user's name (assuming there's an element with id "userName")
    document.getElementById("userNameDisplay").textContent = ` ${loggedInUser.userName}`;
}

 let logOutBtn = document.getElementById("logOutBtn")
 
 if(logOutBtn){

     logOutBtn.addEventListener(`click` , () =>{window.location.href = "./login.html"})
 };


 let addListBtn = document.getElementById("addListBtn");

 if(addListBtn){
     let count = 1;
    addListBtn.addEventListener(`click` , function(){
        let userInputLIst = document.getElementById("userInputLIst").value;
            if(userInputLIst === ""){
                alert("list can not be empty !");
                return;
            }
        let toDoList = document.getElementById("toDoList");
        let list = document.createElement("li");
        let userTodoList = JSON.parse(localStorage.getItem(`todoList_${loggedInUser.userEmail}`)) || [];
        userTodoList.push(userInputLIst);
        localStorage.setItem(`todoList_${loggedInUser.userEmail}`, JSON.stringify(userTodoList));
        list.textContent = ` List no  ${count++}    ${userInputLIst}`;
        toDoList.appendChild(list);
    });


    let userTodoList = JSON.parse(localStorage.getItem(`todoList_${loggedInUser.userEmail}`)) || [];
let toDoList = document.getElementById("toDoList");
userTodoList.forEach((task) => {
    let listItem = document.createElement("li");
    listItem.textContent = task;
    toDoList.appendChild(listItem);
});
 }
