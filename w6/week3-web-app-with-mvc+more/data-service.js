
let members = [];

// module.exports.initialize = function(){
//     return new Promise( (resolve, reject) => {
        members = [
            {
                name: "John Smith",
                age: 23,
                photoUrl: "https://www.senecacollege.ca/home/_jcr_content/root/responsivegrid/quote_copy_copy_copy_2053529833.img.jpg/1631802925543.jpg",
                occupation: "student",
                company: "Seneca College",
                visible: true
            },
            {
                name: "Steve Wong",
                age: 32,
                photoUrl: "http://localhost:8080/images/Express.js.png",
                occupation: "developer",
                company: "Newnham Inc."
            },
            {
                name: "Sarah",
                age: 32,
                photoUrl: "http://localhost:8080/images/ca.png",
                occupation: "manager",
                company: "Seneca@York"
            }
        ];
    //     resolve();
    // });
// }


// CRUD operations for the Member Entity:

// C - Create
module.exports.addNewMember = function(data){
    
    return new Promise((resolve,reject)=>{
        // members.push(data);
        members.unshift(data);

        resolve();
    })
}

// R - Retrieve: GetAll
module.exports.getAllMembers = function(){
    return new Promise((resolve,reject)=>{
        if (members.length == 0) {
            reject("query returned 0 results"); return;
        }

        resolve(members);
    })
}

// R - Retrieve: GetOne
module.exports.getMembersById = function(id){ // user element position in the array to mimic id
    return new Promise((resolve,reject)=>{
        if (id <= members.length) {
            resolve( members[id-1] );
        } else {
            reject("The given id is out of range"); 
        }
    })
}

// U - Update
module.exports.updateMember = function(data, id){
    if (id <= members.length){
        members[id-1] = data;
    }
}

// D - Delete
module.exports.deleteMemberById = function(id){
    if (id <= members.length) {
        members.splice(id-1, 1);
    }
    
}


// CRUD operations for other Entities:
// ...