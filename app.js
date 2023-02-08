const express=require("express");
const https=require("https");
require('dotenv').config();
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
        https.get("https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+process.env.API_KEY+"&units="+unit,function(response){
        response.on("data", function(data){
            const weatherData=JSON.parse(data);
            console.log(weatherData);
            if(weatherData.cod=='404'){
                res.send(weatherData.message);
            }
            else{
            const temp=weatherData.main.temp; //to tap into the temp key value in the json file
            console.log(temp);
            const weatherDescription=weatherData.weather[0].description;
            const city=weatherData.name;
            console.log(weatherDescription);
            const icon=weatherData.weather[0].icon;
            const imageUrl="http://openweathermap.org/img/wn/" + icon + "@2x.png";
            //to send multiple html items at once
            res.render("weather",{temp:temp,query:city,icon:imageUrl,weatherDesc:weatherDescription,country:weatherData.sys.country});}
        });
    })
    })
       
})
app.listen(3000,function(){
    console.log('Server started on port 3000');
})