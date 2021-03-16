const geocode=require("./components/Geocode.js")
const report=require("./components/weather-report.js")
const path=require("path")
const express=require("express")
const hbs=require("hbs")
const app=express()
const port=process.env.PORT || 3000
pathToPublic=path.join(__dirname,"../public")
pathToViews=path.join(__dirname,"../template/views")
pathToPartials=path.join(__dirname,"../template/partials")

app.use(express.static(pathToPublic))

app.set("view engine","hbs")
app.set("views",pathToViews)

hbs.registerPartials(pathToPartials)
const today=new Date()
const day=today.getDate()
const month=today.toLocaleString('default', { month: 'long' })
app.get("",(req,res)=>{
    res.render("index",{
        title:"Weather",
        name:"Rahul",
        date:"DATE :"+ day +","+ month
    })
})
/*app.get("/help",(req,res)=>{
    res.render("help",{
        title:"hELP",
        helpText:"this is a help page",
        name:"Rahul"
    })
})
app.get("/help/*",(req,res)=>{
    res.render("404",{
        name:"Rahul",
        title:"404",
        text:"this help article not found"
    })
})
app.get("/about",(req,res)=>{
    res.render("about",{
        name:"Rahul",
        title:"ABOUT",
        about:"this is about page"
    })
})*/
app.get("/weather",(req,res)=>{
    if(!req.query.location)
    {
        return res.send({
            "error":"no location given to search"
        })
    }
    geocode(req.query.location,(error,data)=>{
        if(error){
            return res.send({
                error
            })
        }
        else{
            report(data.latitude,data.longitude,(error,forecastData)=>{
                if(error){
                    return res.send({
                        error
                    })
                }
                else{
                    res.send({
                        location :req.query.location,
                        forecast: forecastData,
                        address:data.location
                    })
                }
            })
        }
    })
})
app.get("*",(req,res)=>{
    res.render("404",{
        name:"Rahul",
        title:"404",
        text:"this page not found"
    })
})
app.listen(port,()=>{
    console.log("sever on port" + port)
})