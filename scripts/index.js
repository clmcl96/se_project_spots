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
];

const profileEditButton = document.querySelector(".profile__edit-profile");
const editProfileModal = document.querySelector("#edit-profile-modal");
const modalForm = document.querySelector("#edit-profile-form");

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const modalName = editProfileModal.querySelector("#name");
const modalDescription = editProfileModal.querySelector("#description");

const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  const cardNameEl = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  cardNameEl.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.alt;
  return cardElement;
}

function openModal() {
  modalName.value = profileName.textContent;
  modalDescription.value = profileDescription.textContent;
  editProfileModal.classList.add("modal_opened");
}

profileEditButton.addEventListener("click", openModal);

const closeProfileWindow = document.querySelector(".modal__close-button");

function closeModal() {
  editProfileModal.classList.remove("modal_opened");
}

function saveChanges(evt) {
  evt.preventDefault();
  profileName.textContent = modalName.value;
  profileDescription.textContent = modalDescription.value;
  closeModal();
}

closeProfileWindow.addEventListener("click", closeModal);

modalForm.addEventListener("submit", saveChanges);

for (let i = 0; i < initialCards.length; i++) {
  const cardElement = getCardElement(initialCards[i]);
  cardsList.prepend(cardElement);
}
