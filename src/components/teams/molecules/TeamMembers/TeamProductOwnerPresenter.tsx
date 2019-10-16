import React from 'react';
import { TeamByProductId_teamByProductId } from './graphql/__generated__/TeamByProductId';
import { Avatar, Icon, Button } from 'antd';
import './Team.css';

interface TeamProductOwnerPresenter {
    teamByProductId: TeamByProductId_teamByProductId;
    setChangeProductOwner: (flag: boolean) => void;
    setAddTeamMembers: (flag: boolean) => void;
}

export default ({ teamByProductId, setChangeProductOwner, setAddTeamMembers }: TeamProductOwnerPresenter) => (
    <div className="product-owner-card">
        <div className="product-owner-label">Product owner: </div>
        <Avatar size="small" icon="user" />
        <span className="product-owner-name">
            {teamByProductId && teamByProductId.productOwner && teamByProductId.productOwner.firstName}{' '}
            {teamByProductId && teamByProductId.productOwner && teamByProductId.productOwner.lastName}
        </span>
        <Icon className="edit-icon" type="edit" onClick={() => setChangeProductOwner(true)} />
        <Button className="add-member-button" type="primary" onClick={() => setAddTeamMembers(true)}>
            <Icon type="user-add" />
            Add member
        </Button>
    </div>
);
