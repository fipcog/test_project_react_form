import React from "react";

class Select extends React.Component{
    constructor(props) {
        super(props)

        this.timeOutId = null;

        this.state = {
            isOpen: false,
            currentValue: this.props.defaultValue,
            options: this.props.options.split(', '),
        }

        this.onSelectClickHandler = this.onSelectClickHandler.bind(this)
        this.onSelectKeyUp = this.onSelectKeyUp.bind(this)
        this.onSelectBlur = this.onSelectBlur.bind(this)
        this.onOptionFocusHandler = this.onOptionFocusHandler.bind(this)
        this.onOptionClickHandler = this.onOptionClickHandler.bind(this)
        this.onOptionKeyUpHandler = this.onOptionKeyUpHandler.bind(this)
    }

    onSelectClickHandler () {
        this.setState({isOpen: !this.state.isOpen})
    }

    onSelectKeyUp (e) {
        if(e.code === "Space") {
            this.setState({isOpen: !this.state.isOpen})
        }
        if(e.code === "Escape") {
            this.setState({isOpen: false})
        }
    }

    onSelectBlur () {
        this.timeOutId = setTimeout(() => {
            this.setState({isOpen: false});
        });
    }

    onOptionFocusHandler () {
        clearTimeout(this.timeOutId);
    }

    onOptionClickHandler (e) {
        this.setState({currentValue: e.target.textContent})
        this.props.getValue(e.target.textContent)
    }

    onOptionKeyUpHandler (e) {
        this.setState({currentValue: e.target.textContent})
        this.props.getValue(e.target.textContent)
    }

    render() {
        const getListClass = (this.state.isOpen) ? "custom-select__list": "custom-select__list custom-select__list--hidden"
        const getSelectClass = (this.state.currentValue === "Язык") ? "custom-select custom-select--placeholder" : "custom-select"

        const options = this.state.options.map((item) => {
            return <li className={"custom-select__option"}
                       onClick={this.onOptionClickHandler}
                       onKeyUp={this.onOptionKeyUpHandler}
                       onFocus={this.onOptionFocusHandler}
                       key={item} tabIndex={"0"}>{item}</li>
        })

        return (
            <span className={getSelectClass}
                  onClick={this.onSelectClickHandler}
                  onKeyUp={this.onSelectKeyUp}
                  onBlur={this.onSelectBlur}
                  tabIndex={"0"}>{this.state.currentValue}
                <ul className={getListClass}>
                    {options}
                </ul>
            </span>
        )
    }
}

export default Select;