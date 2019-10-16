import * as React from 'react';
import { Flyout, Icon } from 'backoffice-shared-components';
import { LogoutButtonPresenter } from './../../../authentication';
import { Button } from 'antd';
import './UserMenu.css';
import { createHashHistory } from 'history';
import { QueryCurrentUser_currentUser } from '../UserProfile/graphql/__generated__/QueryCurrentUser';

export const history = createHashHistory();

interface UserMenuPresenter {
    currentUser: QueryCurrentUser_currentUser;
}

const redirectToProfilePage = () => {
    history.push(`/user-edit`);
};

export default ({ currentUser }: UserMenuPresenter) => {
    if (currentUser) {
        return (
            <div className="user-menu">
                <Flyout
                    content={<span>{currentUser.email}</span>}
                    footer={
                        <span>
                            <Button type="link" onClick={redirectToProfilePage}>
                                Profile
                            </Button>
                            <br />
                            <Icon type="power-off" size="small" color="black" className="margins-power-icon" />
                            <LogoutButtonPresenter />
                        </span>
                    }
                    label={
                        <span>
                            {currentUser.firstName} {currentUser.lastName}
                        </span>
                    }
                    position="left"
                />
            </div>
        );
    }
    return null;
};
