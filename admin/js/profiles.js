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
