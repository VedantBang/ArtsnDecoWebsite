// Check if user is logged in or not
fetch("http://artsndeco.herokuapp.com/user/verifytoken", {
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

// Adding name field in case of "Others" option in upload form
addNameField = () => {
  const fest = document.querySelector("#fest").value;

  if (fest === "other") {
    document.querySelector(".label-name-of-event").style.display = "inline";
    document.querySelector(".input-name-of-event").style.display = "inline";
  } else {
    document.querySelector(".label-name-of-event").style.display = "none";
    document.querySelector(".input-name-of-event").style.display = "none";
  }
};

document.getElementById("fest").addEventListener("click", addNameField);

// Deleteing fest from backend
document.getElementById("delete-fest-details").addEventListener("click", () => {
  const fest = document.querySelector("#fest").value;
  const name = document.querySelector("#name").value;
  const year = document.querySelector("#year").value;

  const formData = new FormData();

  formData.append("fest", fest);
  formData.append("name", name);
  formData.append("year", year);

  fetch("http://artsndeco.herokuapp.com/change/delete", {
    method: "DELETE",
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
        document.querySelector(".delete-fest-successful").style.display =
          "block";
      } else {
        document.querySelector("#error-delete-fest").innerHTML = res.error;
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

  fetch("http://artsndeco.herokuapp.com/user/login", {
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
