export interface UserType {
    id: number;
    firstname: string;
    lastname: string;
    username: string;
    password: any;
    roleId: number;
    clinicId?: number;
    specializationId?: number;
}

export interface RoleType {
    id: number;
    role: string;
}

export interface CityType {
    id: number;
    city: string;
}

export interface SpecializationType {
    id: number | undefined;
    specialization: string;
}

export interface ClinicType {
    id: number;
    clinic: string;
    cityId: number;
}

export interface DisponibilityIntervalType {
    id: number;
    day: string;
    userId: number;
    startHour: number;
    endHour: number;
    durationHours: number;
}

export interface SpecializationPerClinicType {
    id: number;
    clinicId: number;
    specializationId: number;
}

export interface AppointmentType {
    id: number;
    userId: number;
    medicId: number | null | undefined;
    cityId: number | null | undefined;
    clinicId: number | null | undefined;
    status: string;
    startHour: number;
    disponibilityIntervalId: number;
    observations?: string;
    specialization?: string;
}

export const mockAppointments: AppointmentType[] = [
    {
        id: 1,
        userId: 11,
        medicId: 1,
        cityId: 1,
        clinicId: 1,
        status: 'New - for Dr. MC - patient david',
        startHour: 8,
        disponibilityIntervalId: 1
    },
    {
        id: 2,
        userId: 19,
        medicId: 1,
        cityId: 1,
        clinicId: 1,
        status: 'New - for Dr. MC - patient xin',
        startHour: 8,
        disponibilityIntervalId: 2
    },
    {
        id: 3,
        userId: 11,
        medicId: 2,
        cityId: 1,
        clinicId: 1,
        status: 'Cancelled',
        startHour: 8,
        disponibilityIntervalId: 3
    },
    {
        id: 4,
        userId: 12,
        medicId: 2,
        cityId: 1,
        clinicId: 1,
        status: 'New - for Dr. AC - patient adrian',
        startHour: 9,
        disponibilityIntervalId: 3
    },
    {
        id: 5,
        userId: 13,
        medicId: 3,
        cityId: 1,
        clinicId: 1,
        status: 'New - for Dr. CC - Patient amy',
        startHour: 8,
        disponibilityIntervalId: 4
    },
    {
        id: 6,
        userId: 14,
        medicId: 3,
        cityId: 1,
        clinicId: 1,
        status: 'New - for Dr. CC-2 - Patient mark',
        startHour: 9,
        disponibilityIntervalId: 4
    },
    {
        id: 7,
        userId: 15,
        medicId: 3,
        cityId: 1,
        clinicId: 1,
        status: 'New - for Dr. CC-3 - patient elisa',
        startHour: 10,
        disponibilityIntervalId: 4
    },
    {
        id: 8,
        userId: 16,
        medicId: 4,
        cityId: 1,
        clinicId: 2,
        status: 'New - for Dr. John - patient nina',
        startHour: 8,
        disponibilityIntervalId: 5
    },
    {
        id: 9,
        userId: 17,
        medicId: 4,
        cityId: 1,
        clinicId: 2,
        status: 'New - for Dr. John - patient sean',
        startHour: 14,
        disponibilityIntervalId: 5
    }
];

export const mockDisponibilityIntervals: DisponibilityIntervalType[] = [
    {
        id: 1,
        day: '2019-10-14',
        userId: 1,
        startHour: 8,
        endHour: 12,
        durationHours: 1
    },
    {
        id: 2,
        day: '2019-11-22',
        userId: 1,
        startHour: 8,
        endHour: 10,
        durationHours: 1
    },
    {
        id: 3,
        day: '2019-11-22',
        userId: 2,
        startHour: 8,
        endHour: 14,
        durationHours: 1
    },
    {
        id: 4,
        day: '2019-11-23',
        userId: 3,
        startHour: 8,
        endHour: 16,
        durationHours: 1
    },
    {
        id: 5,
        day: '2019-11-14',
        userId: 4,
        startHour: 8,
        endHour: 16,
        durationHours: 2
    }
];

export const mockRoles: RoleType[] = [
    {
        id: 1,
        role: 'medic'
    },
    {
        id: 2,
        role: 'patient'
    }
];

export const mockCities: CityType[] = [
    {
        id: 1,
        city: 'Cluj-Napoca'
    },
    {
        id: 2,
        city: 'Bucuresti'
    },
    {
        id: 3,
        city: 'Sibiu'
    }
];

export const mockSpecializations: SpecializationType[] = [
    {
        id: 1,
        specialization: 'Cardiologie'
    },
    {
        id: 2,
        specialization: 'Chirurgie'
    },
    {
        id: 3,
        specialization: 'Stomatologie'
    }
];

export const mockClinics: ClinicType[] = [
    {
        id: 1,
        clinic: 'Clinica Unu Cluj',
        cityId: 1
    },
    {
        id: 2,
        clinic: 'Clinica Doi Cluj ',
        cityId: 1
    },
    {
        id: 3,
        clinic: 'Clinica Bucuresti',
        cityId: 2
    },
    {
        id: 4,
        clinic: 'Clinica Sibiu',
        cityId: 3
    }
];

export const mockSpecializationPerClinic: SpecializationPerClinicType[] = [
    // {
    //     id: 1,
    //     specializationId: 1,
    //     clinicId: 1
    // },
    {
        id: 2,
        specializationId: 2,
        clinicId: 1
    },
    {
        id: 3,
        specializationId: 3,
        clinicId: 1
    },
    // {
    //     id: 4,
    //     specializationId: 1,
    //     clinicId: 2
    // },
    {
        id: 5,
        specializationId: 2,
        clinicId: 2
    },
    {
        id: 6,
        specializationId: 3,
        clinicId: 2
    },
    {
        id: 7,
        specializationId: 1,
        clinicId: 3
    },
    {
        id: 8,
        specializationId: 2,
        clinicId: 3
    },
    {
        id: 9,
        specializationId: 3,
        clinicId: 3
    },
    {
        id: 10,
        specializationId: 1,
        clinicId: 4
    }
];

export const mockUsers: UserType[] = [
    // Medics
    {
        id: 1,
        firstname: 'Marius',
        lastname: 'Casvean',
        username: 'marius',
        password: 'unu',
        roleId: 1,
        clinicId: 1,
        specializationId: 1
    },
    {
        id: 2,
        firstname: 'Alex',
        lastname: 'Cisar',
        username: 'alex',
        password: 'doi',
        roleId: 1,
        clinicId: 1,
        specializationId: 2
    },
    {
        id: 3,
        firstname: 'Cristian',
        lastname: 'Chiriac',
        username: 'cristi',
        password: 'trei',
        roleId: 1,
        clinicId: 1,
        specializationId: 3
    },
    {
        id: 4,
        firstname: 'John',
        lastname: 'Doe',
        username: 'john',
        password: 'patru',
        roleId: 1,
        clinicId: 2,
        specializationId: 1
    },
    {
        id: 5,
        firstname: 'Martin',
        lastname: 'Kroos',
        username: 'martin',
        password: 'cinci',
        roleId: 1,
        clinicId: 2,
        specializationId: 2
    },
    {
        id: 6,
        firstname: 'Brian',
        lastname: 'Hill',
        username: 'brian',
        password: 'sase',
        roleId: 1,
        clinicId: 2,
        specializationId: 3
    },
    {
        id: 7,
        firstname: 'Adam',
        lastname: 'Good',
        username: 'adam',
        password: 'sapte',
        roleId: 1,
        clinicId: 3,
        specializationId: 1
    },
    {
        id: 8,
        firstname: 'Gavin',
        lastname: 'Smith',
        username: 'gavin',
        password: 'opt',
        roleId: 1,
        clinicId: 3,
        specializationId: 2
    },
    {
        id: 9,
        firstname: 'Isaac',
        lastname: 'Newton',
        username: 'isaac',
        password: 'noua',
        roleId: 1,
        clinicId: 3,
        specializationId: 3
    },
    {
        id: 10,
        firstname: 'Susan',
        lastname: 'James',
        username: 'susan',
        password: 'zece',
        roleId: 1,
        clinicId: 4,
        specializationId: 1
    },
    // Patients
    {
        id: 11,
        firstname: 'David',
        lastname: 'Jones',
        username: 'david',
        password: 'one',
        roleId: 2
    },
    {
        id: 12,
        firstname: 'Adrian',
        lastname: 'Ball',
        username: 'adrian',
        password: 'two',
        roleId: 2
    },
    {
        id: 13,
        firstname: 'Amy',
        lastname: 'Henry',
        username: 'amy',
        password: 'three',
        roleId: 2
    },
    {
        id: 14,
        firstname: 'Mark',
        lastname: 'Brown',
        username: 'mark',
        password: 'four',
        roleId: 2
    },
    {
        id: 15,
        firstname: 'Elisa',
        lastname: 'Row',
        username: 'elisa',
        password: 'five',
        roleId: 2
    },
    {
        id: 16,
        firstname: 'Nina',
        lastname: 'Vals',
        username: 'nina',
        password: 'six',
        roleId: 2
    },
    {
        id: 17,
        firstname: 'Sean',
        lastname: 'Tech',
        username: 'sean',
        password: 'seven',
        roleId: 2
    },
    {
        id: 18,
        firstname: 'Joel',
        lastname: 'Ka',
        username: 'joel',
        password: 'eight',
        roleId: 2
    },
    {
        id: 19,
        firstname: 'Xin',
        lastname: 'Hui',
        username: 'xin',
        password: 'nine',
        roleId: 2
    },
    {
        id: 20,
        firstname: 'Jay',
        lastname: 'Down',
        username: 'jay',
        password: 'ten',
        roleId: 2
    }
];
