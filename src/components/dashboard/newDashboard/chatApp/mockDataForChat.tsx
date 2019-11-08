export interface UserType {
    id: number;
    firstname: string;
    lastname: string;
}

export interface ConversationType {
    id: number;
    idUser1: number;
    idUser2: number;
}

export interface MessageType {
    id: number;
    idSender: number;
    idReceiver: number | null;
    timestamp: string;
    conversationId: number | null;
    message: string;
}

export const mockCurrentUser: UserType = {
    id: 4,
    firstname: 'Marius',
    lastname: 'Casvean'
};

export const mockUsers: UserType[] = [
    {
        id: 1,
        firstname: 'Paul',
        lastname: 'Willis'
    },
    {
        id: 2,
        firstname: 'Martin',
        lastname: 'Walker'
    },
    {
        id: 3,
        firstname: 'Alex',
        lastname: 'Doe'
    },
    // {
    //     // this will be current user
    //     id: 4,
    //     firstname: 'Marius',
    //     lastname: 'Casvean',
    // },
    {
        id: 5,
        firstname: 'Chris',
        lastname: 'Hood'
    }
];

export const mockConversations: ConversationType[] = [
    {
        id: 1,
        idUser1: 4,
        idUser2: 1
    },
    {
        id: 2,
        idUser1: 3,
        idUser2: 4
    },
    {
        id: 3,
        idUser1: 5,
        idUser2: 4
    },
    {
        id: 4,
        idUser1: 2,
        idUser2: 4
    },
    {
        id: 5,
        idUser1: 1,
        idUser2: 2
    },
    {
        id: 6,
        idUser1: 2,
        idUser2: 5
    },
    {
        id: 7,
        idUser1: 1,
        idUser2: 3
    },
    {
        id: 8,
        idUser1: 3,
        idUser2: 5
    }
];

export const mockMessages: MessageType[] = [
    {
        id: 1,
        idSender: 2,
        idReceiver: 4,
        timestamp: '1572430200',
        message: 'React is the best',
        conversationId: 4
    },
    {
        id: 2,
        idSender: 4,
        idReceiver: 2,
        timestamp: '1572430230',
        message: 'Today',
        conversationId: 4
    },
    {
        id: 3,
        idSender: 2,
        idReceiver: 4,
        timestamp: '1572430100',
        message: 'Tomorrow',
        conversationId: 4
    },
    {
        id: 4,
        idSender: 4,
        idReceiver: 2,
        timestamp: '1572430000',
        message: 'This is a test message',
        conversationId: 4
    },
    {
        id: 5,
        idSender: 1,
        idReceiver: 4,
        timestamp: '1572524993',
        message: 'React is the best thing',
        conversationId: 1
    },
    {
        id: 6,
        idSender: 4,
        idReceiver: 1,
        timestamp: '1572431120',
        message: 'That is very nice',
        conversationId: 1
    },
    {
        id: 7,
        idSender: 1,
        idReceiver: 4,
        timestamp: '1572441120',
        message: 'Thanks a lot',
        conversationId: 1
    },
    {
        id: 8,
        idSender: 4,
        idReceiver: 3,
        timestamp: '1572524153',
        message: 'Salutari',
        conversationId: 2
    },
    {
        id: 9,
        idSender: 4,
        idReceiver: 3,
        timestamp: '1572524253',
        message: 'We chat',
        conversationId: 2
    },
    {
        id: 10,
        idSender: 3,
        idReceiver: 4,
        timestamp: '1572524953',
        message: 'Mesaj pentru test',
        conversationId: 2
    },
    {
        id: 11,
        idSender: 4,
        idReceiver: 5,
        timestamp: '1571521243',
        message: 'Buna',
        conversationId: 3
    },
    {
        id: 12,
        idSender: 5,
        idReceiver: 4,
        timestamp: '1571521343',
        message: 'Buna si tie',
        conversationId: 3
    },
    {
        id: 13,
        idSender: 4,
        idReceiver: 5,
        timestamp: '1571521363',
        message: 'Merge treaba?',
        conversationId: 3
    },
    {
        id: 14,
        idSender: 4,
        idReceiver: 5,
        timestamp: '1571521369',
        message: 'Asta e un mesaj mai lung pentru a verifica afisarea lui',
        conversationId: 3
    },
    {
        id: 15,
        idSender: 5,
        idReceiver: 4,
        timestamp: '1571522369',
        message: 'E foarte bine',
        conversationId: 3
    }
];
