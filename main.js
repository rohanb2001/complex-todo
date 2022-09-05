import { v4 as uuidv4 } from "https://jspm.dev/uuid";

const form = document.querySelector("form");
const channels = document.querySelector(".channels");
const allChannel = document.querySelectorAll(".channel");
const allList = document.querySelectorAll(".list");
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
    if (state.selectedChannel !== e.target.textContent) {
      allChannel.forEach((item) => item.classList.remove("channel-active"));
      state.selectedChannel = e.target.textContent;
      state.channelActive = false;
      e.target.classList.add("channel-active");
    } else if (state.selectedChannel === e.target.textContent) {
      state.channelActive = !state.channelActive;
      e.target.classList.toggle("channel-active");
    }
  } else if (e.target.classList.contains("list")) {
    if (state.selectedCategory !== e.target.textContent.toLowerCase()) {
      console.log("fff");
      allList.forEach((item) => item.classList.remove("category-active"));
      state.selectedCategory = e.target.textContent.toLowerCase();
      state.categoryActive = false;
      e.target.classList.add("category-active");
    } else if (state.selectedCategory === e.target.textContent.toLowerCase()) {
      console.log("fff");
      state.categoryActive = !state.categoryActive;
      e.target.classList.toggle("category-active");
    }
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
