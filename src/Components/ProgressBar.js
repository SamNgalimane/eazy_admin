import React from "react";
import { ClapSpinner } from "react-spinners-kit";

class ProgressBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: props.loading,
        };
    }

    render() {
        const { loading } = this.state;
        return (
            <ClapSpinner
                size={90}
                color="#686769"
                loading={loading}
            />
        );
    }
}

export default ProgressBar;