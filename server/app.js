const path = require('path')
const express = require('express')
const name="sultan alyahya"
const app = express()
const hbs = require("hbs")
const spot = require("../utils/spot")
const weather = require("../utils/getWeather")
const port = process.env.PORT || 3000 

const directoryPath= path.join(__dirname, "../public")
//console.log(directoryPath)
const partialsPath = path.join(__dirname, "../hbs/partials")

hbs.registerPartials(partialsPath)


app.set('view engine', 'hbs') 
app.set("views", "hbs/views")
app.use(express.static(directoryPath))


app.get('', (req, res)=>{
    return res.render('index', {
        title:"Home Page",
        name,
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title:"help Page",
        name,
    })
})

app.get('/about', (req, res)=>{
    res.render("about", {
        name,
        title:"about",
        imgPath:"https://cdn3.iconfinder.com/data/icons/rcons-user-action/32/boy-512.png"
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.adress){
        res.send("please provaid an adress")
    }else{
        spot(req.query.adress, (error,adress)=>{
            if(error){
                return res.send({ 
                    error:error,
                })
            }
            //console.log("long "+long, "lat"+lat)
            weather(adress.long, adress.lat, (error, data)=>{
                if(!error){
                res.send({
                    forecast:data,
                    location:req.query.adress
                })
            }else{
                console.log(error)
            }
            })
        
        })
    }
    
})

app.get("/help/*", (req,res)=>{
    res.render("pageNotFound",{
        pageName:"help page",
        name,
    })
})

app.get("/*", (req,res)=>{
    console.log("in 404")
    res.render("pageNotFound",{
        pageName:"page",
        name,
    })
})

app.listen(port,()=>{
    console.log("the server starts in port "+port)
})
