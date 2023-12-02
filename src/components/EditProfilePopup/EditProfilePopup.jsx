import { useContext, useEffect } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import useFormValidate from "../../utils/hooks/useFormValidate";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateUser,
  isLoadingPopup,
}) {
  const currentUser = useContext(CurrentUserContext);

  const {
    formValues,
    errors,
    isFormValid,
    isInputValid,
    handleChange,
    resetForm,
    setInitialValue,
  } = useFormValidate();

  useEffect(() => {
    setInitialValue("username", currentUser.name);
    setInitialValue("job", currentUser.about);
  }, [currentUser, setInitialValue]);

  function handleClosePopupResetForm() {
    onClose();
    resetForm({ username: currentUser.name, job: currentUser.about });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser(formValues, resetForm);
  }

  const inputErrorClass = (input) =>
    input in isInputValid && !isInputValid[input]
      ? "form__input_type_error"
      : "";

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      titleBtn="Сохранить"
      isOpen={isOpen}
      onClose={handleClosePopupResetForm}
      isFormValid={isFormValid}
      onSubmit={handleSubmit}
      isLoadingPopup={isLoadingPopup}
    >
      <label className="form__label" htmlFor="username">
        <input
          id="username"
          className={`form__input form__input_type_name ${inputErrorClass(
            "username"
          )}`}
          name="username"
          minLength={2}
          maxLength={40}
          type="text"
          required
          placeholder="Ваше имя"
          value={formValues.username || ""}
          disabled={isLoadingPopup}
          onChange={handleChange}
        />
        <span className="form__span-error username-error">
          {errors.username}
        </span>
      </label>
      <label className="form__label" htmlFor="job">
        <input
          id="job"
          className={`form__input form__input_type_job ${inputErrorClass(
            "job"
          )}`}
          name="job"
          minLength={2}
          maxLength={200}
          type="text"
          required
          placeholder="О вас"
          value={formValues.job || ""}
          disabled={isLoadingPopup}
          onChange={handleChange}
        />
        <span className="form__span-error job-error">{errors.job} </span>
      </label>
    </PopupWithForm>
  );
}

// import { useContext, useEffect } from "react";
// import CurrentUserContext from "../../contexts/CurrentUserContext";
// import useFormValidate from "../../utils/hooks/useFormValidate";
// import PopupWithForm from "../PopupWithForm/PopupWithForm";

// export default function EditProfilePopup({isOpen, onClose, onUpdateUser, isLoadingPopup }) {
//   const currentUser = useContext(CurrentUserContext)
//   //const {name, about} = currentUser

//   const {
//     formValues,
//     errors,
//     isFormValid,
//     isInputValid,
//     handleChange,
//     resetForm,
//     setInitialValue

//   } = useFormValidate();

//   useEffect(() => {
//     setInitialValue("username", currentUser.name)
//     setInitialValue("job", currentUser.about)
//   }, [currentUser, setInitialValue])

//   function handleClosePopupResetForm() {
//     onClose()
//     resetForm({username: currentUser.name, job: currentUser.about})
//   }

//   // function handleSubmit(evt) {
//   //   evt.preventDefault();
//   //   onUpdateUser({
//   //     username: formValues.username,
//   //     job: formValues.job,

//   //   }, resetForm);

//   // }

//   function handleSubmit(evt) {
//     evt.preventDefault();
//     onUpdateUser(formValues, resetForm);
//   }

//   return(
//     <PopupWithForm
//       name='edit-profile'
//       title='Редактировать профиль'
//       titleBtn='Сохранить'
//       isOpen={ isOpen }
//       onClose={ handleClosePopupResetForm }
//       isFormValid = { isFormValid }
//       isLoadingPopup = { isLoadingPopup }
//       onSubmit={handleSubmit}

//     >
//       <label className="form__label" htmlFor="username">
//         <input
//           id="username"
//           className={`form__input form__input_type_name ${isInputValid.username === undefined || isInputValid.username ? '' :'form__input_type_error'}`}
//           name="username"
//           minLength={2}
//           maxLength={40}
//           type="text"
//           required
//           placeholder="Ваше имя"
//           value={formValues.username || ''}
//           disabled = {isLoadingPopup}

//           onChange={handleChange}
//         />
//         <span className="form__span-error username-error">{errors.username}</span>
//       </label>
//       <label className="form__label" htmlFor="job">
//         <input
//           id="job"
//           className={`form__input form__input_type_job ${isInputValid.job === undefined || isInputValid.job ? '' :'form__input_type_error'}`}
//           name="job"
//           minLength={2}
//           maxLength={200}
//           type="text"
//           required
//           placeholder="О вас"
//           value={formValues.job || ''}
//           disabled = {isLoadingPopup}
//           onChange={handleChange}
//         />
//         <span className="form__span-error job-error">{errors.job} </span>
//       </label>
//     </PopupWithForm>

//   )
// }
