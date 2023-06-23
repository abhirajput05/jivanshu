const express = require("express");
const app=express();
const http=require("https");
const bodyParser=require("body-parser")
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
})

app.listen(3000,function(){
  console.log("Server is runnning on port 3000");
})

app.post("/",function(req,res){
  const apiid="bf739c364a4b2639d514deabd0a3e263";

  const name=req.body.cityname;
  const url="https://api.openweathermap.org/data/2.5/weather?q="+name+"&appid="+apiid;
  http.get(url,function(response){
    response.on("data",function(data){
      const weather=JSON.parse(data);
      const temp=weather.main.temp;
      const icon=weather.weather[0].icon;
      const ucion=  "https://openweathermap.org/img/wn/"+icon+"@2x.png";
      res.write("<h1>The Current Weather in "+name+ " is "+temp+"</h1>");
        res.write("<img src="+ucion+">");
    res.send();
    })
  })
})
