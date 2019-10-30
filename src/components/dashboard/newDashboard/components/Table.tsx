import * as React from 'react';
import { useState, useEffect } from 'react';
import classnames from 'classnames';
import { Icon, message, notification, Tooltip } from 'antd';
import { throttle } from 'lodash';
import { mockCurrentUsers, tableHeader, UserType } from '../mockData';
import { UserConsumer } from '../UserContext';
import { SimpleButton } from './SimpleButton';
import ConfirmModal from '../../../common/molecules/Modals/ConfirmModal';
import { createHashHistory } from 'history';

const history = createHashHistory();

export const Table: React.FC = props => {
    const [modal, setShowHideModal] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
    const [warning, setWarning] = useState<boolean>(false);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [newUserFirstName, setUserFirstName] = useState<string>('');
    const [newUserLastName, setUserLastName] = useState<string>('');
    const [currentUsers, setCurrentUsers] = useState<UserType[]>(mockCurrentUsers);
    let theFullName = `${selectedUser && selectedUser.firstName}-${selectedUser && selectedUser.lastName}`;
    const newUser = JSON.parse(`${localStorage.getItem('newUser')}`);

    useEffect(() => {
        if (selectedUser) {
            setUserFirstName(selectedUser.firstName);
            setUserLastName(selectedUser.lastName);
        }
    }, [selectedUser]);

    if (newUser) {
        setCurrentUsers(currentUsers.map((user, index) => (user.id === newUser.id ? newUser : user)));
        localStorage.removeItem('newUser');
    }

    const showConfirmModal = () => {
        if (modal && selectedUser) {
            return (
                <ConfirmModal
                    onCancel={onCancel}
                    onOk={onOk}
                    visible={true}
                    text={`Are you sure you want to delete ${theFullName}`}
                    title={'Delete user'}
                />
            );
        }
    };

    const onOk = () => {
        if (selectedUser) {
            let currentUsersFiltered = currentUsers.filter(user => user.id !== selectedUser.id);
            setCurrentUsers(currentUsersFiltered);
            notification.success({
                message: 'SUCCESS',
                placement: 'bottomRight',
                description: `${theFullName} was deleted`
            });
        }
        setShowHideModal(false);
        setSelectedUser(null);
    };

    const onCancel = () => {
        notification.warning({ message: 'CANCEL', placement: 'bottomRight', description: 'This action was revoked' });
        setShowHideModal(false);
        setSelectedUser(null);
    };

    //@ts-ignore
    let checkInput = onChange => (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    // @ts-ignore
    const editUser = ({ value, onChange }) => {
        return (
            <>
                <div className="bg-user-edit" style={{ display: 'flex', flexDirection: 'row' }}>
                    <input type="text" onChange={checkInput(onChange)} value={value} maxLength={20} />
                    <Tooltip placement="top" title="Maximum 20 characters">
                        <Icon style={{ marginLeft: 10, marginTop: 8 }} type="exclamation-circle" />
                    </Tooltip>
                </div>
            </>
        );
    };

    const onSaveUser = throttle(() => {
        if (newUserFirstName && newUserFirstName.length > 2 && newUserLastName && newUserLastName.length > 2) {
            if (selectedUser && selectedUser.firstName && selectedUser.lastName) {
                selectedUser.firstName = newUserFirstName;
                selectedUser.lastName = newUserLastName;
                notification.success({
                    message: 'SUCCESS',
                    placement: 'bottomRight',
                    description: `User with id ${selectedUser.id} was updated successfully`
                });
            }
            setSelectedUser(null);
            setEditMode(false);
        } else {
            if (
                (!newUserFirstName && !newUserLastName) ||
                (newUserFirstName && newUserFirstName.length <= 2 && newUserLastName && newUserLastName.length <= 2) ||
                (!newUserFirstName && newUserLastName && newUserLastName.length <= 2) ||
                (!newUserLastName && newUserFirstName && newUserFirstName.length <= 2)
            ) {
                message.error({
                    content: 'Firstame and lastname should be longer than 2 characters, each!',
                    duration: 4
                });
            } else if (!newUserFirstName || (newUserFirstName && newUserFirstName.length <= 2)) {
                message.error({ content: 'Firstame should be longer than 2 characters!', duration: 4 });
            } else if (!newUserLastName || (newUserLastName && newUserLastName.length <= 2)) {
                message.error({ content: 'Lastame should be longer than 2 characters!', duration: 4 });
            }
        }
    }, 5000);

    const onCancelSaveUser = () => {
        notification.warning({ message: 'CANCEL', placement: 'bottomRight', description: 'This action was revoked' });
        setSelectedUser(null);
        setEditMode(false);
    };

    const updateCancelButtons = () => {
        return (
            <>
                <SimpleButton
                    callbackOnClick={onCancelSaveUser}
                    icon={<Icon type="close" />}
                    style={{ color: 'black', backgroundColor: 'lightcoral', fontSize: 10 }}
                    label="Cancel"
                />
                <SimpleButton
                    callbackOnClick={onSaveUser}
                    icon={<Icon type="check" />}
                    style={{ color: 'black', backgroundColor: 'turquoise', fontSize: 10 }}
                    label="Save"
                />
            </>
        );
    };

    const clickEditBtn = (user: UserType) => () => {
        setSelectedUser(user);
        setEditMode(true);
    };

    const clickDeleteBtn = (user: UserType) => () => {
        setEditMode(false);
        setShowHideModal(true);
        setSelectedUser(user);
    };

    const clickNewEditBtn = (user: UserType) => () => {
        history.push(`/new-dashboard/edit-user/${user.firstName}-${user.lastName}`);
        localStorage.setItem('selectedUser', JSON.stringify(user));
    };

    const actionsButtons = (user: UserType) => {
        return (
            <>
                <SimpleButton
                    label="Edit"
                    disabled={Boolean(selectedUser)}
                    style={{ fontSize: 12, color: 'darkblue' }}
                    icon={<Icon type="edit" />}
                    callbackOnClick={clickEditBtn(user)}
                />
                <SimpleButton
                    label="Delete"
                    disabled={Boolean(selectedUser)}
                    style={{ fontSize: 12, color: 'darkred' }}
                    icon={<Icon type="delete" />}
                    callbackOnClick={clickDeleteBtn(user)}
                />
                <SimpleButton
                    label="New edit"
                    disabled={Boolean(selectedUser)}
                    style={{ fontSize: 12, color: 'darkcyan' }}
                    icon={<Icon type="form" />}
                    callbackOnClick={clickNewEditBtn(user)}
                />
            </>
        );
    };

    const showWarning = () => {
        if (warning) {
            return (
                <span style={{ fontSize: 10, color: 'darkred' }}>
                    You can not type anymore <Icon type="exclamation-circle" />
                </span>
            );
        }
    };

    return (
        <UserConsumer>
            {value => {
                const { inputValue } = value;
                let filteredUsers: UserType[];

                if (inputValue.length === 20) {
                    setWarning(true);
                } else {
                    setWarning(false);
                }

                inputValue.length > 2
                    ? (filteredUsers = currentUsers.filter(user => {
                          return (
                              user.firstName.toLowerCase().includes(inputValue.toLowerCase()) ||
                              user.lastName.toLowerCase().includes(inputValue.toLowerCase()) ||
                              user.lastName
                                  .toLowerCase()
                                  .concat(' ', user.firstName.toLowerCase())
                                  .includes(inputValue.toLowerCase()) ||
                              user.firstName
                                  .toLowerCase()
                                  .concat(' ', user.lastName.toLowerCase())
                                  .includes(inputValue.toLowerCase())
                          );
                      }))
                    : (filteredUsers = currentUsers);

                const tableBody = () => {
                    if (filteredUsers && !filteredUsers.length) {
                        return (
                            <tr>
                                <td>No user found</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                            </tr>
                        );
                    }

                    if (filteredUsers && filteredUsers.length) {
                        return filteredUsers.map((item, index) => (
                            <tr className="user" key={index}>
                                <td>{item.id}</td>
                                <td>
                                    {item && item.imageUrl ? (
                                        <img
                                            style={{ width: 18, height: 18, borderRadius: '50%', marginLeft: -5 }}
                                            src={item && item.imageUrl}
                                        />
                                    ) : (
                                        <Icon type="user" />
                                    )}
                                    &nbsp;
                                    {editMode && selectedUser && selectedUser.id === item.id
                                        ? editUser({ value: newUserFirstName, onChange: setUserFirstName })
                                        : item.firstName}
                                </td>
                                <td>
                                    {editMode && selectedUser && selectedUser.id === item.id
                                        ? editUser({ value: newUserLastName, onChange: setUserLastName })
                                        : item.lastName}
                                </td>
                                <td
                                    className={classnames({
                                        'bg-user-edit': editMode && selectedUser && selectedUser.id === item.id
                                    })}
                                >
                                    {item.country}
                                </td>
                                <td style={{ display: 'flex' }}>
                                    {editMode && selectedUser && selectedUser.id === item.id
                                        ? updateCancelButtons()
                                        : actionsButtons(item)}
                                </td>
                            </tr>
                        ));
                    }
                };

                return (
                    <div style={{ padding: 10 }}>
                        <p>
                            Users found:{' '}
                            <b>
                                {filteredUsers && filteredUsers.length}/{currentUsers && currentUsers.length}
                            </b>
                        </p>
                        <p style={{ fontSize: 11, display: 'inline' }}>Characters left: {20 - inputValue.length}/20</p>{' '}
                        {showWarning()}
                        <table style={{ border: '1px solid grey', width: '100%' }}>
                            <thead>
                                <tr style={{ background: 'khaki' }}>
                                    <th>{tableHeader.id}</th>
                                    <th>{tableHeader.firstname}</th>
                                    <th>{tableHeader.lastname}</th>
                                    <th>{tableHeader.country}</th>
                                    <th>{tableHeader.actions}</th>
                                </tr>
                            </thead>
                            <tbody>{tableBody()}</tbody>
                        </table>
                        {showConfirmModal()}
                    </div>
                );
            }}
        </UserConsumer>
    );
};
