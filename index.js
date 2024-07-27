import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 4000;
const apiKey = "95dbe2c1";

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"));

app.get("/", (req,res)=>{
    res.render("index.ejs");  
})

app.post("/submit", async(req,res)=>{
    const n = req.body.mname;
    try {
        const resp = await axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&t=${n}`);
        const title = resp.data.Title;
        const year = resp.data.Year;
        const genre = resp.data.Genre.split(", ");
        const time = resp.data.Runtime;
        const cast = resp.data.Actors.split(", ");
        const plot = resp.data.Plot;
        const rating = resp.data.imdbRating;
        const image = resp.data.Poster;
        
        res.render("index.ejs",{title : title, year : year, genre : genre, time : time, cast: cast, plot : plot, rating : rating, image})
    } catch (error) {
        const err = "Movie not found";
        res.render("index.ejs",{msg : err});
    }
})


app.listen(port,()=>{
    console.log("Server runnng on http://localhost:"+port);
})