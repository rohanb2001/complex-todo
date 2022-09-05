import { v4 as uuidv4 } from "https://jspm.dev/uuid";

const form = document.querySelector("form");
const channels = document.querySelector(".channels");
const categories = document.querySelector(".lists");
const ul = document.querySelector(".todos");

let formValues = {};

let state = {
  channelActive: false,
  categoryActive: false,
  selectedChannel: "",
  selectedCategory: "",
  todos: [],
};

// Functions

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
  let filteredArr = filterChannelAndCategories();

  let str = filteredArr.reduce((acc, curr) => {
    return (
      acc +
      `
                <li>${curr.title}<span>${curr.category}</span><span>${curr.channel}</span></li>
                `
    );
  }, "");

  ul.innerHTML = str;
}

function filterChannelAndCategories() {
  if (state.selectedChannel === "" && state.selectedCategory === "") {
    console.log(1);
    return state.todos;
  }

  if (state.selectedChannel !== "" && state.selectedCategory !== "") {
    let arr1 = state.todos.filter(
      (item, idx) => item.channel === state.selectedChannel
    );
    let arr2 = arr1.filter(
      (item, idx) => item.category === state.selectedCategory
    );
    console.log(2);
    return arr2;
  }

  if (state.selectedChannel === "" && state.selectedCategory !== "") {
    let arr = state.todos.filter(
      (item, idx) => item.category === state.selectedCategory
    );
    console.log(3);
    return arr;
  }

  if (state.selectedChannel !== "" && state.selectedCategory === "") {
    let arr = state.todos.filter(
      (item, idx) => item.channel === state.selectedChannel
    );
    console.log(4);
    return arr;
  }
}

function clickToSort(e) {
  if (e.target.classList.contains("channel")) {
  } else if (e.target.className === "list") {
  }
  showUI();
}

// state.selectedChannel = e.target.textContent;
// state.selectedCategory = e.target.textContent.toLowerCase();

// Add EventListiners
form.addEventListener("submit", handleSubmit);
form.addEventListener("change", getFormValues);
channels.addEventListener("click", clickToSort);
categories.addEventListener("click", clickToSort);
