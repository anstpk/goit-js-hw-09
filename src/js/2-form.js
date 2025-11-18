function saveToLS (key, value) {
  const zip = JSON.stringify(value);
  localStorage.setItem(key, zip);
}

function loadFromLS(key) {
  const zip = localStorage.getItem(key);

  try {
    const value = JSON.parse(zip);
    return value;
  } catch {
    return zip; 
  }
}

const form = document.querySelector('.feedback-form')

const formData = {
  email: "", 
  message: ""
}

const STORAGE_KEY = 'feedback-form-state';

form.addEventListener('input', (evt) => {
  console.log("input");
  
  if (evt.target === form.elements.email) {
    formData.email = evt.target.value;
  } else if (evt.target === form.elements.message) {
    formData.message = evt.target.value;
  } 

  saveToLS (STORAGE_KEY, formData);
});

document.addEventListener('DOMContentLoaded', () => {
  const savedData = loadFromLS(STORAGE_KEY);

  if (savedData) {
    formData.email = savedData.email;
    formData.message = savedData.message;
  } 

  form.elements.email.value = formData.email;
  form.elements.message.value = formData.message;

});

form.addEventListener('submit', e => {
  e.preventDefault();

  if (formData.email === '' || formData.message === '') {
    alert (`Fill please all fields`);
    return;
  }

  console.log(formData);

  localStorage.removeItem(STORAGE_KEY);
  
  form.elements.email.value = '';
  form.elements.message.value = '';

  formData.email = '';
  formData.message = '';
})