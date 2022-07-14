/////////////
/////////////
/////////////
function desktopDark() {
  imgMD.src = "./images/bg-desktop-dark.jpg";
  sun.src = "./images/icon-sun.svg";
  //   const currentView = "desktop dark"
  desktopModeSummary.style.display = "flex";
  summary.style.display = "none";
  clear.style.display = "none";
  setDarkColor();
}

/////////////
/////////////
/////////////
function mobileDark() {
  imgMD.src = "./images/bg-mobile-dark.jpg";
  sun.src = "./images/icon-sun.svg";

  desktopModeSummary.style.display = "none";
  summary.style.display = "flex";
  clear.style.display = "flex";
  setDarkColor();
}

/////////////
/////////////
/////////////
function mobileLight() {
  imgMD.src = "./images/bg-mobile-light.jpg";
  sun.src = "./images/icon-moon.svg";

  desktopModeSummary.style.display = "none";
  summary.style.display = "flex";
  clear.style.display = "flex";
  setLightColor();
}

/////////////
/////////////
/////////////
function desktopLight() {
  imgMD.src = "./images/bg-desktop-light.jpg";
  sun.src = "./images/icon-moon.svg";

  desktopModeSummary.style.display = "flex";
  summary.style.display = "none";
  clear.style.display = "none";
  setLightColor();
}

/////////////
/////////////
/////////////
function setDarkColor() {
  root.style.setProperty("--dark-blue", "hsl(235, 21%, 11%)");
  root.style.setProperty("--desaturated-blue", "hsl(235, 24%, 19%)");
  root.style.setProperty("--light-grayish-blue", "hsl(234, 39%, 85%)");
}

/////////////
/////////////
/////////////
function setLightColor() {
  root.style.setProperty("--dark-blue", "hsl(0, 0%, 98%)");
  root.style.setProperty("--desaturated-blue", "hsl(236, 33%, 92%)");
  root.style.setProperty("--light-grayish-blue", "hsl(0, 5%, 8%)");
}
