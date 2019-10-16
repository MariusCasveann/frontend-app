import React, { useState } from 'react';
import { Divider, Table, Avatar, Button } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import LoadingOrErrorPresenter from '../../../common/organisms/LoadingOrError/LoadingOrErrorPresenter';
import { Card } from '../../../common/molecules/CardLayout/CardLayout';
import {
    TeamByProductId_teamByProductId,
    TeamByProductId_teamByProductId_teamMembers
} from './graphql/__generated__/TeamByProductId';
import {
    QueryCurrentUser_currentUser,
    QueryCurrentUser_currentUser_roles
} from '../../../authentication/molecules/UserProfile/graphql/__generated__/QueryCurrentUser';
import { QueryAllProducts_allProducts } from '../../../dashboard/atoms/ProductSelection/graphql/__generated__/QueryAllProducts';
import TeamProductOwnerPresenter from './TeamProductOwnerPresenter';
import { checkIfTeamHasData, checkIfMemberIsAdmin, checkIfCurrentUserIsAdmin } from '../../helpers/teamHelper';
import AdminRoleButton from '../../atoms/AdminRoleButton';
import ConfirmModal from '../../../common/molecules/Modals/ConfirmModal';
import '../../../common/molecules/CardLayout/CardLayout.css';
import './Team.css';
import CreateTeam from '../../../createTeam/CreateTeam';
import EditProductOwner from '../ProductOwner/EditProductOwner';
import AddTeamMembers from '../AddTeamMembers/AddTeamMembers';
import { History, LocationState } from 'history';

export interface TeamMemberProps {
    teamByProductId: TeamByProductId_teamByProductId;
    currentUser: QueryCurrentUser_currentUser | null;
    loading: boolean;
    error: string;
    selectedProduct: QueryAllProducts_allProducts;
    onAssign: (productId: string, userId: string) => void;
    onRevoke: (productId: string, userId: string) => void;
    onDelete: (productId: string, team: TeamByProductId_teamByProductId, userId: string) => void;
    history: History<LocationState>;
}

export const getColumns = (
    onAssign: (productId: string, userId: string) => void,
    onRevoke: (productId: string, userId: string) => void,
    selectedProduct: QueryAllProducts_allProducts,
    setUserId: (userId: string) => void,
    setVisible: (visbile: boolean) => void,
    isCurrentUserAdmin?: QueryCurrentUser_currentUser_roles | null
) => {
    const columns: Array<ColumnProps<TeamByProductId_teamByProductId_teamMembers | null>> = [
        {
            render: () => <Avatar size="small" icon="user" />,
            width: 20,
            key: 'avatar'
        },
        {
            title: 'Name',
            render: name => `${name.firstName} ${name.lastName}`,
            key: 'name'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'Action',
            key: 'action',
            render: item => (
                <div className="member-action-button">
                    {isCurrentUserAdmin ? (
                        <>
                            <AdminRoleButton
                                onUpdateRole={() => {
                                    const admin = checkIfMemberIsAdmin(item, selectedProduct);
                                    admin
                                        ? onRevoke(selectedProduct.id, item.id)
                                        : onAssign(selectedProduct.id, item.id);
                                }}
                                isTeamMemberAdmin={checkIfMemberIsAdmin(item, selectedProduct)}
                            />
                            <Divider type="vertical" />
                        </>
                    ) : (
                        undefined
                    )}
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            setUserId(item.id);
                            setVisible(true);
                        }}
                    >
                        Delete
                    </Button>
                </div>
            )
        }
    ];
    return columns;
};

export default ({
    teamByProductId,
    loading,
    error,
    currentUser,
    selectedProduct,
    onAssign,
    onRevoke,
    onDelete,
    history
}: TeamMemberProps) => {
    const isCurrentUserAdmin = checkIfCurrentUserIsAdmin(currentUser, selectedProduct);
    const [visible, setVisible] = useState(false);
    const [userId, setUserId] = useState('');
    const [changeProductOwner, setChangeProductOwner] = useState<boolean>(false);
    const [addTeamMembers, setAddTeamMembers] = useState<boolean>(false);

    if (loading || error) {
        return (
            <Card width={100}>
                <LoadingOrErrorPresenter error={error} loading={loading} />
            </Card>
        );
    }
    if (checkIfTeamHasData(teamByProductId)) {
        return (
            <>
                <ConfirmModal
                    title="Delete"
                    visible={visible}
                    onCancel={() => setVisible(false)}
                    onOk={async () => {
                        await onDelete(selectedProduct.id, teamByProductId, userId);

                        setVisible(false);
                    }}
                    text="Do you want to delete this team member"
                />
                <Card title="Team members" width={100}>
                    <EditProductOwner
                        selectedProduct={selectedProduct}
                        teamByProductId={teamByProductId}
                        changeProductOwner={changeProductOwner}
                        setChangeProductOwner={setChangeProductOwner}
                    />
                    <AddTeamMembers
                        selectedProduct={selectedProduct}
                        teamByProductId={teamByProductId}
                        addTeamMembers={addTeamMembers}
                        setAddTeamMembers={setAddTeamMembers}
                    />
                    <TeamProductOwnerPresenter
                        teamByProductId={teamByProductId}
                        setChangeProductOwner={setChangeProductOwner}
                        setAddTeamMembers={setAddTeamMembers}
                    />
                    <Table
                        rowKey={record => (record && record.lastName) || ''}
                        columns={getColumns(
                            onAssign,
                            onRevoke,
                            selectedProduct,
                            setUserId,
                            setVisible,
                            isCurrentUserAdmin
                        )}
                        dataSource={(teamByProductId && teamByProductId.teamMembers) || []}
                        pagination={false}
                    />
                </Card>
            </>
        );
    }
    return <CreateTeam history={history} />;
};
