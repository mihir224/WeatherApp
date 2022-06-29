const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app=express();
app.use(bodyParser.urlencoded({extended:true}))
app.get('/',function(req,res){
    res.sendFile(__dirname+"/index.html");
    app.post("/",function(req,res){
        const query=req.body.city;
        const API_KEY="2112097d26c6b40cc517ab6adf7c3bb0";
        const unit="metric";
        https.get("https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+API_KEY+"&units="+unit,function(response){
        response.on("data", function(data){
            const weatherData=JSON.parse(data);
            console.log(weatherData);
            const temp=weatherData.main.temp; //to tap into the temp key value in the json file
            console.log(temp);
            const weatherDescription=weatherData.weather[0].description;
            console.log(weatherDescription);
            const icon=weatherData.weather[0].icon;
            const imageUrl="http://openweathermap.org/img/wn/" + icon + "@2x.png";
            //to send multiple html items at once
            res.write("<h1>Weather<h1>")
            res.write("<h2>The Weather in " + query +  " is " + temp + " Degree Celcius</h2>");
            res.write("<img src=" +imageUrl+">");
            res.send();
        })
    })
    })
       
})
app.listen(3000,function(){
    console.log('Server started on port 3000');
})