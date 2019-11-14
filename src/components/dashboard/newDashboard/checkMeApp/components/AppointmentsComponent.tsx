import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button, Icon, Input } from 'antd';
import moment from 'moment';
import ConfirmModal from '../../../../common/molecules/Modals/ConfirmModal';
import {
    mockAppointments,
    mockCities,
    mockClinics,
    mockDisponibilityIntervals,
    mockRoles,
    mockSpecializations,
    mockSpecializationPerClinic,
    mockUsers,
    AppointmentType,
    CityType,
    ClinicType,
    RoleType,
    SpecializationType,
    SpecializationPerClinicType,
    UserType
} from '../mockDataForCheckMe';

export const Appointments = (props: any) => {
    const { callbackOnLogout, currentUser } = props;
    const [appointments, setAppointments] = useState<AppointmentType[]>(
        currentUser && currentUser.roleId === 1
            ? mockAppointments.filter(item => item.medicId === currentUser.id)
            : mockAppointments.filter(item => item.userId === currentUser.id)
    );
    const [selectedAppointment, setSelectedAppointment] = useState<AppointmentType | null>(null);
    const [appointmentModal, setAppointmentModal] = useState<boolean>(false);
    const [showHideCancelAppointmentModal, setShowHideCancelAppointmentModal] = useState<boolean>(false);
    const currentHour = Number(moment().format('HH'));
    const currentDate = moment().format('YYYY-MM-DD');

    const logout = () => {
        callbackOnLogout(null);
        localStorage.removeItem('userLogged');
    };

    const renderUserSpecialization = (userSpecializationId: any) => {
        const specialization = mockSpecializations.find(specialization => specialization.id === userSpecializationId);

        if (currentUser && specialization) {
            return `${specialization.specialization}`;
        }

        return null;
    };

    const getMyAppointments = () => {
        if (appointments && appointments.length) {
            return (
                appointments &&
                appointments.map((item, index) => {
                    const patientName = mockUsers.find(user => user.id === item.userId);
                    const medic = mockUsers.find(user => user.id === item.medicId);
                    const specialization =
                        medic && mockSpecializations.find(speciality => speciality.id === medic.specializationId);
                    const clinic = medic && mockClinics.find(clinic => clinic.id === medic.clinicId);
                    const interval = mockDisponibilityIntervals.find(
                        interval => interval.id === item.disponibilityIntervalId
                    );
                    const day = interval ? moment(interval.day) : '';
                    const checkIfDateIsExpired = () =>
                        interval &&
                        (currentDate > interval.day || (currentDate === interval.day && item.startHour <= currentHour))
                            ? true
                            : false;

                    return (
                        <div
                            key={index}
                            style={{ backgroundColor: 'seashell', marginBottom: 5, padding: 10, borderRadius: 5 }}
                        >
                            {currentUser && currentUser.roleId === 1 ? (
                                <>
                                    <p>
                                        <b>Pacient name: </b>
                                        {patientName && patientName.firstname} {patientName && patientName.lastname}
                                    </p>
                                    <p>
                                        <b>Date: </b>
                                        {interval && moment(interval.day).format('DD MMMM YYYY')}
                                    </p>
                                    <p>
                                        <b>Time: </b>
                                        {`${item.startHour}:00 - ${interval &&
                                            Number(item.startHour) + Number(interval.durationHours)}:00`}
                                    </p>
                                    <p>
                                        <b>Status: </b>
                                        {checkIfDateIsExpired() ? 'Done' : item.status}
                                    </p>
                                </>
                            ) : (
                                <>
                                    <p>
                                        <b>Specialization: </b>
                                        {specialization && specialization.specialization}
                                    </p>
                                    <p>
                                        <b>Clinic: </b>
                                        {clinic && clinic.name}
                                    </p>
                                    <p>
                                        <b>Medic: </b>Dr. {medic && medic.firstname} {medic && medic.lastname}
                                    </p>
                                    <p>
                                        <b>Date: </b>
                                        {interval && moment(interval.day).format('DD MMMM YYYY')}
                                    </p>
                                    <p>
                                        <b>Time: </b>
                                        {`${item.startHour}:00 - ${interval &&
                                            Number(item.startHour) + Number(interval.durationHours)}:00`}
                                    </p>
                                    <p>
                                        <b>Status: </b>
                                        {checkIfDateIsExpired() ? 'Done' : item.status}
                                    </p>
                                </>
                            )}
                            {!checkIfDateIsExpired() && item.status !== 'Cancelled' && (
                                <Button
                                    style={{ backgroundColor: 'indianred', color: 'white' }}
                                    onClick={onClickCancelAppointmentBtn(item)}
                                >
                                    <Icon type="close" /> Cancel this appointment
                                </Button>
                            )}
                        </div>
                    );
                })
            );
        }

        return <h3 style={{ textAlign: 'center' }}>No appointments available</h3>;
    };

    const onClickCancelAppointmentBtn = (item: AppointmentType) => () => {
        setShowHideCancelAppointmentModal(true);
        setSelectedAppointment(item);
    };

    const renderCancelAppointmentModal = () => {
        if (showHideCancelAppointmentModal) {
            return (
                <ConfirmModal
                    onCancel={onCancelAppointment}
                    onOk={onConfirmCancelAppointment}
                    visible={true}
                    text={'Are you sure you want to cancel this appointment?'}
                    title={'Cancel appointment'}
                />
            );
        }
    };

    const onCancelAppointment = () => {
        setShowHideCancelAppointmentModal(false);
        setSelectedAppointment(null);
    };

    const onConfirmCancelAppointment = () => {
        const updatedAppointments: AppointmentType[] = appointments.map(app => {
            if (selectedAppointment && app.id === selectedAppointment.id) {
                return { ...app, status: 'Cancelled' };
            } else {
                return app;
            }
        });

        mockAppointments.forEach(app => {
            if (selectedAppointment && app.id === selectedAppointment.id) {
                return (app.status = 'Cancelled');
            }
        });

        setAppointments(updatedAppointments);
        setShowHideCancelAppointmentModal(false);
        setSelectedAppointment(null);
    };

    console.log('APPOINTMENTS: ', appointments);
    console.log('MOCK APPOINTMENTS: ', mockAppointments);

    const addNewAppointment = () => {
        if (appointmentModal) {
            return (
                <ConfirmModal
                    onCancel={onCancelAddAppointment}
                    onOk={createAppointment}
                    visible={true}
                    text={newAppointmentBody()}
                    title={'Create new appointment'}
                />
            );
        }
    };

    const onCancelAddAppointment = () => {
        setAppointmentModal(false);
    };

    const createAppointment = () => {
        console.log('Confirm');
        setAppointmentModal(false);
    };

    // sa fie componenta separata - form
    const newAppointmentBody = () => {
        return (
            <>
                <Input placeholder="Patient name here" />
            </>
        );
    };

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: 0 }}>
                <h2>
                    Welcome, {currentUser && currentUser.roleId === 1 ? 'Dr.' : ''}{' '}
                    {currentUser && currentUser.firstname}-{currentUser && currentUser.lastname}
                </h2>
                <Button type="danger" onClick={logout}>
                    <Icon type="poweroff" />
                    Logout
                </Button>
            </div>
            <h3 style={{ marginBottom: 50 }}>
                {currentUser && currentUser.roleId === 1
                    ? `Specialist ${renderUserSpecialization(currentUser && currentUser.specializationId)}`
                    : null}
            </h3>

            <div style={{ display: 'flex' }}>
                <div
                    style={{
                        background: 'lightgrey',
                        border: '1px solid black',
                        marginRight: 30,
                        borderRadius: 5,
                        padding: 10,
                        width: '30%'
                    }}
                >
                    <h2 style={{ marginBottom: 30, borderBottom: '1px solid black', textAlign: 'center' }}>
                        <Icon type="solution" /> My appointments
                    </h2>
                    {getMyAppointments()}
                </div>
                <div>
                    {currentUser && currentUser.roleId === 2 ? (
                        <Button type="primary" onClick={() => setAppointmentModal(true)}>
                            <Icon type="plus" /> Add new appointment
                        </Button>
                    ) : null}
                </div>
            </div>

            {addNewAppointment()}
            {renderCancelAppointmentModal()}
        </>
    );
};
