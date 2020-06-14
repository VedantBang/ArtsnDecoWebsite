// Check if user is logged in or not
fetch("https://artsndeco.netlify.app/user/verifytoken", {
  method: "GET",
  headers: {
    token: `${localStorage.getItem("token")}`,
  },
  mode: "cors",
})
  .then((res) => {
    return res.json();
  })
  .then((res) => {
    if (!res.ok) {
      window.location.href = "/login.html";
    }
  })
  .catch((err) => {
    console.log(err);
  });

// Adding name field in case of "Others" option in upload form and removing theme field
addNameField = () => {
  const fest = document.querySelector("#fest").value;

  if (fest === "other") {
    document.querySelector(".label-name-of-event").style.display = "inline";
    document.querySelector(".input-name-of-event").style.display = "inline";
    document.querySelector(".label-theme").style.display = "none";
    document.querySelector(".input-theme").style.display = "none";
  } else {
    document.querySelector(".label-name-of-event").style.display = "none";
    document.querySelector(".input-name-of-event").style.display = "none";
    document.querySelector(".label-theme").style.display = "inline";
    documentq.uerySelector(".input-theme").style.display = "inline";
  }
};

document.getElementById("fest").addEventListener("click", addNameField);

// Adding title and image name to Selected Images list
const displayImages = document.getElementById("display-images");
const formData = new FormData();
if (window.FileList && window.File) {
  document
    .getElementById("upload-image")
    .addEventListener("change", (event) => {
      displayImages.innerHTML += "";
      for (const file of event.target.files) {
        const li = document.createElement("li");
        const title = document.querySelector("#title").value;
        const name = file.name ? file.name : "NOT SUPPORTED";
        formData.append("photos", file);
        li.classList.add("list-group-item");
        li.textContent = `Image title: ${title}, Image name: ${name}`;
        displayImages.appendChild(li);
      }
    });
}

// Reseting add artwork form
document.getElementById("add-artwork").addEventListener("click", () => {
  document.querySelector("#add-artwork-form").reset();
  document.querySelector("#upload-artwork").style.display = "block";
});

// Uploading title and images to backend
document.getElementById("upload-artwork").addEventListener("click", (e) => {
  e.preventDefault();
  const fest = document.querySelector("#fest").value;
  const year = document.querySelector("#year").value;
  const name = document.querySelector("#name").value;
  const theme = document.querySelector("#theme").value;

  let li = document.getElementsByClassName("list-group-item");
  let title = "";
  for (let i = 0; i < li.length; i++) {
    title += li[i].innerHTML.split(",")[0].split(": ")[1] + ",";
  }
  const newTitle = title.slice(0, -1);
  console.log(newTitle);

  formData.append("fest", fest);
  formData.append("year", year);
  formData.append("name", name);
  formData.append("theme", theme);
  formData.append("titles", newTitle);

  fetch("https://artsndeco.netlify.app/change/new", {
    method: "POST",
    body: formData,
    headers: {
      token: `${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      if (res.ok) {
        document.querySelector(".upload-artwork").style.display = "block";
      } else {
        document.getElementById("error-uploads").innerHTML = res.error;
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

// Settings form
document.getElementById("settings-button").addEventListener("click", () => {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const formData = new FormData();

  formData.append("username", username);
  formData.append("password", password);

  fetch("https://artsndeco.netlify.app/user/login", {
    method: "POST",
    body: formData,
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      if (res.ok) {
        window.location.href = "/settings.html";
        document.querySelector("#error-message").style.display = "none";
      } else {
        document.querySelector("#error-message").style.display = "block";
      }
    })
    .catch((err) => {
      console.log(err);
      window.location.href = "/settings.html";
    });

  document.querySelector("#settings-form").reset();
});

// Logging out
document.getElementById("logout").addEventListener("click", () => {
  localStorage.removeItem("token");
});
