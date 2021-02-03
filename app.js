//jshint esversion:6

const express = require("express");
const https = require("https");
const bodyParser=  require("body-Parser");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");

});

app.post("/",function(req,res){


  const query= req.body.cityName;
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=4f90db0746542e7ffd89fd994af7ff1f&units=metric";

  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;

      const weatherDescription = weatherData.weather[0].description;
      const icon =weatherData.weather[0].icon;
      const imageUrl ="http://openweathermap.org/img/wn/"+icon+"@2x.png";
      res.write("<p>The weather is currently "+ weatherDescription + "</p>");
      res.write("<h1>The temperature of "+query+" is " + temp + " degree celcius</h1>");
      res.write("<img src="+imageUrl+">");
      res.send();
    });
  });
});




app.listen(3000, function() {
  console.log("Server is running...");
});
