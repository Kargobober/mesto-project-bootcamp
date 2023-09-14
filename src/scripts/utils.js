export const handleInvalidResponse = (err) => {
  console.log(err);
}

export const changeButtonText = (button, text) => {
  button.textContent = text;
}
