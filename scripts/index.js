import { enableValidation, settings } from "./validation.js";

const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
    alt: "Val Thorens",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
    alt: "A restaurant terrace",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
    alt: "An outdoor cafe",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
    alt: "A long bridge",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
    alt: "Tunnell with morning light",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
    alt: "A house in the mountains",
  },
  {
    name: "Golden Gate Bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
    alt: "Golden Gate bridge on a foggy day",
  },
];

const profileEditButton = document.querySelector(".profile__edit-profile");
const editProfileModal = document.querySelector("#edit-profile-modal");
const profileForm = document.querySelector("#edit-profile-form");
const profileCloseButton = editProfileModal.querySelector(
  ".modal__close-button"
);
const newPostButton = document.querySelector(".profile__new-post");
const newPostModal = document.querySelector("#new-post-modal");
const newPostClosebtn = newPostModal.querySelector(".modal__close-button");
const cardSubmitBtn = newPostModal.querySelector(".modal__submit");
const newPostForm = newPostModal.querySelector("#new-post-form");
const cardLinkInput = newPostModal.querySelector("#new-post-link");
const cardCaptionInput = newPostModal.querySelector("#card-caption");

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const modalName = editProfileModal.querySelector("#name");
const modalDescription = editProfileModal.querySelector(
  "#edit-profile-description"
);

const previewModal = document.querySelector("#preview-modal");
const previewModalImage = previewModal.querySelector(".modal__image");
const previewModalCaption = previewModal.querySelector(".modal__caption");
const previewModalCloseBtn = previewModal.querySelector(
  ".modal__close-button_preview"
);

const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

function handleNewPostSubmit(evt) {
  evt.preventDefault();
  const inputValues = {
    name: cardCaptionInput.value,
    link: cardLinkInput.value,
  };
  const cardEl = getCardElement(inputValues);
  cardsList.prepend(cardEl);
  evt.target.reset();
  disableButton(cardSubmitBtn, settings);
  closeModal(newPostModal);
}

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  const cardNameEl = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const cardLikeBtn = cardElement.querySelector(".card__heart-button");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-button");

  cardNameEl.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.alt;
  cardLikeBtn.addEventListener("click", () => {
    cardLikeBtn.classList.toggle("card__heart-button_liked");
  });
  cardDeleteBtn.addEventListener("click", () => {
    cardElement.remove();
  });
  cardImage.addEventListener("click", () => {
    openModal(previewModal);
    previewModalImage.src = data.link;
    previewModalImage.alt = data.alt;
    previewModalCaption.textContent = data.name;
  });

  return cardElement;
}

previewModalCloseBtn.addEventListener("click", () => {
  closeModal(previewModal);
});

function handleEscKey(evt) {
  if (evt.key === "Escape") {
    const modal = document.querySelector(".modal_opened");
    closeModal(modal);
  }
}

function handleOverlayClick(evt) {
  if (evt.target.classList.contains("modal_opened")) {
    closeModal(evt.target);
  }
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscKey);
  modal.addEventListener("click", handleOverlayClick);
}

profileEditButton.addEventListener("click", () => {
  openModal(editProfileModal);
  modalName.value = profileName.textContent;
  modalDescription.value = profileDescription.textContent;
});

newPostButton.addEventListener("click", () => {
  openModal(newPostModal);
});

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscKey);
  modal.removeEventListener("click", handleOverlayClick);
}

function saveProfileChanges(evt) {
  evt.preventDefault();
  profileName.textContent = modalName.value;
  profileDescription.textContent = modalDescription.value;
  closeModal(editProfileModal);
}

profileCloseButton.addEventListener("click", () => {
  closeModal(editProfileModal);
});

newPostClosebtn.addEventListener("click", () => {
  closeModal(newPostModal);
});

profileForm.addEventListener("submit", saveProfileChanges);
newPostForm.addEventListener("submit", handleNewPostSubmit);

initialCards.forEach((item) => {
  const cardElement = getCardElement(item);
  cardsList.append(cardElement);
});

enableValidation(settings);
