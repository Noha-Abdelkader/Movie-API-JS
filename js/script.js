//====== sidebar change data in display  ==========================================================================

let typeOfMovieArray = document.querySelectorAll("#extraSideBar .sideListCall");
let anchorOfMovies = [...typeOfMovieArray];

anchorOfMovies.forEach((anchor) => {
  anchor.addEventListener("click", typeOfMovie);
});
function typeOfMovie(e) {
  FetchApiMovies(e.target.name);
}

//============= FetchAPI function ================================================================
let finalResult;

async function FetchApiMovies(typeOfMovie) {
  let response = await fetch(`https://api.themoviedb.org/3/${typeOfMovie}`);
  let result = await response.json();
  finalResult = result.results;
  showMovies(finalResult);
}

FetchApiMovies(
  "movie/now_playing?api_key=99f8d07aa52bb74ca027bcd82345cf6b&language=en-US&page=1"
);

//=============== display function ==============================================================================

function showMovies(finalResult) {
  let temp = ``;
  if(finalResult){
    for (let i = 0; i < finalResult.length; i++) {
      temp += `
      <div class="col-sm-3 col-md-4 col-lg-3 text-center rounded-3 p-2">
      <div class="poster">
         <div>
           <img src='https://image.tmdb.org/t/p/w500${finalResult[i].poster_path}' class='w-100' id="poster_path" alt=""> 
         </div> 
        <div class='posterLayer rounded-3 p-3'>
        <h2 class='fs-4 fw-ligther mb-3'>${finalResult[i].title}</h2>
        <p class='fs-5 mb-3'>${finalResult[i].overview}</p>
        <p class='mb-3'> rate : ${finalResult[i].vote_average} </p>
        <p class='mb-3'>${finalResult[i].release_date}</p>
        </div>
  
      </div>
    </div> `;
    }
  }
  
  document.getElementById("movieData").innerHTML = temp;
}

// ============ search inputs all movies ====================================================================

$("#searchByLetter").keyup((e) => {
  let searchByWord = e.target.value;

  if(searchByWord){
    async function FetchApiMovies() {
      let response = await fetch(
        ` https://api.themoviedb.org/3/search/movie?api_key=99f8d07aa52bb74ca027bcd82345cf6b&query=${searchByWord}`
      );
      let result = await response.json();
      let finalResult = result.results;
      showMovies(finalResult);
    }
    FetchApiMovies();
  }
  else{
    FetchApiMovies(
      "movie/now_playing?api_key=99f8d07aa52bb74ca027bcd82345cf6b&language=en-US&page=1"
    );
    
  }
});

//===================== search inputs by word ==========================================================================================
$("#searchByWord").keyup(search);

function search(e) {
  let searchWord = e.target.value;
  let movieList = [];

  finalResult.map((movie) => {
    if (movie.title.includes(searchWord)) {
      movieList.push({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        vote_average: movie.vote_average,
        release_date: movie.release_date,
        overview: movie.overview,
      });
    }
  });
  showMovies(movieList);
}

//========== regex & validation functions  ================================================================

let inputName = document.getElementById("inputName");
let inputMail = document.getElementById("inputMail");
let inputPhone = document.getElementById("inputPhone");
let inputAge = document.getElementById("inputAge");
let inputPass = document.getElementById("inputPass");
let inputRepass = document.getElementById("inputRepass");
let submitBtn = document.getElementById("submitBtn");
let accountList;
// --------------------------------
accountList =
  localStorage.getItem("accountList") == null
    ? []
    : JSON.parse(localStorage.getItem("accountList"));
// --------------------------------

submitBtn.addEventListener("click", () => {

  let account = {
    accountName: inputName.value,
    mail: inputMail.value,
    phone: inputPhone.value,
    age: inputAge.value,
    pass: inputPass.value,
    repass: inputRepass.value,
  };

  if ( validateAll(inputName.value,inputMail.value,inputPhone.value,inputAge.value,inputPass.value,inputRepass.value) == true) {
    let warningMsg = document.getElementById("warningMsg");

    if(!isExist(inputName.value , inputMail.value)){
      accountList.push(account);
    localStorage.setItem("accountList", JSON.stringify(accountList));
    warningMsg.style.display = "none";
    }
  } else {
    warningMsg.style.display = "block";
  }
});

// ===== Validation functions ==========================================

function validateName(name) {
  let regex = /^[A-Za-z0-9]{1,}$/g;
  if (regex.test(name)) {
    return true;
  } else {
    return false;
  }
}
// ------------------------------
function validateEmail(mail) {
  let regex = /^([a-zA-Z]+)@([a-zA-Z]+)\.([a-zA-Z]{2,5})$/g;
  if (regex.test(mail)) {
    return true;
  } else {
    return false;
  }
}
// ------------------------------
function validatePass(pass) {
  let regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g;
  if (regex.test(pass)) {
    return true;
  } else {
    return false;
  }
}
// ------------------------------
function vaildateRepass(repass, userEnterPass) {
  if (repass == userEnterPass) {
    return true;
  } else {
    return false;
  }
}
// ------------------------------
function vaildatePhone(phone) {
  let regex = /^01[0-1-2-5]{1}[0-9]{8}$/g;
  if (regex.test(phone)) {
    return true;
  } else {
    return false;
  }
}
// ------------------------------
function vaildeAge(age) {
  let regex = /^([1-9][0-9]?|100)$/g;
  if (regex.test(age)) {
    return true;
  } else {
    return false;
  }
}

//---------- vaildate All function ---------------------------------------------
function validateAll(name, mail, phone, age, pass, repass) {
  validateName(name);
  validateEmail(mail);
  validatePass(pass);
  vaildatePhone(phone);
  vaildeAge(age);
  vaildateRepass(repass, userEnterPass);
  if (
    validateName(name) &&
    validateEmail(mail) &&
    validatePass(pass) &&
    vaildateRepass(repass, userEnterPass) &&
    vaildatePhone(phone) &&
    vaildeAge(age)
  ) {
    console.log("all valid");
    return true;
  } else {
    console.log("all in-valid");

    return false;
  }
}

// ---------- check vaildaition on input --------------------------------------------
inputName.onkeyup = (e) => {
  let nameMsg = document.getElementById("nameMsg");
  validateName(e.target.value)
    ? (nameMsg.style.cssText = "display:none;")
    : (nameMsg.style.cssText = "display : block;");
};
//----------------------------------------------------
inputMail.onkeyup = (e) => {
  let mailMsg = document.getElementById("mailMsg");
  validateEmail(e.target.value)
    ? (mailMsg.style.cssText = "display:none;")
    : (mailMsg.style.cssText = "display:block;");
};
// ----------------------------------------------------
let userEnterPass;
inputPass.onkeyup = (e) => {
  let passMsg = document.getElementById("passMsg");
  userEnterPass = e.target.value;
  validatePass(e.target.value)
    ? (passMsg.style.cssText = "display:none;")
    : (passMsg.style.cssText = "display:block;");
};

// ----------------------------------------------------
inputRepass.onkeyup = (e) => {
  let repassMsg = document.getElementById("repassMsg");
  vaildateRepass(e.target.value, userEnterPass)
    ? (repassMsg.style.cssText = "display:none;")
    : (repassMsg.style.cssText = "display:block;");
};

// ----------------------------------------------------
inputPhone.onkeyup = (e) => {
  let phoneMsg = document.getElementById("phoneMsg");
  vaildatePhone(e.target.value)
    ? (phoneMsg.style.cssText = "display:none;")
    : (phoneMsg.style.cssText = "display:block;");
};
// ----------------------------------------------------
inputAge.onkeyup = (e) => {
  let ageMsg = document.getElementById("ageMsg");
  vaildeAge(e.target.value)
    ? (ageMsg.style.cssText = "display:none;")
    : (ageMsg.style.cssText = "display:block;");
};

//======== Exist function =======================================
function isExist(name, mail) {
  for (let i = 0; i <accountList.length; i++) {
    if (
      accountList[i].accountName.toLowerCase() ==
        name.toLowerCase() ||
      accountList[i].mail.toLowerCase() == mail.toLowerCase()
    ) {
      return true;
    } else {
      return false;
    }
  }
}

//========= contact scroll ======================================================
$("#contactList").click(() => {
  let contactOffset = $("#contact").offset().top;
  $("html,body").animate({ scrollTop: contactOffset }, 100);
});

//======= sideBar animation function ===============================================================

let extraSideBarWidth = $("#extraSideBar").innerWidth();

$("#home #sideBar").css({ left: `-${extraSideBarWidth}px` });


$(".list1").animate({ opacity: "0", paddingTop: "50px" }, 900);
$(".list2").animate({ opacity: "0", paddingTop: "50px" }, 1000);
$(".list3").animate({ opacity: "0", paddingTop: "50px" }, 1100);
$(".list4").animate({ opacity: "0", paddingTop: "50px" }, 1200);
$(".list5").animate({ opacity: "0", paddingTop: "50px" }, 1300);
$(".list6").animate({ opacity: "0", paddingTop: "50px" }, 1500);

$("#sideIcon").click(() => {
  if ($("#home #sideBar").css("left") == `-${extraSideBarWidth}px`) {
    $("#home #sideBar").animate({ left: `0px` }, 500);
    $("#sideIcon").css({ display: "none" });
    $("#iconXmark").css({ display: "block" });
    $(".list1").animate({ opacity: "1", paddingTop: "5px" }, 900);
    $(".list2").animate({ opacity: "1", paddingTop: "5px" }, 1000);
    $(".list3").animate({ opacity: "1", paddingTop: "5px" }, 1100);
    $(".list4").animate({ opacity: "1", paddingTop: "5px" }, 1200);
    $(".list5").animate({ opacity: "1", paddingTop: "5px" }, 1300);
    $(".list6").animate({ opacity: "1", paddingTop: "5px" }, 1400);
  }
});

// =================================================

$("#iconXmark").click(() => {
  if ($("#home #sideBar").css("left") == "0px") {
    $("#home #sideBar").animate({ left: `-${extraSideBarWidth}px` }, 500);
    $("#sideIcon").css({ display: "block" });
    $("#iconXmark").css({ display: "none" });
    $(".list1").animate({ opacity: "0", paddingTop: "150px" }, 900);
    $(".list2").animate({ opacity: "0", paddingTop: "150px" }, 1000);
    $(".list3").animate({ opacity: "0", paddingTop: "150px" }, 1100);
    $(".list4").animate({ opacity: "0", paddingTop: "150px" }, 1200);
    $(".list5").animate({ opacity: "0", paddingTop: "150px" }, 1300);
    $(".list6").animate({ opacity: "0", paddingTop: "150px" }, 1500);
  }
});


// ====== window scroll  & upBtn Click ================================
let upBtn = document.getElementById('upBtn');

window.addEventListener('scroll' , changeUpBtn);

function changeUpBtn(){
if(window.scrollY > 150){
  upBtn.style.display='block';
}
else{
  upBtn.style.display='none';
}
}

upBtn.addEventListener('click' , function(){
$('html , body').animate({scrollTop:0} , 100)

})