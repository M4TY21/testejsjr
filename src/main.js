function toggleModal() {
  const modal = document.querySelector("#modal-window");
  const fade = document.querySelector("#modal-fade");

  modal.classList.toggle("hide");
  fade.classList.toggle("hide");
}

function initModalConfig() {
  const closeModal = document.querySelector(".modal-close");
  const fade = document.querySelector("#modal-fade");

  [closeModal, fade].forEach((element) => {
    element.addEventListener("click", () => toggleModal());
  });
}

function addModalInfos() {
  const allInputs = document.querySelectorAll("input:not([type=checkbox])");
  const modalBody = document.querySelector(".modal-body");

  while (modalBody.firstChild) {
    modalBody.removeChild(modalBody.firstChild);
  }

  allInputs.forEach((element) => {
    const content = document.createElement("p");
    content.innerHTML = `${element.name}: ${element.value}`;
    modalBody.appendChild(content);
  });
}

function validateAllInputs() {
  const cpf = document.querySelector("input[name=CPF]");
  const date = document.querySelector("input[name=Aniversario]");
  const cep = document.querySelector("input[name=CEP]");

  const cpfRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
  const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
  const cepRegex = /^\d{5}\-\d{3}$/;

  if (cpf.value.length !== 14) {
    return false;
  } else if (cpfRegex.exec(cpf.value) == null) {
    return false;
  } else if (date.value.length !== 10) {
    return false;
  } else if (dateRegex.exec(date.value) == null) {
    return false;
  } else if (cep.value.length !== 9) {
    return false;
  } else if (cepRegex.exec(cep.value) == null) {
    return false;
  } else {
    return true;
  }
}

async function fetchCepInfos(cep) {
  const url = `https://viacep.com.br/ws/${cep}/json/`;

  const streetInput = document.querySelector("input[name=Rua]");
  const neighborhoodInput = document.querySelector("input[name=Bairro]");
  const cityInput = document.querySelector("input[name=Cidade]");
  const stateInput = document.querySelector("input[name=Estado]");

  await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      streetInput.value = data.logradouro;
      neighborhoodInput.value = data.bairro;
      cityInput.value = data.localidade;
      stateInput.value = data.uf;
    });
}

initModalConfig();

// Máscaras dos inputs

const CPFInput = document.querySelector("input[name=CPF]");

CPFInput.addEventListener("keypress", () => {
  const inputLength = CPFInput.value.length;

  if (inputLength === 3 || inputLength === 7) {
    CPFInput.value += ".";
  } else if (inputLength === 11) {
    CPFInput.value += "-";
  }
});

const CEPInput = document.querySelector("input[name=CEP]");

CEPInput.addEventListener("keypress", () => {
  const inputLength = CEPInput.value.length;

  if (inputLength === 5) {
    CEPInput.value += "-";
  }
});

CEPInput.addEventListener("keyup", () => {
  const inputLength = CEPInput.value.length;

  if (inputLength === 9) {
    fetchCepInfos(CEPInput.value);
  }
});

const dateInput = document.querySelector("input[name=Aniversario]");

dateInput.addEventListener("keypress", () => {
  const inputLength = dateInput.value.length;

  if (inputLength === 2 || inputLength === 5) {
    dateInput.value += "/";
  }
});

// ------------------------------------ //

const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (validateAllInputs()) {
    addModalInfos();
    toggleModal();
  } else {
    console.log("djsa");
  }
});
