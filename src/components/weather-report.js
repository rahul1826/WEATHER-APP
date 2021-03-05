const request=require("request")
const report=(latitude,longitude,callback)=>{
    const url="http://api.weatherstack.com/current?access_key=799c0429fd32f4c72965e7250c28dc32&query="+latitude+","+longitude
request({url :url,json:true},(error,response)=>{
    if(error){
        callback("check your intenet connection",undefined)
    }
    else if(response.body.error){
        callback("please give us a location",undefined)
    }
    else{
         callback(undefined, "Its " + response.body.current.weather_descriptions[0] +" today.And temperature is about "+ response.body.current.temperature + " degree C")
    }
})
}
module.exports=report