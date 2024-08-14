const initialCards = [
  "objectOne",
  "objectTwo",
  "objectThree",
  "objectFour",
  "objectFive",
  "objectSix",
];

const objectOne = {
  name: "Val Thorens",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
};

const objectTwo = {
  name: "Restaurant terrace",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
};

const objectThree = {
  name: "An outdoor cafe",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
};

const objectFour = {
  name: "A very long bridge, over the forest and through the trees",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
};

const objectFive = {
  name: "Tunnel with morning light",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
};

const objectSix = {
  name: "Mountain house",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
};

const profileEditButton = document.querySelector(".profile__edit-profile");
const editProfileModal = document.querySelector("#edit-profile-modal");

function openModal() {
  editProfileModal.classList.add("modal_opened");
}

profileEditButton.addEventListener("click", openModal);

const closeProfileWindow = document.querySelector(".modal__close-button");

function closeModal() {
  editProfileModal.classList.remove("modal_opened");
}

closeProfileWindow.addEventListener("click", closeModal);
