import PopupWithForm from "../components/PopupWithForm";

export default class PopupWithConfirmation extends PopupWithForm {
    constructor(popupSelector) {
        super(popupSelector);
    }

    openPopup(onSubmit) {
        super.openPopup();
        this._handleFormSubmit = onSubmit;
    }
}