import * as React from 'react';
import { useEffect, useState } from 'react';
import { ChatHeader } from './ChatHeader';
import { Input, Icon, message, notification } from 'antd';
import classnames from 'classnames';
import '../chatApp.css';
import ConfirmModal from '../../../../common/molecules/Modals/ConfirmModal';
import {
    mockConversations,
    mockMessages,
    mockUsers,
    ConversationType,
    mockCurrentUser,
    MessageType,
    UserType
} from '../mockDataForChat';

const navMenuStyle = {
    backgroundColor: 'lightblue',
    height: '85vh',
    width: '20vh',
    padding: '15px 5px'
};

const mainPageStyle = {
    padding: 10,
    width: '100%'
};

const messagesStyle = {
    backgroundColor: 'lavender',
    borderRadius: 10,
    border: '1px solid ',
    height: '75vh',
    padding: 10,
    overflow: 'scroll',
    display: 'flex'
};

export const ChatApplication = () => {
    const [users, setUsers] = useState<UserType[]>(mockUsers);
    const [currentUser, setCurrentUser] = useState<UserType>(mockCurrentUser);
    const [currentReceiverUser, setCurrentReceiverUser] = useState<UserType | null>(null);
    const [selectedConversation, setSelectedConversation] = useState<ConversationType[] | null>(null);
    const [selectedMessages, setSelectedMessages] = useState<MessageType[]>(
        mockMessages.sort((a, b) => (Number(a.timestamp) < Number(b.timestamp) ? 1 : -1))
    );
    const [inputValue, setInputValue] = useState<string>('');
    const [removeConversationModal, setRemoveConversationModal] = useState<boolean>(false);
    const [recentMessage, setRecentMessage] = useState<MessageType | null>(null);

    useEffect(() => {
        setInputValue('');
        setRecentMessage(null);
    }, [selectedConversation]);

    const setConversation = (user: UserType) => () => {
        const { id } = user;
        const filteredConversation = mockConversations.filter(
            conversation =>
                (conversation.idUser1 === id && conversation.idUser2 === currentUser.id) ||
                (conversation.idUser2 === id && conversation.idUser1 === currentUser.id)
        );
        setCurrentReceiverUser(user);
        setSelectedConversation(filteredConversation);
        setSelectedMessages(mockMessages.filter(message => message.conversationId === filteredConversation[0].id));
    };

    const removeConversation = () => {
        if (removeConversationModal && currentReceiverUser) {
            return (
                <ConfirmModal
                    onCancel={() => setRemoveConversationModal(false)}
                    onOk={deleteConversation}
                    visible={true}
                    text={`Are you sure you want to delete conversation with ${currentReceiverUser.firstname}-${currentReceiverUser.lastname}`}
                    subtext={'This action will remove all messages with this user.'}
                    title={'Delete conversation'}
                />
            );
        }
    };

    const convertTimestamp = (timestamp: string) => {
        if (!timestamp) {
            return 'unavailable';
        } else {
            return new Date(Number(timestamp) * 1000).toUTCString().slice(-24, -4);
        }
    };

    const sendMessage = () => {
        if (recentMessage) {
            mockMessages.forEach((msg, index) => {
                if (msg.id === recentMessage.id) {
                    return (mockMessages[index].message = inputValue);
                }
            });

            const newData = selectedMessages.map(msg =>
                msg.id === recentMessage.id ? { ...msg, message: inputValue } : msg
            );
            setSelectedMessages(newData);
            setRecentMessage(null);
        } else {
            mockMessages.push({
                id: Number((Math.random() * 1000).toFixed()),
                idSender: currentUser.id,
                idReceiver: currentReceiverUser && currentReceiverUser.id,
                timestamp: String(Math.floor(Date.now() / 1000 + 7200)),
                message: inputValue,
                conversationId: selectedConversation && selectedConversation[0].id
            });
            mockMessages.sort((a, b) => (Number(a.timestamp) < Number(b.timestamp) ? 1 : -1));
            setSelectedMessages(
                mockMessages.filter(
                    message => selectedConversation && message.conversationId === selectedConversation[0].id
                )
            );
        }

        setInputValue('');
        setRecentMessage(null);
    };

    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter' && inputValue && inputValue.length > 0) {
            sendMessage();
        } else if (e.key === 'ArrowDown') {
            const senderMessages = selectedMessages.filter(message => message.idSender === currentUser.id);
            const biggestTimestamp = Math.max(...senderMessages.map(msg => Number(msg.timestamp)), 0);
            const lastMessage = senderMessages.find(msg => Number(msg.timestamp) === Number(biggestTimestamp));

            if (lastMessage) {
                setRecentMessage(lastMessage);
            }

            if (recentMessage) {
                setInputValue(recentMessage.message);
            }
        }
    };

    const deleteMessage = (message: MessageType) => () => {
        for (let i = 0; i < mockMessages.length; i++) {
            if (Number(mockMessages[i].id) === Number(message.id)) {
                mockMessages.splice(i, 1);
            }
        }
        setSelectedMessages(
            mockMessages.filter(
                msg => selectedConversation && Number(msg.conversationId) === Number(selectedConversation[0].id)
            )
        );
        setRecentMessage(null);
        notification.success({
            message: 'DELETE',
            placement: 'bottomRight',
            description: 'Message deleted',
            duration: 3
        });
    };

    const deleteConversation = () => {
        for (let i = 0; i < mockMessages.length; i++) {
            // debugger
            for (let j = 0; j < mockMessages.length; j++) {
                if (selectedConversation && selectedConversation[0].id === mockMessages[j].conversationId) {
                    mockMessages.splice(j, 1);
                }
            }
        }
        setSelectedMessages(
            mockMessages.filter(
                msg => selectedConversation && Number(msg.conversationId) === Number(selectedConversation[0].id)
            )
        );
        setRemoveConversationModal(false);
        message.success({ content: 'Conversation deleted', duration: 3 });
    };

    const displayedMessages = () => {
        if (!selectedConversation) {
            return (
                <>
                    <h3>Before you start a conversation, please select a user from the list</h3>
                    <h2>
                        Hi <b>{currentUser.firstname}</b>,
                    </h2>
                </>
            );
        }

        return selectedMessages.map((message, index) => {
            return (
                <p
                    style={{ backgroundColor: 'gainsboro', padding: '2px 8px', margin: 10, borderRadius: 5 }}
                    className={classnames({ 'self-flex-end': message.idSender === currentUser.id }, 'self-flex-start')}
                    key={index}
                >
                    {message.message}
                    <span style={{ color: 'brown', display: 'block', fontSize: 10 }}>
                        {convertTimestamp(message.timestamp)}
                    </span>
                    {message.idSender === currentUser.id ? (
                        <span className="show-delete-btn">
                            <Icon onClick={deleteMessage(message)} type="delete" style={{ fontSize: 12 }} />
                        </span>
                    ) : null}
                </p>
            );
        });
    };

    return (
        <>
            <ChatHeader currentUser={currentUser} />
            <div style={{ display: 'flex' }}>
                <div style={navMenuStyle}>
                    {users.map((user, index) => {
                        return (
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <p
                                    className={classnames(
                                        { 'active-user': currentReceiverUser && currentReceiverUser.id === user.id },
                                        'user-item'
                                    )}
                                    key={index}
                                    onClick={setConversation(user)}
                                    style={{
                                        backgroundColor: '#E9E0D0',
                                        marginRight: 5,
                                        padding: '2px 6px',
                                        borderRadius: 10,
                                        display: 'inline-block',
                                        width: '90%'
                                    }}
                                >
                                    {user.firstname} - {user.lastname}
                                </p>
                                {(selectedConversation &&
                                    (selectedConversation[0].idUser1 === user.id &&
                                        selectedConversation[0].idUser2 === currentUser.id)) ||
                                (selectedConversation &&
                                    selectedConversation[0].idUser2 === user.id &&
                                    selectedConversation[0].idUser1 === currentUser.id) ? (
                                    <Icon
                                        style={{ marginTop: 5 }}
                                        className="del-conv-btn opacity-30"
                                        type="delete"
                                        onClick={() => setRemoveConversationModal(true)}
                                    />
                                ) : null}
                            </div>
                        );
                    })}
                </div>
                <div style={mainPageStyle}>
                    <div style={{ ...messagesStyle, overflowX: 'hidden', flexDirection: 'column-reverse' }}>
                        {displayedMessages()}
                    </div>
                    <div style={{ marginTop: 5, display: 'flex' }}>
                        <Icon style={{ fontSize: 32, marginRight: 10 }} type="laptop" />
                        <Input
                            disabled={Boolean(!currentReceiverUser) || Boolean(!selectedConversation)}
                            onChange={e => setInputValue(e.target.value)}
                            onKeyDown={e => handleKeyDown(e)}
                            placeholder="Your message here"
                            value={inputValue}
                        />
                        <Icon onClick={sendMessage} style={{ fontSize: 32, marginRight: 10 }} type="caret-right" />
                    </div>
                </div>
                {removeConversation()}
            </div>
        </>
    );
};
