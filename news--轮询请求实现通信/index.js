const Koa = require("koa");
const static = require("koa-static");
const Router = require("koa-router");
const mysql = require("mysql2");
const koaBody = require("koa-body");
let app = new Koa();
let router = new Router();
app.use(koaBody());
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:"root",
    database: 'nodemysql',
    charset:"utf8"
  });
// console.log(__dirname);
// console.log(__filename);
app.use(static(__dirname+"/static"));
router.get("/test",ctx=>{
    ctx.body = "hello";
})
router.get("/getData",async ctx=>{
    let sql = "SELECT * FROM chat";
   let [rows]  = await connection.promise().query(sql) ;
   ctx.body = rows;
})
router.post("/addChat",async ctx=>{
    // console.log(ctx.request.body);
    let {content} = ctx.request.body;
    let sql = "INSERT INTO chat (content) VALUES (?)";
    let result  = await connection.promise().query(sql,[content]) ;
    // console.log(result);
    let info;
    if(result[0].affectedRows>0){
        info = {
            message:"添加成功",
            status:1
        }
    }else{
        info = {
            message:"添加失败",
            status:0
        }
    }
   ctx.body = info;
})

app.use(router.routes());
app.listen(8888);