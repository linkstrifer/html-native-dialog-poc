import dialogPolyfill from "dialog-polyfill";

const { openButton, dialog, closeButton, dialogStatus, polyfill } = window;

function setOpenState(open, opener) {
  if (open) {
    dialog.showModal();
  } else {
    dialog.close();
  }

  checkStatus(opener);
}

function checkStatus(opener) {
  dialogStatus.innerText = dialog.open
    ? `open by ${opener}`
    : `closed by ${opener}`;
}

openButton.addEventListener("click", () => {
  if (typeof dialog.showModal === "function") {
    setOpenState(true, "openButton");
  } else {
    dialogPolyfill.registerDialog(dialog);
    polyfill.innerText = " with Polyfill";
    setOpenState(true, "openButton");
  }
});

closeButton.addEventListener("click", () => setOpenState(false, "closeButton"));

dialog.addEventListener("click", (event) => {
  // Check if dialog was clicked or the content
  // dialog = backdrop + content
  if (event.target === dialog) {
    setOpenState(false, "backdrop");
  }
});
