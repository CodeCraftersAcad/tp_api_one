const thead = document.querySelector("thead"),
  tbody = document.querySelector("tbody"),
  body = document.querySelector("body"),
  table = document.querySelector(".table"),
  hoverNote = document.createElement("div"),
  nameInput = document.querySelector("#name-input");
function getUsers(url) {
  return fetch(url)
    .then(res => res.json())
    .then(data => {
      const users = data.results;
      thead.innerHTML += `
        <th scope="col"></th>
        <th scope="col" class="user-name">NAME</th>
        <th scope="col">EMAIL</th>
        <th scope="col">PHONE</th>
      `;
      users.map(user => {
        tbody.innerHTML += `
          <tr>
            <td><img class="img-fluid" src="${user.picture.thumbnail}"/></td>
            <td>${user.name.first} ${user.name.last}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
          </tr>  
        `
      })
      nameInput.addEventListener("keyup", (e) => {
        const filtered = users.filter(user => {
          tbody.innerHTML = ""
          return user.name.first.toLowerCase().includes(e.target.value.toLowerCase());
        })
        filtered.map(user => {
          tbody.innerHTML += `
          <tr>
            <td><img class="img-fluid" src="${user.picture.thumbnail}"/></td>
            <td>${user.name.first} ${user.name.last}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
          </tr>  
        `
        })
      })
      document.addEventListener("click", (e) => {
        tbody.innerHTML = "";
        if (e.target.innerText === "NAME") {
          const sorted = users.sort((a, b) => (a.name.first > b.name.first) ? 1 : -1);
          sorted.map(user => {
            tbody.innerHTML += `
              <tr>
              <td><img class="img-fluid" src="${user.picture.thumbnail}"/></td>
              <td>${user.name.first} ${user.name.last}</td>
              <td>${user.email}</td>
              <td>${user.phone}</td>
              </tr>  
              `
          })
        }
      })
    });
}
document.addEventListener("mouseover", (e) => {
  if (e.target.innerText === "NAME") {
    hoverNote.style.display = "block"
    hoverNote.classList.add("name-hover");
    hoverNote.classList.remove("name-offhover");
    hoverNote.style.top = `${e.clientY}px`;
    hoverNote.style.left = `${e.clientX}px`;
    hoverNote.innerHTML = `CLICK HERE TO SORT`;
    table.before(hoverNote);
    console.log("client x: ", e.clientX, "client y: ", e.clientY);
  }
})
document.addEventListener("mouseout", (e) => {
  hoverNote.classList.remove("name-hover");
  hoverNote.classList.add("name-offhover");
  hoverNote.style.display = "none"
})


getUsers("https://randomuser.me/api/?results=20&nat=us")
