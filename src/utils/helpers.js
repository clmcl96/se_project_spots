export function setButtonText(btn, isLoading, loadingText, defaultText) {
  if (isLoading) {
    submitBtn.textContent = `${loadingText}`;
  } else {
    submitBtn.textContent = `${defaultText}`;
  }
}
