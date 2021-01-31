import React from "react";
import Select from "../Select/Select";
import Btn from "../Btn/Btn";

class Form extends React.Component{
    constructor(props) {
        super(props)

        this.regexpName = /[^\p{L}\-\s]/u;
        this.regexpEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        this.regexpPhoneNumber = /[^+()\d-]/;
        this.regexpPhoneNumberLength = /\d{11}/;

        this.state = {
            name: {
                value: null,
                isValid: null,
            },
            email: {
                value: null,
                isValid: null,
            },
            phoneNumber: {
                value: null,
                isValid: null,
            },
            language: {
                value: null,
                isValid: null,
            },
            isChecked: false,
            isBtnDisabled: true
        }

        this.getCurrentLanguage = this.getCurrentLanguage.bind(this)
        this.setLanguage = this.setLanguage.bind(this)
        this.onBlur = this.onBlur.bind(this)
        this.onChange = this.onChange.bind(this)
        this.validateForm = this.validateForm.bind(this)
        this.inputHandler = this.inputHandler.bind(this)
        this.checkboxHandler = this.checkboxHandler.bind(this)
    }

    inputHandler (e) {
        if(e.target.name === "name") {
            this.setState({
                name: {
                    value: e.target.value,
                    isValid: !this.regexpName.test(e.target.value) && e.target.value.length > 0
                }
            });
        }

        if(e.target.name === "email") {
            this.setState({
                email: {
                    value: e.target.value,
                    isValid: this.regexpEmail.test(e.target.value)
                }
            });
        }

        if(e.target.name === "phone-number") {
            this.setState({
                phoneNumber: {
                    value: e.target.value,
                    isValid: !this.regexpPhoneNumber.test(e.target.value) && this.regexpPhoneNumberLength.test(e.target.value)
                }
            });
        }
    }

    checkboxHandler (e) {
        if(e.target.checked) {
            this.setState({
                isChecked: true
            })
        } else {
            this.setState({
                isChecked: false
            })
        }
    }

    setLanguage (value) {
        this.setState(
            {
                language: {
                    value: value,
                    isValid: !(value === "Язык")
                }
            }
        )
    }

    getCurrentLanguage (value) {
        this.setLanguage(value)
    }

    onBlur (event) {
        this.inputHandler(event)
    }

    onChange (event) {
        this.checkboxHandler(event)
    }

    validateForm (prevState) {
        const {name, email, phoneNumber, language, isChecked} = this.state

        if(name.isValid && email.isValid && phoneNumber.isValid && language.isValid && isChecked && prevState.isBtnDisabled) {
            this.setState({
                isBtnDisabled: false
            })
        }

        if((!name.isValid || !email.isValid || !phoneNumber.isValid || !language.isValid || !isChecked)
            && prevState.isBtnDisabled === false) {
            this.setState({
                isBtnDisabled: true
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        this.validateForm(prevState)
    }

    render() {
        const {name, email, phoneNumber, language} = this.state

        const classOfName = (name.isValid || name.isValid === null) ? "form__label": "form__label form__label--invalid",
            classOfEmail = (email.isValid || email.isValid === null) ? "form__label": "form__label form__label--invalid",
            classOfPhoneNumber = (phoneNumber.isValid || phoneNumber.isValid === null) ? "form__label": "form__label form__label--invalid",
            classOfLanguage = (language.isValid || language.isValid === null) ? "form__label": "form__label form__label--invalid"

        return (
            <form className={"form"} name={"form"}>
                <h2 className={"form_title"}>Регистрация</h2>
                <p className={"form__string"}>Уже есть аккаунт? <a className={"form__link"} href={"*"}>Войти</a></p>
                <label className={classOfName}>
                    Имя
                    <input className={"form__input"}
                           onBlur={this.onBlur}
                           name={"name"}
                           placeholder={"Введите Ваше имя"}
                    />
                </label>
                <label className={classOfEmail}>
                    Email
                    <input className={"form__input"}
                           onBlur={this.onBlur}
                           name={"email"}
                           placeholder={"Введите ваш email"}
                    />
                </label>
                <label className={classOfPhoneNumber}>
                    Номер телефона
                    <input className={"form__input"}
                           onBlur={this.onBlur}
                           name={"phone-number"}
                           placeholder={"Введите номер телефона"}
                    />
                </label>
                <label className={classOfLanguage}>
                    Язык
                    <Select options = "Русский, Английский, Китайский, Испанский"
                            defaultValue = "Язык"
                            getValue = {this.getCurrentLanguage}
                    />
                </label>
                <input className={"form__checkbox"} onChange={this.onChange} id={"agreement"} type={"checkbox"}/>
                <label className={"form__custom-checkbox"} htmlFor={"agreement"} tabIndex={"0"}/>
                <p className={"form__string"}>Принимаю <a className={"form__link"} href={"*"}>условия</a> использования</p>
                <Btn classRow = "form__form-btn btn" disabled={this.state.isBtnDisabled} onClickHandler={null}>Зарегистрироваться</Btn>
            </form>
        )
    }
}

export default Form;