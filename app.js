const API_KEY=require(__dirname+"/hidden.js");
const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app=express();
app.use(express.static("public")); //to use static files like css
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.get('/',function(req,res){
    res.sendFile(__dirname+"/index.html");
    app.post("/",function(req,res){
        const query=req.body.city; //to read the city entered by use
        const unit="metric";
        https.get("https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+API_KEY.API+"&units="+unit,function(response){
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
            res.render("weather",{temp:temp,query:query,icon:imageUrl,weatherDesc:weatherDescription});
        });
    })
    })
       
})
app.listen(3000,function(){
    console.log('Server started on port 3000');
})