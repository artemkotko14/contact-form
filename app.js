const requiredFields = document.querySelectorAll(".required-field");
const submitBtn = document.getElementById("submit-btn");
const messageSuccess = document.getElementById("message-success");
const form = document.querySelector(".form-group");
const queryError = document.getElementById("query-error");
const radios = document.querySelectorAll(".radio");
const emailError = document.getElementById("email-error");
const emailInput = document.getElementById("email");
const errorMessages = document.querySelectorAll(".error-message");
const consentInput = document.getElementById("consent");

const validateField = (input) => {
  const errorMessage = input
    .closest(".field-container")
    .querySelector(".error-message");
  if (!input.validity.valid) {
    errorMessage.style.display = "block";
    input.style.borderColor = "red";
    input.setAttribute("aria-invalid", "true");
  } else {
    errorMessage.style.display = "none";
    input.style.borderColor = "hsl(186, 15%, 59%)";
    input.setAttribute("aria-invalid", "false");
  }
};

requiredFields.forEach((input) => {
  input.addEventListener("blur", () => validateField(input));
  input.addEventListener("change", () => validateField(input));
});

radios.forEach((radio) => {
  radio.addEventListener("blur", checkRadios);
  radio.addEventListener("change", checkRadios);
});
function selectedRadioRemove() {
  radios.forEach((radio) => {
    radio
      .closest(".radio-container")
      .closest(".radio-input")
      .classList.remove("selected-radio");
  });
}
function checkRadios() {
  selectedRadioRemove();
  const isChecked = document.querySelector('input[name="qt"]:checked') !== null;
  if (isChecked) {
    queryError.style.display = "none";
    const checkedRadio = document.querySelector('input[name="qt"]:checked');
    const radioInput = checkedRadio
      .closest(".radio-container")
      .closest(".radio-input");
    radioInput.classList.add("selected-radio");
    console.log(radioInput);
  } else {
    queryError.style.display = "block";
  }
}
function checkAllInputs() {
  checkRadios();
  requiredFields.forEach((input) => {
    validateField(input);
  });
  checkEmail();
  const firstVisibleError = [...errorMessages].find(
    (error) => error.style.display === "block",
  );
  if (firstVisibleError) {
    const errorContainer = firstVisibleError.parentElement;
    const fieldError = errorContainer.querySelector("input, textarea");
    fieldError.focus();
  }
}
form.addEventListener("submit", (event) => {
  event.preventDefault();
  checkAllInputs();
  let isValid = true;
  for (let i = 0; i < errorMessages.length; i++) {
    if (errorMessages[i].style.display === "block") {
      isValid = false;
    }
  }
  if (isValid) {
    clearFormFields();
    messageSuccess.classList.remove("hidden");
    messageSuccess.setAttribute("aria-hidden", "false");
    messageSuccess.focus();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setTimeout(() => {
      messageSuccess.classList.add("hidden");
      messageSuccess.setAttribute("aria-hidden", "true");
    }, 8000);
  }
});

function clearFormFields() {
  requiredFields.forEach((field) => {
    field.value = "";
  });
  radios.forEach((radio) => {
    radio.checked = false;
  });
  consentInput.checked = false;
  selectedRadioRemove();
}
emailInput.addEventListener("blur", checkEmail);
function checkEmail() {
  const chromeEmailRegex =
    /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i;
  const validEmail = chromeEmailRegex.test(emailInput.value);
  if (emailInput.validity.valid) {
    if (validEmail) {
      emailError.style.display = "none";
      emailInput.style.borderColor = "hsl(186, 15%, 59%)";
    } else {
      emailError.style.display = "block";
      emailInput.style.borderColor = "red";
    }
  }
}
