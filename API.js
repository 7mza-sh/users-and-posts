// الحصول على العناصر من صفحة ال HTML
let usersSection = document.getElementById("usersSection");
let postsSection = document.getElementById("postsSection");

// طريقة XMLHttpRequest
function XMLHttpAPIRequest () {
  
  // تعبئة المتصفح بالمستخدمين
  function getUsers () {
    let request = new XMLHttpRequest();
    request.open("GET", "https://jsonplaceholder.typicode.com/users");
    request.responseType = "json";
    request.send();
    request.onload = function () {
      if (request.status >= 200 && request.status < 300) {
        let users = request.response;
        for (let user of users) {
          let userDiv = document.createElement("div");
          userDiv.classList.add("user");
          userDiv.dataset.id = user.id;
          userDiv.innerHTML += `
          <div class="imgContainer userImgContainer">
          <img class="userProfile userSectionProfie" src="usersProfile.jpg">
          </div>
          <p class="userName">${user.name}</p>
          <p class="userEmail">${user.email}</p>`;
          usersSection.appendChild(userDiv);
          userDiv.addEventListener("click", getPosts);
        }
      }
      else {
        alert(`Error ${request.status}..!
  Please try again later.`);
      }
    }
  }
  getUsers();
  
  // تعبئة المتصفح بالبوستات
  function getPosts () {
    postsSection.innerHTML = "";
    let request = new XMLHttpRequest();
    request.open("GET", `https://jsonplaceholder.typicode.com/posts?userId=${this.dataset.id}`);
    request.responseType = "json";
    request.send();
    request.onload = function() {
      if (request.status >= 200 && request.status < 300) {
        let posts = request.response;
        for (let post of posts) {
          postsSection.innerHTML += `
          <div class="post">
          <div class="postTitleSection">
          <h4 class="postTitle">${post.title}</h4>
          <div class="imgContainer postImgContainer">
          <img class="userProfile postProfile" src="usersProfile.jpg">
          </div>
          </div>
          <p class="postBody">${post.body}</p>
        </div>`;
        }
      }
      else {
        alert(`Error ${request.status}..!
  Please try again later.`);
      }
    }
  }
}

// طريقة fetch
function fetches () {
  // دالة تعبئة الصفحة بالمستخدمين
  function getUsers () {
    fetch ("https://jsonplaceholder.typicode.com/users")
    .then (response => {
      if (response.ok) {
        return response.json();
      }
      else {
        throw response.status;
      }
    })
    .then (users => {
      for (let user of users) {
        let userDiv = document.createElement("div");
        userDiv.classList.add("user");
        userDiv.dataset.id = user.id;
        userDiv.innerHTML += `
        <div class="imgContainer userImgContainer">
        <img class="userProfile userSectionProfie" src="usersProfile.jpg">
        </div>
        <p class="userName">${user.name}</p>
        <p class="userEmail">${user.email}</p>`;
        usersSection.appendChild(userDiv);
        userDiv.addEventListener("click", getPosts);
      }
    }).catch(
      error => {
        alert(`Error: ${error}..!
Please try again later.`)
      }
    )
  }
  getUsers();
  
  // دالة تعبئة الصفحة بالبوستات
  function getPosts () {
    fetch (`https://jsonplaceholder.typicode.com/posts?userId=${this.dataset.id}`)
    .then (response => {
      if (response.ok) {
        return response.json();
      }
      else {
        throw response.status;
      }
    })
    .then (posts => {
      postsSection.innerHTML = '';
      for (let post of posts) {
        postsSection.innerHTML += `
        <div class="post">
        <div class="postTitleSection">
        <h4 class="postTitle">${post.title}</h4>
        <div class="imgContainer postImgContainer">
        <img class="userProfile postProfile" src="usersProfile.jpg">
        </div>
        </div>
        <p class="postBody">${post.body}</p>
        </div>`;
      }
    })
    .catch(
      error => {
        alert(`Error: ${error}..!
Please try again later.`)
      }
    )
  }
}

// الاستدعاء العشوائي
if (Math.floor(Math.random() * 2) === 0) {
  fetches();
}
else {
  XMLHttpAPIRequest();
}