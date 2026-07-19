const express = require('express');
const app = express();


app.get('/',(req,res)=>{
    res.send('welcome');
})

app.listen(3000,(req,res)=>{
    console.log('server is running on port 3000');
})