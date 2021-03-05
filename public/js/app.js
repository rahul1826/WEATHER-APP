const weatherForm=document.querySelector("form")
const inputText=document.querySelector("input")
const message1=document.querySelector("#m1")
const message2=document.querySelector("#m2")
weatherForm.addEventListener("submit",(e)=>{
    e.preventDefault()
    const location=inputText.value
    message2.textContent=""
    message1.textContent="Loading..."
    fetch("/weather?location="+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            message1.textContent=data.error
        }
        else{
            message1.textContent=data.address
            message2.textContent=data.forecast
        }
    })
})
})