/* NERD SELF REGISTRATION PORTAL
   Main workflow:
   Landing → Login → Registration → Payment → Project Upload → Clearance → Print

   Platform support payment: ₦4,500
*/

const PLATFORM_SUPPORT_FEE = 4500;

const state = {
  currentView: "landing",
  registrationStep: 1,
  paymentPaid: false,
  projectUploaded: false,
  clearanceReady: false,
  student: JSON.parse(localStorage.getItem("nerd_student") || "null"),
  project: JSON.parse(localStorage.getItem("nerd_project") || "null")
};


/* =========================================================
   BASIC VIEW CONTROL
   ========================================================= */

function showView(id) {
  document.querySelectorAll(".view").forEach(view => {
    view.classList.remove("active");
  });

  const target = document.getElementById(id);

  if (target) {
    target.classList.add("active");
    state.currentView = id;
    window.scrollTo(0, 0);
  }
}


/* =========================================================
   LANDING PAGE
   ========================================================= */

function startRegistration() {
  showView("login");
}

function openLogin() {
  showView("login");
}


/* =========================================================
   LOGIN
   ========================================================= */

function togglePassword(inputId, button) {
  const input = document.getElementById(inputId);

  if (!input) return;

  if (input.type === "password") {
    input.type = "text";
    button.textContent = "◉";
  } else {
    input.type = "password";
    button.textContent = "◌";
  }
}

function loginStudent(event) {
  if (event) event.preventDefault();

  const emailInput = document.getElementById("loginEmail");
  const passwordInput = document.getElementById("loginPassword");

  const email = emailInput ? emailInput.value.trim() : "";
  const password = passwordInput ? passwordInput.value.trim() : "";

  if (!email || !password) {
    alert("Please enter your email and password.");
    return;
  }

  const savedStudent =
    JSON.parse(localStorage.getItem("nerd_student") || "null");

  if (
    savedStudent &&
    savedStudent.email &&
    savedStudent.email.toLowerCase() === email.toLowerCase()
  ) {
    state.student = savedStudent;

    if (
      savedStudent.platformPayment &&
      savedStudent.platformPayment.status === "paid"
    ) {
      state.paymentPaid = true;
    }

    if (
      savedStudent.projectUpload &&
      savedStudent.projectUpload.status === "uploaded"
    ) {
      state.projectUploaded = true;
    }

    if (
      savedStudent.clearance &&
      savedStudent.clearance.status === "ready"
    ) {
      state.clearanceReady = true;
    }

    updateDashboard();

    showView("studentDashboard");
    return;
  }

  alert(
    "No registration record was found for this email. Please complete registration first."
  );
}


/* =========================================================
   REGISTRATION
   ========================================================= */

function beginRegistration() {
  state.registrationStep = 1;
  showRegistrationStep(1);
  showView("registration");
}

function showRegistrationStep(step) {
  state.registrationStep = step;

  document.querySelectorAll(".registration-step").forEach(panel => {
    panel.classList.add("hidden");
  });

  const panel =
    document.getElementById("registrationStep" + step);

  if (panel) {
    panel.classList.remove("hidden");
  }

  document.querySelectorAll(".step").forEach((item, index) => {
    item.classList.toggle
