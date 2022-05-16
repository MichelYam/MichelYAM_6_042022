import getUserInfo from '../pages/photographer.js';

// const closeModal = document.getElementById('closeModal');
const modal = document.getElementById('contact-modal');

// eslint-disable-next-line import/prefer-default-export
async function displayModal() {
  modal.style.display = 'block';
  const name = document.getElementById('name');
  const userInfo = await getUserInfo();
  name.innerHTML = userInfo.name;
}

document.displayModal = displayModal;

const contactForm = document.getElementById('contactForm');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const message = document.getElementById('message');

// error value
const firstNameError = document.getElementById('first-error');
const lastNameError = document.getElementById('last-error');
const emailError = document.getElementById('email-error');
const messageError = document.getElementById('message-error');

// regex handle email model
// eslint-disable-next-line no-useless-escape
const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// regex for handle special characters
const regexName = /^[a-zA-Zéèà\s]+$/;

const isEmpty = (dataInput) => (!dataInput.value);
// show a message in case of error or succes
function showMessage(input, inputBorder, error, result) {
  // eslint-disable-next-line no-param-reassign
  input.innerText = error; // return the message in the html page
  input.classList.add('displayError');
  if (inputBorder !== false) {
    inputBorder.classList.add('border-red');
    inputBorder.classList.remove('border-green');
  }
  return result;
}

// call function shoMessage to diplay an error message
function showError(input, inputBorder, error) {
  return showMessage(input, inputBorder, error, false);
}
// call this function when all conditions return true ,
//  remove all error message and replace the border red to green
function sucess(input, inputBorder) {
  input.classList.remove('displayError');
  if (inputBorder !== false) {
    inputBorder.classList.replace('border-red', 'border-green');
  }
}
// check first name
const checkFirstName = () => {
  if (isEmpty(firstName)) {
    showError(firstNameError, firstName, 'Veuillez saisir votre prénom');
  } else if (firstName.value.length < 2) {
    showError(firstNameError, firstName, 'Veuillez entrer 2 caractères ou plus pour le champ du nom.');
  } else if (!firstName.value.match(regexName)) {
    showError(firstNameError, firstName, 'Veuillez utiliser des lettres');
  } else {
    sucess(firstNameError, firstName);
    return true;
  }
};

// check last name
const checkLastName = () => {
  if (isEmpty(lastName)) {
    showError(lastNameError, lastName, 'Veuillez entrez votre nom');
  } else if (!lastName.value.match(regexName)) {
    showError(lastNameError, lastName, 'Veuillez utiliser les lettres de l\'aphabet');
  } else if (lastName.value.length == 1) {
    showError(lastNameError, lastName, 'Veuillez entrer 2 caractères ou plus pour le champ du nom.');
  } else {
    sucess(lastNameError, lastName);
    return true;
  }
};
// check email
const checkEmail = () => {
  if (isEmpty(email)) {
    showError(emailError, email, 'Veuillez entrez votre adresse mail');
  } else if (!email.value.match(emailRegex)) {
    showError(emailError, email, 'email invalide');
  } else {
    sucess(emailError, email);
    return true;
  }
};
const checkMessage = () => {
  if (isEmpty(message)) {
    showError(messageError, message, 'Veuillez entrez votre message');
    return false;
  }
  sucess(messageError, message);
  return true;
};
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
const allInput = document.querySelectorAll('.input-control');
function resetForm() {
  // reset form element defaults
  contactForm.reset();
  // remove all border of inputs
  for (let i = 0; i < allInput.length; i++) {
    const input = allInput[i].querySelector('.inputContent');
    const error = allInput[i].querySelector('.error-message');
    input.classList.remove('border-red');
    input.classList.remove('border-green');
    error.classList.remove('displayError');
  }

  modal.style.display = 'none'; // remove modal
  contactForm.style.display = 'block'; // display form when user click
}
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // call all validation function
  const validFirstName = checkFirstName();
  const validLastName = checkLastName();
  const validEmail = checkEmail();
  const validMessage = checkMessage();

  /*
         after event form called,  call event listener if input change (value, select, checkbox)
        recall fonction to check instantly the new value
         */
  firstName.addEventListener('change', checkFirstName);
  lastName.addEventListener('change', checkLastName);
  email.addEventListener('change', checkEmail);
  message.addEventListener('change', checkMessage);
  // check if all validators return true // if true display succes message modal
  if (validFirstName && validLastName && validEmail && validMessage) {
    const dataForm = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      message: message.value,
    };
    console.log('informations: ', dataForm);
    modal.style.display = 'none';
    resetForm();
    return true;
  }
  console.log('failed');
  return false;
});

function closeModal() {
  modal.style.display = 'none';
  resetForm();
}

document.closeModal = closeModal;
