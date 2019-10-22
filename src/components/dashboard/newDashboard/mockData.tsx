export interface UserType {
    country: string;
    activated: boolean;
    email: string;
    firstName: string;
    id: number;
    lastName: string;
    subscribedToNewsletter: boolean;
}

export const mockCurrentUsers: UserType[] = [
    {
        country: 'Chile',
        activated: true,
        email: 'test@mediamarktsaturn.com',
        firstName: 'John',
        id: 10,
        lastName: 'Doe',
        subscribedToNewsletter: true
    },
    {
        country: 'Italy',
        activated: false,
        email: 'test@mediamarktsaturn.com',
        firstName: 'Paul',
        id: 20,
        lastName: 'Williams',
        subscribedToNewsletter: true
    },
    {
        country: 'Spain',
        activated: false,
        email: 'test@mediamarktsaturn.com',
        firstName: 'Roger',
        id: 30,
        lastName: 'Anderson',
        subscribedToNewsletter: true
    },
    {
        country: 'Finland',
        activated: true,
        email: 'test@mediamarktsaturn.com',
        firstName: 'Kevin',
        id: 40,
        lastName: 'Hood',
        subscribedToNewsletter: true
    },
    {
        country: 'Germany',
        activated: true,
        email: 'test@mediamarktsaturn.com',
        firstName: 'Mario',
        id: 50,
        lastName: 'Kenvelo',
        subscribedToNewsletter: true
    },
    {
        country: 'Uruguay',
        activated: false,
        email: 'test@mediamarktsaturn.com',
        firstName: 'Michael',
        id: 60,
        lastName: 'Anderson',
        subscribedToNewsletter: true
    },
    {
        country: 'Italy',
        activated: true,
        email: 'test@mediamarktsaturn.com',
        firstName: 'Juan',
        id: 70,
        lastName: 'Totti',
        subscribedToNewsletter: true
    },
    {
        country: 'Spain',
        activated: false,
        email: 'test@mediamarktsaturn.com',
        firstName: 'Ali',
        id: 80,
        lastName: 'Jean',
        subscribedToNewsletter: true
    },
    {
        country: 'Greece',
        activated: true,
        email: 'test@mediamarktsaturn.com',
        firstName: 'Brian',
        id: 90,
        lastName: 'Klopp',
        subscribedToNewsletter: true
    },
    {
        country: 'SUA',
        activated: true,
        email: 'test@mediamarktsaturn.com',
        firstName: 'Santiago',
        id: 100,
        lastName: 'Arabesque',
        subscribedToNewsletter: true
    },
    {
        country: 'Germany',
        activated: false,
        email: 'test@mediamarktsaturn.com',
        firstName: 'Karl',
        id: 110,
        lastName: 'May',
        subscribedToNewsletter: false
    },
    {
        country: 'Italy',
        activated: true,
        email: 'test@mediamarktsaturn.com',
        firstName: 'Maria',
        id: 120,
        lastName: 'Anderson',
        subscribedToNewsletter: false
    },
    {
        country: 'Argentina',
        activated: false,
        email: 'test@mediamarktsaturn.com',
        firstName: 'Bruce',
        id: 130,
        lastName: 'Willis',
        subscribedToNewsletter: true
    },
    {
        country: 'Brasil',
        activated: true,
        email: 'test@mediamarktsaturn.com',
        firstName: 'Maximilian',
        id: 140,
        lastName: 'Dowe',
        subscribedToNewsletter: false
    },
    {
        country: 'Greece',
        activated: true,
        email: 'test@mediamarktsaturn.com',
        firstName: 'George',
        id: 150,
        lastName: 'Clean',
        subscribedToNewsletter: false
    },
    {
        country: 'Argentina',
        activated: true,
        email: 'test@mediamarktsaturn.com',
        firstName: 'Brian',
        id: 160,
        lastName: 'John',
        subscribedToNewsletter: false
    },
    {
        country: 'Italy',
        activated: true,
        email: 'test@mediamarktsaturn.com',
        firstName: 'Michael',
        id: 170,
        lastName: 'Kroos',
        subscribedToNewsletter: false
    },
    {
        country: 'Uruguay',
        activated: false,
        email: 'test@mediamarktsaturn.com',
        firstName: 'Kevin',
        id: 180,
        lastName: 'Dalin',
        subscribedToNewsletter: false
    },
    {
        country: 'Germany',
        activated: true,
        email: 'test@mediamarktsaturn.com',
        firstName: 'John',
        id: 190,
        lastName: 'Willis',
        subscribedToNewsletter: false
    },
    {
        country: 'Italy',
        activated: true,
        email: 'test@mediamarktsaturn.com',
        firstName: 'Alfonso',
        id: 200,
        lastName: 'Jean',
        subscribedToNewsletter: false
    },
    {
        country: 'Germany',
        activated: true,
        email: 'test@mediamarktsaturn.com',
        firstName: 'Michael',
        id: 210,
        lastName: 'Andersonen',
        subscribedToNewsletter: false
    },
    {
        country: 'Greece',
        activated: false,
        email: 'test@mediamarktsaturn.com',
        firstName: 'George',
        id: 220,
        lastName: 'Cleans',
        subscribedToNewsletter: false
    }
];

export const tableHeader = {
    firstname: 'Firstname',
    lastname: 'Lastname',
    country: 'Country',
    id: 'ID',
    actions: 'Actions'
};
