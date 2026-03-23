const popup = document.getElementById("devPopup");
const closeBtn = document.getElementById("closePopup");

if (!localStorage.getItem("devWarningShown")) {
  popup.style.display = "block";
}

closeBtn.addEventListener("click", () => {
  popup.style.display = "none";
  localStorage.setItem("devWarningShown", "true");
});