import React from 'react';
import { Form, Modal } from 'antd';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import { getTeamFormRules } from '../../../createTeam/helpers/teamHelper';
import { TeamByProductId_teamByProductId } from '../TeamMembers/graphql/__generated__/TeamByProductId';
import SearchableSelectPresenter, {
    SelectItemProps
} from '../../../common/molecules/SearchableSelect/SearchableSelectPresenter';
import { modalLayout } from '../../helpers/teamHelper';

import '../TeamModal.css';

interface AddTeamMembersProps {
    getFieldDecorator: (id: string, options: GetFieldDecoratorOptions) => (node: React.ReactNode) => React.ReactNode;
    team: TeamByProductId_teamByProductId;
    teamMembersOptions: SelectItemProps[];
    loadingTeamMembers: boolean;
    setSearchTeamMembersInput: (value: string) => void;
    addTeamMembers: boolean;
    handleSubmit: (e: React.MouseEvent<HTMLElement>) => void;
    setAddTeamMembers: (flag: boolean) => void;
}

export default ({
    getFieldDecorator,
    team,
    teamMembersOptions,
    loadingTeamMembers,
    setSearchTeamMembersInput,
    addTeamMembers,
    setAddTeamMembers,
    handleSubmit
}: AddTeamMembersProps) => {
    const rules = getTeamFormRules();

    if (addTeamMembers) {
        return (
            <Modal
                title="Add team members"
                visible={addTeamMembers}
                onCancel={() => setAddTeamMembers(false)}
                onOk={handleSubmit}
            >
                <Form layout="vertical" className="team-form">
                    <Form.Item label="Team members" {...modalLayout}>
                        {getFieldDecorator('teamMembers', {
                            rules: rules.teamMembers,
                            initialValue:
                                (team && team.teamMembers && team.teamMembers.map(item => item && item.id)) || undefined
                        })(
                            <SearchableSelectPresenter
                                data={teamMembersOptions}
                                mode="multiple"
                                loading={loadingTeamMembers}
                                onSearchCallback={setSearchTeamMembersInput}
                            />
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        );
    }

    return null;
};
