import React from "react";

class Btn extends React.Component {
    render() {
        return <button className={this.props.classRow}
                       onClick={this.props.onClickHandler}
                       disabled={this.props.disabled}
                >{this.props.children}</button>
    }
}

export default Btn;