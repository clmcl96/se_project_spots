import "./index.css";
import {
  enableValidation,
  settings,
  disableButton,
  resetValidation,
} from "../scripts/validation.js";
import Api from "../utils/Api.js";
import { checkResponse } from "../utils/helpers.js";
import { renderLoading } from "../utils/helpers.js";

// const initialCards = [
//   {
//     name: "Val Thorens",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
//     alt: "Val Thorens",
//   },
//   {
//     name: "Restaurant terrace",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
//     alt: "A restaurant terrace",
//   },
//   {
//     name: "An outdoor cafe",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
//     alt: "An outdoor cafe",
//   },
//   {
//     name: "A very long bridge, over the forest and through the trees",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
//     alt: "A long bridge",
//   },
//   {
//     name: "Tunnel with morning light",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
//     alt: "Tunnell with morning light",
//   },
//   {
//     name: "Mountain house",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
//     alt: "A house in the mountains",
//   },
//   {
//     name: "Golden Gate Bridge",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
//     alt: "Golden Gate bridge on a foggy day",
//   },
// ];

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "6e2778bd-e26b-4b4f-bace-49007ef07e3d",
    "Content-Type": "application/json",
  },
});

api
  .getAppInfo()
  .then(([cards, users]) => {
    console.log(cards, users);
    cards.forEach((item) => {
      const cardElement = getCardElement(item);
      cardsList.append(cardElement);
    });
    profileAvatar.src = users.avatar;
    profileName.textContent = users.name;
    profileDescription.textContent = users.about;
  })
  .catch((err) => {
    console.error(err);
  });

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
const profileAvatar = document.querySelector(".profile__avatar");
const editAvatarModal = document.querySelector("#edit-avatar-modal");
const editAvatarButton = document.querySelector(".profile__avatar-btn");
const avatarSubmitButton = editAvatarModal.querySelector(".modal__submit");
const avatarCloseBtn = editAvatarModal.querySelector(".modal__close-button");
const avatarForm = editAvatarModal.querySelector("#edit-avatar-form");
const avatarValue = editAvatarModal.querySelector("#profile-avatar-input");

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
const deleteModal = document.querySelector("#delete-card-modal");
const deleteForm = deleteModal.querySelector(".delete__card");
const deleteCancel = deleteModal.querySelector(".modal__cancel");
const deleteClose = deleteModal.querySelector(".modal__close-button-delete");
const deleteBtn = deleteModal.querySelector(".modal__delete");

const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

let selectedCard;
let selectedCardId;

function handleAvatarSubmit(evt) {
  evt.preventDefault();
  enableValidation(settings);

  const submitBtn = evt.submitter;
  renderLoading(true, submitBtn);

  api
    .editAvatarInfo(avatarValue.value)
    .then((data) => {
      profileAvatar.src = data.avatar;
      evt.target.reset();
      closeModal(editAvatarModal);
    })
    .catch(console.error)
    .finally(() => {
      renderLoading(false, submitBtn);
    });
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const submitBtn = evt.submitter;
  renderLoading(true, submitBtn);

  api
    .addNewCard({
      name: cardCaptionInput.value,
      link: cardLinkInput.value,
    })
    .then((data) => {
      const cardElement = getCardElement(data);
      cardsList.prepend(cardElement);
      closeModal(newPostModal);
      newPostForm.reset();
      disableButton(submitBtn, settings);
    })
    .catch(console.error)
    .finally(() => {
      renderLoading(false, submitBtn);
    });
}

function handleDeleteSubmit(evt) {
  evt.preventDefault();
  const submitBtn = evt.submitter;
  const initialText = deleteBtn.textContent;
  renderLoading(true, submitBtn, initialText);
  api
    .deleteCard(selectedCardId)
    .then((data) => {
      selectedCard.remove();
      closeModal(deleteModal);
    })
    .catch(console.error)
    .finally(() => {
      renderLoading(false, submitBtn, "Deleting...");
    });
}

function handleDeleteCard(cardElement, cardId) {
  selectedCard = cardElement;
  selectedCardId = cardId;
  openModal(deleteModal);
}

function handleLike(evt, id) {
  const isLiked = evt.target.classList.contains("card__heart-button_liked");

  api
    .toggleLike(id, isLiked)
    .then(() => {
      evt.target.classList.toggle("card__heart-button_liked");
    })
    .catch(console.error);
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

  cardLikeBtn.addEventListener("click", (evt) => handleLike(evt, data._id));

  if (data.isLiked) {
    cardLikeBtn.classList.add("card__heart-button_liked");
  }

  cardDeleteBtn.addEventListener("click", (evt) =>
    handleDeleteCard(cardElement, data._id)
  );

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

deleteCancel.addEventListener("click", () => {
  closeModal(deleteModal);
});

deleteClose.addEventListener("click", () => {
  closeModal(deleteModal);
});

avatarCloseBtn.addEventListener("click", () => {
  closeModal(editAvatarModal);
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
  resetValidation(profileForm, settings);
  modalName.value = profileName.textContent;
  modalDescription.value = profileDescription.textContent;
});

newPostButton.addEventListener("click", () => {
  openModal(newPostModal);
});

editAvatarButton.addEventListener("click", () => {
  openModal(editAvatarModal);
});

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscKey);
  modal.removeEventListener("click", handleOverlayClick);
}

function saveProfileChanges(evt) {
  evt.preventDefault();

  const submitBtn = evt.submitter;
  submitBtn.textContent = "Saving...";

  api
    .editUserInfo({ name: modalName.value, about: modalDescription.value })
    .then((data) => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
      closeModal(editProfileModal);
    })
    .catch(console.error)
    .finally(() => {
      submitBtn.textContent = "Save";
    });
}

profileCloseButton.addEventListener("click", () => {
  closeModal(editProfileModal);
});

newPostClosebtn.addEventListener("click", () => {
  closeModal(newPostModal);
});

profileForm.addEventListener("submit", saveProfileChanges);
newPostForm.addEventListener("submit", handleAddCardSubmit);
avatarForm.addEventListener("submit", handleAvatarSubmit);
deleteForm.addEventListener("submit", handleDeleteSubmit);

enableValidation(settings);
