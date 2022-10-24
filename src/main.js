function validateAllAllInputs() {
  const allInputs = document.querySelectorAll("input");
  const checkbox = document.querySelector("input[type=checkbox]");

  for (const input of allInputs) {
    if (input.value == "") {
      return false;
    }
  }
  if (!checkbox.checked) {
    return false;
  }
}

async function fetchCepInfos(cep) {
  const url = `https://viacep.com.br/ws/${cep}/json/`;

  const streetInput = document.querySelector("input[name=street]");
  const neighborhoodInput = document.querySelector("input[name=neighborhood]");
  const cityInput = document.querySelector("input[name=city]");
  const stateInput = document.querySelector("input[name=state]");

  await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      streetInput.value = data.logradouro;
      neighborhoodInput.value = data.bairro;
      cityInput.value = data.localidade;
      stateInput.value = data.uf;
    });
}

// Máscaras dos inputs

const CPFInput = document.querySelector("input[name=cpf]");

CPFInput.addEventListener("keypress", () => {
  const inputLength = CPFInput.value.length;

  if (inputLength === 3 || inputLength === 7) {
    CPFInput.value += ".";
  } else if (inputLength === 11) {
    CPFInput.value += "-";
  }
});

const CEPInput = document.querySelector("input[name=cep]");

CEPInput.addEventListener("keypress", () => {
  const inputLength = CEPInput.value.length;

  if (inputLength === 5) {
    CEPInput.value += "-";
  }
});

CEPInput.addEventListener("keydown", () => {
  const inputLength = CEPInput.value.length;

  if (inputLength === 9) {
    fetchCepInfos(CEPInput.value);
  }
});

const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
});
