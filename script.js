//Creating head Element;
let imageTag=document.createElement("img");
imageTag.setAttribute("src","https://www.openbrewerydb.org/_app/immutable/assets/obdb-logo-sm-63b3b090.png");
imageTag.style.width="200px";
imageTag.style.marginLeft="-150px"
imageTag.style.padding="10px"

let heading = document.createElement("h1");
heading.innerHTML = `<P>Free and open-source <span style="color:  rgb(216, 197, 89);"> brewery data </span></p>`;
heading.style.textAlign = "center";
heading.style.marginTop = "-50px";

let heading1 = document.createElement("h5");
heading1.innerHTML = "Enter your brewery Id to search";
heading1.style.textAlign = "center";
heading1.style.marginTop = "10px";

//creating div Element which is having class:main1;
let div = document.createElement("div");
div.setAttribute("class", "main1");

//creating a formgroup div Element which is having class:form-group;
let formgroup = document.createElement("div");
formgroup.setAttribute("class", "form-group");

//creating input Element type:text which is having class:form-control,id:main and adding some styles to it;
let input = document.createElement("input");
input.setAttribute("type", "text");
input.setAttribute("class", "form-control");
input.setAttribute("id", "main");
input.setAttribute("placeholder", "Enter your brewery Id to search");
input.style.width = "520px";
input.style.padding = "10px";
input.style.marginTop = "20px";

let button = document.createElement("button");
button.setAttribute("type", "button");
button.classList.add("btn", "btn-primary");
button.innerHTML = "Search";
button.style.marginTop = "10px";
button.style.textAlign="center";
button.style.marginLeft="550px"
button.addEventListener("click", breweriesData);

let br = document.createElement("br");

let breweryName = document.createElement("div");
breweryName.setAttribute("id", "name");
let breweryType = document.createElement("div");
breweryType.setAttribute("id", "type");
let breweryAddress = document.createElement("div");
breweryAddress.setAttribute("id", "address");
let breweryWebsite = document.createElement("div");
breweryWebsite.setAttribute("id", "website");
let breweryPhoneNumber = document.createElement("div");
breweryPhoneNumber.setAttribute("id", "ph.no");

let breweryDataToDisplay=document.createElement("div");
breweryDataToDisplay.setAttribute("class","value")

breweryDataToDisplay.append(breweryName,
  breweryType,
  breweryAddress,
  breweryWebsite,
  breweryPhoneNumber,)

let container = document.createElement("div");
container.setAttribute("class", "container");

let row = document.createElement("div");
row.setAttribute("class", "row");

container.append(row);

async function displayBreweries() {
  let data = await fetch("https://api.openbrewerydb.org/breweries");
  let data1 = await data.json();
  console.log(data1);
  try {
    for (var i = 0; i < data1.length; i++) {
      console.log(data1[i].id)
      row.innerHTML += `<div class="col-md-4">
        <div class="card-deck">
        <div class="card" style="width=100px height=100px">
        
        <div class="card-header"><h4>Name :${data1[i].name}</h4></div>
        <div class="card-body">
   <h5 class="card-title">Brewery Type : ${data1[i].brewery_type}</h5>
   <h5 class="card-title"> Address : ${data1[i].city}, ${data1[i].state}, ${data1[i].country} - ${data1[i].postal_code}.</h5>
   <h5 class="card-title"> Website : ${data1[i].website_url}</h5>
   <h5 class="card-title"> Phone Number : ${data1[i].phone}</h5>
   </div>
        </div>
      </div>
  
        </div>`;
    }
  } catch (error) {
    console.log(error);
  }
}
displayBreweries();


let logInButton=document.createElement("button");
logInButton.setAttribute("class","loginButton");
logInButton.innerHTML="Log in"



formgroup.append(
  imageTag,
  logInButton,
  heading,
  heading1,
  input,
  button,
  br,
  breweryDataToDisplay,
  container
 
);

div.append(formgroup);
document.body.append(div);

async function breweriesData() {
  try {
    let breweriesId = document.getElementById("main").value;
    console.log(breweriesId);
    
      let res = await fetch(
        `https://api.openbrewerydb.org/breweries/${breweriesId}`
      );
      let res1 = await res.json();
      console.log(res1);
      console.log(res1.name); 
      breweryName.innerHTML = `Brewery Name : ${res1.name}`;
      breweryType.innerHTML = `Brewery Type : ${res1.brewery_type}`;
      breweryAddress.innerHTML = `Brewery Address : ${res1.city}, ${res1.state}, ${res1.country}, ${res1.postal_code}`;
      if(res1.website_url){
        breweryWebsite.innerHTML = `Website : ${res1.website_url}`;
       }else{ breweryWebsite.innerHTML = `Website : website is not available`;}
      
      if(res1.phone){breweryPhoneNumber.innerHTML = `Phone Number : ${res1.phone}`;
      }else{breweryPhoneNumber.innerHTML = `Phone Number : Phone Number is not Available`}
    }
    
    catch (error) {
    console.log(error);
    alert("Enter a valid Id");
  }
}
