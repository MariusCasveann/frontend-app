import { TeamData } from '../CreateTeam';
import { getAllUsers_allUsers } from '../../users/graphql/__generated__/getAllUsers';

export const formLayout = {
    labelCol: { span: 14 },
    wrapperCol: { span: 14 }
};

export const buttonItemLayout = {
    wrapperCol: { span: 14 }
};

export const prepareOptions = (data: TeamData) =>
    (data &&
        data.allUsers &&
        data.allUsers.map((item: getAllUsers_allUsers) => ({
            label: `${item.firstName} ${item.lastName}` || item.login,
            id: item.id
        }))) ||
    [];

export const getTeamFormRules = () => ({
    productOwner: [
        {
            required: true,
            message: 'Please select a product owner'
        }
    ],
    teamMembers: [
        {
            required: true,
            message: 'Please select at least one team member'
        }
    ]
});
