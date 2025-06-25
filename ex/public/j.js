
const language=document.querySelector("#lang")
const btn=document.querySelector("#btn")
const categ=document.querySelector("#categories")
const jokecontainer=document.querySelector("#joke-container")

btn.addEventListener("click",()=>{
    jokecontainer.innerHTML="";
    console.log(language.value)
    const selectedcategory=Array.from(document.querySelectorAll("#categories input[type='checkbox']:checked")).
    map((checkbox)=>checkbox.value)
    console.log(selectedcategory)
    const url=`https://v2.jokeapi.dev/joke/${selectedcategory.join(",")}`
    fetch(url).then((response)=>{
        if(!response.ok)
        {
            throw new Error(response.text)
        }
        return response.json();

    }).then((data)=>{
        console.log(data)
        const p=document.createElement("p");
        
        if(data.type==="twopart")
        {
            const p2=document.createElement("p");
            p.textContent=data.setup;
            p2.textContent=data.delivery;
            
            jokecontainer.appendChild(p);
           jokecontainer.appendChild(p2);
            
        }else if(data.type==="single"){
           
          
            p.textContent=data.joke;
            jokecontainer.appendChild(p);
         
            
        }
       
        
       console.log(data.joke)
       console.log(data)
    }).catch((error)=>{
        console.log(error)
    })

      
})