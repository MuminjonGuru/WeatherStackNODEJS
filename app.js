const express = require("express")
const axios = require("axios")
const app = express()
const port = 1998

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/img', express.static(__dirname + 'public/img'))  // for images
app.use('/js', express.static(__dirname + 'public/js'))

app.set('views', './src/views')
app.set('view engine', 'ejs')

app.get('/api/:version', function(req, res) {
  res.send(req.params.version);
});

app.get("/current/:location", async function(req, res) {
  try {
    const API_ACC_KEY = "1ec3dade5a2d89dc10a6aecd5b84d0b5";

    const weather = await axios.get(
      `http://api.weatherstack.com/current?access_key=${API_ACC_KEY}&query=${req.params.location}`    
    );

    // console.log(weather.data.current);

    res.render("weatherstack", { info: weather.data });
      
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log("Error Message: ", error.message);
    }
  }
});

app.get('/', (req, res) => res.send('Index Page'))

app.listen(port, () => console.log(`Running on ${port} port`))