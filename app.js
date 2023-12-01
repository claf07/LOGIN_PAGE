var email = document.getElementById("mail"),
password = document.getElementById("pass"),
isaddressentered = false,
iscountrychoosed = false,
isemailentered = false,
isgenderchecked = false,
isnameentered = false,
isnumberValid = false,
isskillsselected = false;

window.onload = function () {
  var isAuthenticated = localStorage.getItem("isAuthenticated");
  var requestUrl = window.location.pathname;
  var requestFileName = requestUrl.substring(requestUrl.lastIndexOf('/')+1);
  console.log("call load",requestFileName);
  if(requestFileName == "list.html" && isAuthenticated == "false") {
    window.location.href = "index.html"; 
  } else if (requestFileName != "list.html" && isAuthenticated == "true") {
    window.location.href = "list.html"; 
  }
  
  addinput();
  };

function setinnerHTML(error_id, error_msg) 
{
  document.getElementById(error_id).innerHTML = error_msg;
}
function passwordtoggle() {
  const eye = document.querySelector(".eye1");
  var password=document.getElementById("pass");
  if (password.type === "password") {
    password.type = "text";
    eye.classList.add("fa-eye");
    eye.classList.remove("fa-eye-slash");
  } else {
    password.type = "password";
    eye.classList.add("fa-eye-slash");
    eye.classList.remove("fa-eye");
  }
};
function error(){
  var passwordvalue=document.getElementById("pass").value;
  var password = document.getElementById("pass");
  var email=document.getElementById("mail");
  checkemail(email);
  if (passwordvalue.length === 0) {
    setinnerHTML("passerror", "*Please enter your password");
    password.classList.add("error_input");
  } else if (passwordvalue.length > 13 || passwordvalue.length < 8) {
    setinnerHTML("passerror", "*Password length must be between 8 to 13 ");
    password.classList.add("error_input");
  } else {
    setinnerHTML("passerror", "");
    password.classList.remove("error_input");
  }
  login();
};
function checkemail(email){
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validemail = emailRegex.test(email.value.trim());
  if (email.value.trim() === "") {
    email.classList.add("error_input");
    setinnerHTML("emailerror", "*Please enter your email!");
  } else if (!validemail) {
    email.classList.add("error_input");
    setinnerHTML("emailerror", "*Please enter valid email!");
  } else {
    email.classList.remove("error_input");
    setinnerHTML("emailerror", "");
    isemailentered = true;
  }
 
};
function validate(){
  const name = document.getElementById("name");
  const phone = document.getElementById("phone");
  const address = document.getElementById("address");
  const male = document.getElementById("male");
  const female = document.getElementById("female");
  const skills = document.getElementsByName("skills");
  const country = document.getElementById("country").value;
  const phonevalue=document.getElementById("phone").value;
  var email=document.getElementById("mail");
  if (name.value.trim() === "") {
    name.classList.add("error_input");
    setinnerHTML("error", "*Please enter your name!");
  } else {
    name.classList.remove("error_input");
    setinnerHTML("error", "");
    isnameentered = true;
  }
  checkemail(email);
  if (phonevalue.length === 0 || phonevalue.length !== 10) {
    phone.classList.add("error_input");
    setinnerHTML("noerror", "*Please enter your mobile number!");
  } else {
    phone.classList.remove("error_input");
    setinnerHTML("noerror", "");
    isnumberValid = true;
  }

  if (address.value.trim() === "") {
    address.classList.add("error_input");
    setinnerHTML("addresserror", "*Please enter your address!");
  } else {
    address.classList.remove("error_input");
    setinnerHTML("addresserror", "");
    isaddressentered = true;
  }

  if (female.checked === false && male.checked === false) {
    setinnerHTML("gendererror", "*Please select your gender!");
  } else {
    setinnerHTML("gendererror", "");
    isgenderchecked = true;
  }

  for (var i = 0; i < skills.length; i++) {
    if (skills[i].checked) {
      setinnerHTML("skillserror", "");
      isskillsselected = true;
      break;
    }
    else{
      setinnerHTML("skillserror", "*Please select atleast one skill!");
    }
  }

  if (country === "India" || country === "US") {
    setinnerHTML("countryerror", "");
    iscountrychoosed = true;
  } else {
    setinnerHTML("countryerror", "*Please select your country!");
  }
  storeinput();
  if (isaddressentered &&iscountrychoosed &&isemailentered &&isgenderchecked &&isnameentered &&isskillsselected &&isnumberValid) {
   window.location='list.html';
   localStorage.setItem("isAuthenticated","true");
  }
  
};
function login() {
  var email = document.getElementById("mail");
  var password = document.getElementById("pass");
  const loginUsers = [
    { email: "arunarun@gmail.com", password: "arun@1278" },
    { email: "anuanu@gmail.com", password: "anu@34rr" },
    { email: "arjun@gmail.com", password: "arju@00tt" },
    { email: "Bril098@gmail.com", password: "briltyui" },
    { email: "sherindrinitta@gmail.com", password: "sherinsher" },
    { email: "Jeshnajesh@gmail.com", password: "jeshjeshi" },
    { email: "Jerlijegan@gmail.com", password: "Jegan@07_" },
    { email: "kugankugan@gmail.com", password: "kugan@97_" },
    { email: "sushsush@gmail.com", password: "Susmitha@#4" },
    { email: "debydeby@gmail.com", password: "Deby@7810" },
  ];
  var isAuthenticated = false;
  for (var i = 0; i < loginUsers.length; i++) {
    if (
      loginUsers[i].email === email.value &&
      loginUsers[i].password === password.value
    ) {
      isAuthenticated = true;
      localStorage.setItem("isAuthenticated", true);
      break;
    }
  }
  if (isAuthenticated) {
    window.location.href = "list.html";
    localStorage.setItem("isAuthenticated", true);
  } else {
    setinnerHTML("errormsg", "Invalid email or password!");
  }
}
function logout() {
  localStorage.setItem("isAuthenticated",false);
  window.location = "index.html";
};

function Enterkey(event, input) {
  var input = document.getElementById(input);
  if (event.key === "Enter") {
    input.focus();
  }}
function Submitkey(event) {
  var submit = document.getElementById("login");
  if (event.key === "Enter") {
    submit.click();
  }
}
let input=[];
function storeinput(){
  const namevalue = document.getElementById("name").value;
  const addressvalue = document.getElementById("address").value;
  const male = document.getElementById("male");
  const female = document.getElementById("female");
  const country = document.getElementById("country").value;
  const phonevalue=document.getElementById("phone").value;
  const emailvalue=document.getElementById("mail").value;
  if(namevalue.trim()!==""&&addressvalue.trim()!==""&&emailvalue.trim()!==""&&phonevalue.trim()!==""&&(male.checked||female.checked)&&(country==="India"||country==="US")){
    var userinput={
      Name:namevalue,
      Email:emailvalue,
      Phone:phonevalue,
      Address:addressvalue,
      Country:country
    }
    let storeddata=localStorage.getItem('input');
    input=storeddata?JSON.parse(storeddata):[];
    input.push(userinput);
    localStorage.setItem('input',JSON.stringify(input));
    console.log(input);
    window.location="list.html";
  }
  
}
function addinput() {
 
  let fetcheddata= localStorage.getItem('input');
  let input2=fetcheddata?JSON.parse(fetcheddata):[];
  const table = document.getElementById("table1");
 
  input2.forEach(input=> {
  const row = table.insertRow();
  const namerow = row.insertCell();
  const emailrow = row.insertCell();
  const phonerow = row.insertCell();
  const addressrow = row.insertCell();
  const countryrow = row.insertCell();
  const actionrow=row.insertCell();
  namerow.textContent =input.Name;
  emailrow.textContent = input.Email;
  phonerow.textContent =input.Phone;
  addressrow.textContent = input.Address;
  countryrow.textContent = input.Country;
  const deleteIcon = document.createElement("span");
  deleteIcon.classList.add("fa-trash"); 
  deleteIcon.addEventListener("click", () => deleteRow(index)); 
  actionrow.add(deleteIcon);
});}
 
 function clearinput(){
  let fetcheddata= JSON.parse(localStorage.getItem('input'))||[];
  console.log(fetcheddata);
  if(fetcheddata.length>0){
    fetcheddata.pop();
  }
  fetcheddata=localStorage.getItem('input',JSON.stringify("input"));
  const table = document.getElementById("table1");
  var tablelength=table.rows.length;
  for(var i=tablelength-1;i>0;i--){
    table.deleteRow(i);
    localStorage.removeItem('input');
  }
  
 };

