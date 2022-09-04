import { v4 as uuidv4 } from "https://jspm.dev/uuid";

const form = document.querySelector("form");
const channels = document.querySelector(".channels");
const ul = document.querySelector(".todos");

let formValues = {};

let state = {
  selectedChannel: "",
  selectedCategory: "",
  todos: [],
};

function handleSubmit(e) {
  e.preventDefault();
  state.todos.push({ ...formValues, id: uuidv4() });
  console.log(state.todos);
  showUI();
}

function getFormValues(e) {
  formValues = { ...formValues, [e.target.name]: e.target.value };
}

function showUI() {
  if (state.todos.length) {
    let str = state.todos.reduce((acc, curr) => {
      return (
        acc +
        `
                <li>${curr.title}<span>${curr.category}</span><span>${curr.channel}</span></li>
                `
      );
    }, "");

    ul.innerHTML = str;
  } else {
    ul.innerHTML = "";
  }
}

function sortTodos(channel) {
  console.log(channel);
}

function selectChannels(e) {
  let { selectedChannel } = state;
  selectedChannel = e.target.textContent;
  sortTodos(selectedChannel);
}

// Add EventListiners
form.addEventListener("submit", handleSubmit);
form.addEventListener("change", getFormValues);
channels.addEventListener("click", selectChannels);
