export interface UserType {
    id: number;
    firstName: string;
    lastName: string;
    username?: string;
    country: string;
    activated: boolean;
    email: string;
    subscribedToNewsletter: boolean;
    phoneNumber?: string | number | null | undefined;
    nationality?: string;
    picture?: any;
    dateOfBirth?: string | undefined | any;
    avatar?: any;
    languages?: string[];
    addresses?: AddressType[] | undefined;
    imageUrl?: string;
}

export interface AddressType {
    country: string;
    city: string;
    street: string;
    number: number;
}

interface TableHeaderType {
    firstname: string;
    lastname: string;
    country: string;
    id: string;
    actions: string;
}

export const tableHeader: TableHeaderType = {
    firstname: 'Firstname',
    lastname: 'Lastname',
    country: 'Country',
    id: 'ID',
    actions: 'Actions'
};

export const mockCurrentUsers: UserType[] = [
    {
        country: 'Chile',
        activated: true,
        email: 'test@mediamarktsaturn.com',
        firstName: 'John',
        id: 10,
        lastName: 'Doe',
        subscribedToNewsletter: true,
        username: '',
        phoneNumber: null,
        nationality: '',
        picture: '',
        dateOfBirth: ''
    },
    {
        country: 'Italy',
        activated: false,
        email: 'test@mediamarktsaturn.com',
        firstName: 'Paul',
        id: 20,
        lastName: 'Williams',
        subscribedToNewsletter: true,
        username: '',
        phoneNumber: null,
        nationality: '',
        picture: '',
        dateOfBirth: ''
    },
    {
        country: 'Spain',
        activated: false,
        email: 'test@mediamarktsaturn.com',
        firstName: 'Roger',
        id: 30,
        lastName: 'Anderson',
        subscribedToNewsletter: true,
        username: '',
        phoneNumber: null,
        nationality: '',
        picture: '',
        dateOfBirth: ''
    },
    {
        country: 'Finland',
        activated: true,
        email: 'test@mediamarktsaturn.com',
        firstName: 'Kevin',
        id: 40,
        lastName: 'Hood',
        subscribedToNewsletter: true,
        username: '',
        phoneNumber: null,
        nationality: '',
        picture: '',
        dateOfBirth: ''
    },
    {
        country: 'Germany',
        activated: true,
        email: 'test@mediamarktsaturn.com',
        firstName: 'Mario',
        id: 50,
        lastName: 'Kenvelo',
        subscribedToNewsletter: true,
        username: '',
        phoneNumber: null,
        nationality: '',
        picture: '',
        dateOfBirth: ''
    },
    {
        country: 'Uruguay',
        activated: false,
        email: 'test@mediamarktsaturn.com',
        firstName: 'Michael',
        id: 60,
        lastName: 'Anderson',
        subscribedToNewsletter: true,
        username: '',
        phoneNumber: null,
        nationality: '',
        picture: '',
        dateOfBirth: ''
    },
    {
        country: 'Italy',
        activated: true,
        email: 'test@mediamarktsaturn.com',
        firstName: 'Juan',
        id: 70,
        lastName: 'Totti',
        subscribedToNewsletter: true,
        username: '',
        phoneNumber: null,
        nationality: '',
        picture: '',
        dateOfBirth: ''
    },
    {
        country: 'Spain',
        activated: false,
        email: 'test@mediamarktsaturn.com',
        firstName: 'Ali',
        id: 80,
        lastName: 'Jean',
        subscribedToNewsletter: true,
        username: '',
        phoneNumber: null,
        nationality: '',
        picture: '',
        dateOfBirth: ''
    },
    {
        country: 'Greece',
        activated: true,
        email: 'test@mediamarktsaturn.com',
        firstName: 'Brian',
        id: 90,
        lastName: 'Klopp',
        subscribedToNewsletter: true,
        username: '',
        phoneNumber: null,
        nationality: '',
        picture: '',
        dateOfBirth: ''
    },
    {
        country: 'SUA',
        activated: true,
        email: 'test@mediamarktsaturn.com',
        firstName: 'Santiago',
        id: 100,
        lastName: 'Arabesque',
        subscribedToNewsletter: true,
        username: '',
        phoneNumber: null,
        nationality: '',
        picture: '',
        dateOfBirth: ''
    },
    {
        country: 'Germany',
        activated: false,
        email: 'test@mediamarktsaturn.com',
        firstName: 'Karl',
        id: 110,
        lastName: 'May',
        subscribedToNewsletter: false,
        username: '',
        phoneNumber: null,
        nationality: '',
        picture: '',
        dateOfBirth: ''
    },
    {
        country: 'Italy',
        activated: true,
        email: 'test@mediamarktsaturn.com',
        firstName: 'Maria',
        id: 120,
        lastName: 'Anderson',
        subscribedToNewsletter: false,
        username: '',
        phoneNumber: null,
        nationality: '',
        picture: '',
        dateOfBirth: ''
    },
    {
        country: 'Argentina',
        activated: false,
        email: 'test@mediamarktsaturn.com',
        firstName: 'Bruce',
        id: 130,
        lastName: 'Willis',
        subscribedToNewsletter: true,
        username: '',
        phoneNumber: null,
        nationality: '',
        picture: '',
        dateOfBirth: ''
    },
    {
        country: 'Brasil',
        activated: true,
        email: 'test@mediamarktsaturn.com',
        firstName: 'Maximilian',
        id: 140,
        lastName: 'Dowe',
        subscribedToNewsletter: false,
        username: '',
        phoneNumber: null,
        nationality: '',
        picture: '',
        dateOfBirth: ''
    },
    {
        country: 'Greece',
        activated: true,
        email: 'test@mediamarktsaturn.com',
        firstName: 'George',
        id: 150,
        lastName: 'Clean',
        subscribedToNewsletter: false,
        username: '',
        phoneNumber: null,
        nationality: '',
        picture: '',
        dateOfBirth: ''
    },
    {
        country: 'Argentina',
        activated: true,
        email: 'test@mediamarktsaturn.com',
        firstName: 'Brian',
        id: 160,
        lastName: 'John',
        subscribedToNewsletter: false,
        username: '',
        phoneNumber: null,
        nationality: '',
        picture: '',
        dateOfBirth: ''
    },
    {
        country: 'Italy',
        activated: true,
        email: 'test@mediamarktsaturn.com',
        firstName: 'Michael',
        id: 170,
        lastName: 'Kroos',
        subscribedToNewsletter: false,
        username: '',
        phoneNumber: null,
        nationality: '',
        picture: '',
        dateOfBirth: ''
    },
    {
        country: 'Uruguay',
        activated: false,
        email: 'test@mediamarktsaturn.com',
        firstName: 'Kevin',
        id: 180,
        lastName: 'Dalin',
        subscribedToNewsletter: false,
        username: '',
        phoneNumber: null,
        nationality: '',
        picture: '',
        dateOfBirth: ''
    },
    {
        country: 'Germany',
        activated: true,
        email: 'test@mediamarktsaturn.com',
        firstName: 'John',
        id: 190,
        lastName: 'Willis',
        subscribedToNewsletter: false,
        username: '',
        phoneNumber: null,
        nationality: '',
        picture: '',
        dateOfBirth: ''
    },
    {
        country: 'Italy',
        activated: true,
        email: 'test@mediamarktsaturn.com',
        firstName: 'Alfonso',
        id: 200,
        lastName: 'Jean',
        subscribedToNewsletter: false,
        username: '',
        phoneNumber: null,
        nationality: '',
        picture: '',
        dateOfBirth: ''
    },
    {
        country: 'Germany',
        activated: true,
        email: 'test@mediamarktsaturn.com',
        firstName: 'Michael',
        id: 210,
        lastName: 'Andersonen',
        subscribedToNewsletter: false,
        username: '',
        phoneNumber: null,
        nationality: '',
        picture: '',
        dateOfBirth: ''
    },
    {
        country: 'Greece',
        activated: false,
        email: 'test@mediamarktsaturn.com',
        firstName: 'George',
        id: 220,
        lastName: 'Cleans',
        subscribedToNewsletter: false,
        username: '',
        phoneNumber: null,
        nationality: '',
        picture: '',
        dateOfBirth: ''
    }
];

export const nationalities: string[] = ['Romanian', 'German', 'Italian', 'Spanish', 'Hungarian', 'French', 'English'];

export const foreignLanguages: string[] = [
    'Romanian',
    'German',
    'Italian',
    'Spanish',
    'Hungarian',
    'French',
    'English'
];

export const countries: string[] = ['Romania', 'Germany', 'Spain', 'Italy', 'Greece', 'Chile', 'China'];

export const cities: string[] = ['Cluj-Napoca', 'Munchen', 'Madrid', 'Venice', 'Athene', 'Beijing'];
