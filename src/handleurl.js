import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class HandleError extends PureComponent {
    render() {
        return (
            <div className = "hiddenurl">
                <img src={"./404.jpg"} />
            </div>
        );
    }
}

export default HandleError;