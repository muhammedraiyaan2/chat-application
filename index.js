const firebaseConfig = {
    apiKey: "AIzaSyD3pNXQ8-0wZProhU2zFTg3DFFyzLn97xI",
    authDomain: "chatapplication2-a094c.firebaseapp.com",
    databaseURL: "https://chatapplication2-a094c-default-rtdb.firebaseio.com/",
    projectId: "chatapplication2-a094c",
    storageBucket: "chatapplication2-a094c.appspot.com",
    messagingSenderId: "1083773191735",
    appId: "1:1083773191735:web:20799b6f1ca1cb243161b2"
};
firebase.initializeApp(firebaseConfig);
if (localStorage.getItem("Name") === null || localStorage.getItem("Name") == `` || localStorage.getItem("Name") == null) {
    let lName = prompt("Please enter your name to display the name in the message")
    localStorage.setItem("Name", lName)
}
let messages=document.getElementById("message")
let btn = document.getElementById("btn")
let container = document.getElementById("container")
let date=new Date()
messages.addEventListener("keydown",function(event) {
    if(event.keyCode==13){
        btn.click();
    }
})
let t=`${date.getHours()}: ${date.getMinutes()}: ${date.getSeconds()}`
btn.addEventListener("click",function(){
    firebase.database().ref("Chats/"+Math.floor(Math.random()*9999999999999999)).set({
        Name:localStorage.getItem("Name"),
        Chat:messages.value,
        Time:t,
    })
    location.reload()
})
firebase.database().ref("Chats").once("value",function(snapshot){
    let data=snapshot.val()
    setInterval(() => {
        data=snapshot.val()
    }, 1);
    for(let i in data){
        container.innerHTML+=`<div class="message">${data[i].Name}: ${data[i].Chat} <br>${data[i].Time}</br></div>`
    }
})
let clear=document.getElementById("clear").onclick=function(){
    firebase.database().ref("Chats").remove()
    location.reload()
}
let reload=document.getElementById("reload").onclick=function(){
    location.reload()
}