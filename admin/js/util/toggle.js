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
