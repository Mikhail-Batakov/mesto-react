import { useEffect } from "react";

function usePopupCloser(isOpen, closeFunction) {
  useEffect(() => {
    function handleEscClose(event) {
      if (event.key === "Escape") {
        closeFunction();
      }
    }

    function handleOverlayClick(event) {
      if (event.target.classList.contains("popup_opened")) {
        closeFunction();
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscClose);
      document.addEventListener("mousedown", handleOverlayClick);
    }

    return () => {
      document.removeEventListener("keydown", handleEscClose);
      document.removeEventListener("mousedown", handleOverlayClick);
    };
  }, [isOpen, closeFunction]);
}

export default usePopupCloser;
