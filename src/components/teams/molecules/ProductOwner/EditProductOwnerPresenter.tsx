import React from 'react';
import { Form, Modal } from 'antd';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import { formLayout, getTeamFormRules } from '../../../createTeam/helpers/teamHelper';
import { TeamByProductId_teamByProductId } from '../TeamMembers/graphql/__generated__/TeamByProductId';
import SearchableSelectPresenter, {
    SelectItemProps
} from '../../../common/molecules/SearchableSelect/SearchableSelectPresenter';

interface EditProductOwnerPresenterProps {
    getFieldDecorator: (id: string, options: GetFieldDecoratorOptions) => (node: React.ReactNode) => React.ReactNode;
    team: TeamByProductId_teamByProductId;
    productOwnerOptions: SelectItemProps[];
    loadingProductOwner: boolean;
    setSearchProductOwnerInput: (value: string) => void;
    changeProductOwner: boolean;
    setChangeProductOwner: (flag: boolean) => void;
    handleSubmit: (e: React.MouseEvent<HTMLElement>) => void;
}

export default (props: EditProductOwnerPresenterProps) => {
    const {
        getFieldDecorator,
        team,
        changeProductOwner,
        setChangeProductOwner,
        handleSubmit,
        productOwnerOptions,
        loadingProductOwner,
        setSearchProductOwnerInput
    } = props;
    const rules = getTeamFormRules();

    if (changeProductOwner) {
        return (
            <Modal
                title="Edit product owner"
                visible={changeProductOwner}
                onCancel={() => setChangeProductOwner(false)}
                onOk={handleSubmit}
            >
                <Form layout="vertical" className="team-form">
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
                </Form>
            </Modal>
        );
    }

    return null;
};
