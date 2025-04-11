// creating a web server using nodejs . we can do the same thing using bun.
// but nodejs is more supportive in any environment


// node contains all these modules

const fs=require('fs')
const http=require('http')
const path=require('path')

let port=3000
let localHost=`127.0.0.1`


const server=http.createServer((req,res)=>{
    // req
    const filePath=path.join(__dirname,req.url==='/'?"index.html":req.url)
    const extName=String(path.extname(filePath).toLowerCase())

    // which type of files our web application contains:-

    const mimeType={
        ".html":"text/html",
        ".css":"text/css",
        ".png":"image/png",
        ".js":"application/javascript"
    }

    const contentType=mimeType[extName] || 'application/octet-stream'

    // res

    fs.readFile(filePath,(err,content)=>{
        if(err){
            res.writeHead(404,{"content-type":"text/html"})
            res.end("404: file not found")
        }
        else{
            res.writeHead(200,{"content-type":contentType})
            res.end(content,"utf-8")
        }     
    })
})

server.listen(port,()=>{
    console.log(`server is listening at http://${localHost}:${port}`);
})