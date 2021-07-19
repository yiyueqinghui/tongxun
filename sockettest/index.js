const Koa = require("koa");
const Router = require("koa-router");
const static = require("koa-static");
let app = new Koa();
let router = new Router();
app.use(static(__dirname+"/static"));
router.get("/test",ctx=>{
    ctx.body = "hello";
})

const server =  require("http").createServer(app.callback());
const io = require("socket.io")(server);
io.on("connection",(socket)=>{
    console.log("有连接");
    let obj = {
        name:"张三",
        age:20
    }
    // socket.emit("getData",JSON.stringify(obj));
    socket.on("addData",function(data){
        console.log(data);
        // socket.emit("getData",data);     // socket.eimt  一对一
        socket.broadcast.emit("getData",data);  // socket.broadcast 一对多
    })
})
app.use(router.routes());
server.listen(8989);