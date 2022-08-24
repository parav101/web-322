function makeAJAXRequest(method, url, data){
    if(data){ // Make an AJAX call using the provided data & method
        fetch(url, { 
            method: method,
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json'} 
        })
        .then(response => response.json())
        .then(json => {
            console.log(json);   
        }).catch(err=>{
            console.log(err);
        });

    }else{  // Make an AJAX call without providing data using the method
        fetch(url, { method: method })
        .then(response => response.json())
        .then(json => {
            console.log(json);   
        });
    }
}
function getAllUsers(){
     makeAJAXRequest("GET", "/api/users");
}

function addNewUser(){
     makeAJAXRequest("POST", "/api/users", {fName: "Bob", lName: "Jones"});
}

function getUserById(){
    makeAJAXRequest("GET", "/api/users/2");
}

function updateUserById(){
    makeAJAXRequest("PUT", "/api/users/2", {fName: "Wanda", lName: "Smith"});
}

function deleteUserById(){
    makeAJAXRequest("DELETE", "/api/users/2");
}



// for testing remote web API from https://reqres.in
function addNewUser_reqres_in(){
    makeAJAXRequest("POST", "https://reqres.in/api/users", {name: "John Smith", job: "office assistant"});
}