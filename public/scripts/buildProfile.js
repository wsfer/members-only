// TODO: generate a random emoji and color on first visit
(() => {
  // Inputs
  const emojiPicker = document.querySelector('.js-emoji-picker');
  const emojiHiddenInput = document.querySelector('.js-emoji-input');
  const colorInput = document.querySelector('.js-color-input');

  // Profile preview
  const profileColor = document.querySelector('.js-profile-color');
  const profileEmoji = document.querySelector('.js-profile-emoji');

  emojiPicker.addEventListener('emoji-click', (e) => {
    emojiHiddenInput.value = e.detail.unicode;
    profileEmoji.textContent = e.detail.unicode;
  });

  colorInput.addEventListener('input', (e) => {
    profileColor.style.backgroundColor = e.target.value;
  });

  emojiHiddenInput.value = emojiHiddenInput.value || '😀';
  profileEmoji.textContent = emojiHiddenInput.value;
  profileColor.style.backgroundColor = colorInput.value;
})();
