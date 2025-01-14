export function renderLoading(
  isLoading,
  btn,
  defaultText = "Save",
  loadingText = "Saving..."
) {
  if (isLoading && btn.textContent.includes("Save")) {
    btn.textContent = loadingText;
  } else if (isLoading && btn.textContent.includes("Delete")) {
    btn.textContent = "Deleting...";
  } else {
    btn.textContent = defaultText;
  }
}

export function checkResponse(res) {
  (res) => {
    if (res.ok) {
      return res.json();
    }
    Promise.reject(`Error: ${res.status}`);
  };
}
