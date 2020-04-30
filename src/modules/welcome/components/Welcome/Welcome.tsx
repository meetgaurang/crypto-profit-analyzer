import React, { ReactElement, FunctionComponent } from 'react';
import Button from '@material-ui/core/Button';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { ContainerDiv } from './Welcome.styles';
import { withRouter, useHistory } from 'react-router';

export const Welcome: FunctionComponent = (): ReactElement => {
    const history = useHistory();

    const routeToAnalytics = (): void => {
        history.push('/analytics');
    };

    return (
        <>
            <ContainerDiv>
                <h2>Welcome to Cryptocurrency Price Analytics</h2>
                <div>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<ChevronRightIcon />}
                        onClick={routeToAnalytics}
                    >
                        Get Started
                    </Button>
                </div>
            </ContainerDiv>
        </>
    );
};

export default withRouter(Welcome);
