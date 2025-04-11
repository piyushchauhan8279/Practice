// since we are using Es not commoneJs
import 'dotenv/config'
import express from 'express'

const app=express()
const port=process.env.port

app.use(express.json()) // middleware to parse json 
// hey express when someone pass data in body :- parse it

let id = 1;
let arr = [];

app.listen(port,()=>{
    console.log(`server is listening at port ${port}... `); 
})

app.get("/",(req,res)=>{
    res.send("hello from Piyush")
})

app.get("/insta",(req,res)=>{ // here "/insta" is routes
    res.send(arr)
})

app.get("/linkedin",(req,res)=>{
    res.send("i used linkedin often")
})

app.get("/insta/:id",(req,res)=>{ 
    const myId=arr.find(item=>item.newId===parseInt(req.params.id))
    if(!myId){
        return res.status(404).send("id not found")

    }
    res.status(200).send(myId)
})

app.post("/insta", (req, res) => {
    const { name, price } = req.body;
    const newData = { newId: id++, name, price };
    arr.push(newData);
    res.status(201).send(arr);
});


// how to get a single tea

app.post('/insta/:id', (req, res) => {
    const info = arr.find(item => item.newId === parseInt(req.params.id));
    if (!info) {
        res.status(404).send("info not found");
    } else {
        res.status(200).send(info);
    }
});



// update operation:-

app.put('/insta/:id', (req, res) => {
    console.log("PUT request received for ID:", req.params.id);
    console.log("Request body:", req.body);

    const item = arr.find(obj => obj.newId === parseInt(req.params.id));
    
    if (!item) {
        return res.status(404).send("ID not found");
    }

    const { name, price } = req.body;

    item.name = name;
    item.price = price;

    console.log("Updated item:", item);

    res.status(200).send({
        message: "Successfully updated",
        updatedArray: arr
    });
});



// delete operation:-

app.delete('/insta/:id',(req,res)=>{
    // find the idx

    let index=arr.findIndex(i=> i.newId===parseInt(req.params.id))
    if(index==-1) {
        return res.status(404).send("index not found")
    }
    arr.splice(index,1)
    return res.status(200).send("deleted")
})