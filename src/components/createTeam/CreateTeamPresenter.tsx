import React, { FormEvent } from 'react';
import { Button, Col, Form, Row } from 'antd';

import { Card } from '../common/molecules/CardLayout/CardLayout';

import './team.css';
import SearchableSelectPresenter, {
    SelectItemProps
} from '../common/molecules/SearchableSelect/SearchableSelectPresenter';
import { buttonItemLayout, formLayout, getTeamFormRules } from './helpers/teamHelper';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { TeamByProductId_teamByProductId } from '../teams/molecules/TeamMembers/graphql/__generated__/TeamByProductId';

const rules = getTeamFormRules();

interface CreateTeamPresenterProps {
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    teamMembersOptions: SelectItemProps[];
    productOwnerOptions: SelectItemProps[];
    setSearchProductOwnerInput: (value: string) => void;
    setSearchTeamMembersInput: (value: string) => void;
    form: WrappedFormUtils;
    loadingTeamMembers: boolean;
    loadingProductOwner: boolean;
    team: TeamByProductId_teamByProductId | null;
}

export default (props: CreateTeamPresenterProps) => {
    const {
        handleSubmit,
        teamMembersOptions,
        productOwnerOptions,
        setSearchProductOwnerInput,
        setSearchTeamMembersInput,
        form: { getFieldDecorator },
        loadingTeamMembers,
        loadingProductOwner,
        team
    } = props;

    return (
        <Card width={100} title={team ? 'Update Team' : 'Create new team'}>
            <Row>
                <Col span={18} offset={6}>
                    <div className="col-12 col-offset-6">
                        <Form layout="vertical" className="team-form" onSubmit={handleSubmit}>
                            <Form.Item label="Product owner" {...formLayout}>
                                {getFieldDecorator('productOwner', {
                                    rules: rules.productOwner,
                                    initialValue: (team && team.productOwner && team.productOwner.id) || undefined
                                })(
                                    <SearchableSelectPresenter
                                        data={productOwnerOptions}
                                        mode="single"
                                        loading={loadingProductOwner}
                                        onSearchCallback={setSearchProductOwnerInput}
                                    />
                                )}
                            </Form.Item>
                            <Form.Item label="Team Members" {...formLayout}>
                                {getFieldDecorator('teamMembers', {
                                    rules: rules.teamMembers,
                                    initialValue:
                                        (team && team.teamMembers && team.teamMembers.map(item => item && item.id)) ||
                                        undefined
                                })(
                                    <SearchableSelectPresenter
                                        data={teamMembersOptions}
                                        mode="multiple"
                                        loading={loadingTeamMembers}
                                        onSearchCallback={setSearchTeamMembersInput}
                                    />
                                )}
                            </Form.Item>
                            <Form.Item {...buttonItemLayout} className="form-buttons-wrapper">
                                <Button type="default" className="margin-right-10">
                                    Cancel
                                </Button>
                                <Button type="default" icon="user" htmlType="submit" className="submit-button">
                                    {team ? 'Update team' : 'Create team'}
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Card>
    );
};
