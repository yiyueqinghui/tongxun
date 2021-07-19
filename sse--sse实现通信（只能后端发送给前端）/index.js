// 不能停止推送；
// ctx.body  = "hello";
// res.write();
// res.end();
const http = require("http");
const fs = require("fs");
const url = require("url");
let server = http.createServer((req,res)=>{
   let urlObj =   url.parse(req.url,true);
   if(urlObj.pathname==="/"){
    //    加载页面
        console.log(1)
        let resData = fs.readFileSync("./index.html");
        res.end(resData);
   }else if(urlObj.pathname==="/sse"){
    //    推送数据；
       res.writeHead(200,{"content-type":"text/event-stream"})
        setInterval(()=>{
            let obj = {
                name:"张三",
                age:20
            }
            res.write("data:"+JSON.stringify(obj)+"\r\n\r\n");
        },1000)
   }
});
// 数据只能服务端推送到客户端；
// 基于http协议；
// 跨域
server.listen(8889);