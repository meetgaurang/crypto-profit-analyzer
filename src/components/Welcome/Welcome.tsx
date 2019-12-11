import React from 'react';
import Button from '@material-ui/core/Button';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { ContainerDiv } from './Welcome.styles';
import { withRouter, useHistory } from 'react-router';

export const Welcome = () => {
    const history = useHistory();
    
    const routeToAnalytics = () => {
        history.push("/analytics");
    }

    return (
        <>
            <ContainerDiv>
                <h2>
                    Welcome to Cryptocurrency Data Analyser!
                    </h2>
                <div>
                    <Button variant="contained" color="primary" startIcon={<ChevronRightIcon />} onClick={routeToAnalytics}>
                        Get Started
                        </Button>
                </div>
            </ContainerDiv>
        </>
    );
}

export default withRouter(Welcome);