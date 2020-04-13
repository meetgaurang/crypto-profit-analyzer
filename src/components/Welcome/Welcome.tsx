import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { ContainerDiv } from './Welcome.styles';
import { withRouter, useHistory } from 'react-router';
import { UserContext } from '../../utils/UserContext';

export const Welcome = () => {
    const history = useHistory();
    const userData = useContext(UserContext);
    
    const routeToAnalytics = () => {
        history.push('/analytics');
    };

    return (
        <>
            {
                console.log("This context value is fetched from useContext hook: " + userData.name)
            }
            <ContainerDiv>
                <UserContext.Consumer>
                    {
                        context => (
                            <>
                                {
                                    console.log("This context value is fetched through UserContext.Consumer: " + context.name)
                                }
                                <h2>
                                    Welcome to Cryptocurrency Price Analytics!
                                </h2>
                                <div>
                                    <Button variant="contained" color="primary" startIcon={<ChevronRightIcon />} onClick={routeToAnalytics}>
                                        Get Started
                                        </Button>
                                </div>
                            </>
                        )
                    }
                </UserContext.Consumer>
            </ContainerDiv>
        </>
    );
};

export default withRouter(Welcome);
