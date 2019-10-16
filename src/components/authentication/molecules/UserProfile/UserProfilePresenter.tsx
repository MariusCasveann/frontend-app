import React from 'react';
import { Row, Col, Card, Button } from 'antd';
import { createHashHistory } from 'history';
import { QueryCurrentUser_currentUser } from './graphql/__generated__/QueryCurrentUser';
import './UserProfilePresenter.css';

export const history = createHashHistory();

export interface UserProfileProps {
    currentUser: QueryCurrentUser_currentUser;
}

const redirectToDashboard = () => {
    history.push(`/dashboard`);
};

export default ({ currentUser }: UserProfileProps) => {
    if (currentUser) {
        return (
            <Card title="User profile">
                <Row>
                    <Col xs={4}>Username:</Col>
                    <Col>{currentUser.login}</Col>
                </Row>
                <hr />
                <Row>
                    <Col xs={4}>Firstname:</Col>
                    <Col>{currentUser.firstName}</Col>
                </Row>
                <hr />
                <Row>
                    <Col xs={4}>Lastname:</Col>
                    <Col>{currentUser.lastName}</Col>
                </Row>
                <hr />
                <Row>
                    <Col xs={4}>Email:</Col>
                    <Col>{currentUser.email}</Col>
                </Row>
                <hr />
                <Row>
                    <Col xs={4}>Assigned roles:</Col>
                    {currentUser.roles &&
                        currentUser.roles.map((role, index) => (
                            <Col className="user-roles" key={index}>
                                {role && role.name}
                            </Col>
                        ))}
                </Row>
                <Button type="danger">Save</Button>
                <Button onClick={redirectToDashboard} type="primary">
                    Cancel
                </Button>
            </Card>
        );
    }
    return null;
};
