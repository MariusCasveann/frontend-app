import React from 'react';
import { Button } from 'antd';
import { TeamByProductId_teamByProductId_teamMembers_roles } from '../molecules/TeamMembers/graphql/__generated__/TeamByProductId';

interface AdminRoleButtonProps {
    isTeamMemberAdmin?: TeamByProductId_teamByProductId_teamMembers_roles | null;
    onUpdateRole: () => void;
}

export default ({ isTeamMemberAdmin, onUpdateRole }: AdminRoleButtonProps) => {
    const buttonLabel = (isTeamMemberAdmin && 'Revoke admin role') || 'Assign admin role';

    return (
        <Button type="link" size="small" onClick={onUpdateRole}>
            {buttonLabel}
        </Button>
    );
};
