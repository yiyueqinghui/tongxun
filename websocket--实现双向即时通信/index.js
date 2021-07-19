var WebSocketServer = require("ws").Server;
let wss = new WebSocketServer({port:8181});
let arr = [];
wss.on("connection",function(ws){
    arr.push(ws);
    console.log(arr.length);
    let obj ={
        name:"张三",
        age:20
    }
    ws.on("message",(data)=>{
        console.log(data);
    })
    setInterval(()=>{
    ws.send(JSON.stringify(obj));
    },1000)
    ws.onerror = function(err){
        return console.log(err);
    }
    // ws.close();
   
})