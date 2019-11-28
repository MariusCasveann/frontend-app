import * as React from 'react';
import { useState } from 'react';
import { Button, Icon, message, Select } from 'antd';
import moment from 'moment';
import ConfirmModal from '../../../../common/molecules/Modals/ConfirmModal';
import { NewAppointment } from './NewAppointmentComponent';
import { NewDisponibility } from './NewDisponibilityComponent';
import {
    mockAppointments,
    mockClinics,
    mockDisponibilityIntervals,
    mockSpecializations,
    mockUsers,
    AppointmentType
} from '../mockDataForCheckMe';

export const Appointments = (props: any) => {
    const { callbackOnLogout, currentUser } = props;
    const disponibilityIntervalsMap = {};
    for (let i = 0; i < mockDisponibilityIntervals.length; i++) {
        disponibilityIntervalsMap[mockDisponibilityIntervals[i].id] = mockDisponibilityIntervals[i];
    }
    const [appointments, setAppointments] = useState<AppointmentType[]>(
        currentUser && currentUser.roleId === 1
            ? mockAppointments
                  .filter(item => item.medicId === currentUser.id)
                  .sort((a, b) =>
                      moment(disponibilityIntervalsMap[a.disponibilityIntervalId].day).diff(
                          disponibilityIntervalsMap[b.disponibilityIntervalId].day
                      )
                  )
            : mockAppointments
                  .filter(item => item.userId === currentUser.id)
                  .sort((a, b) =>
                      moment(disponibilityIntervalsMap[a.disponibilityIntervalId].day).diff(
                          disponibilityIntervalsMap[b.disponibilityIntervalId].day
                      )
                  )
    );
    const [selectedAppointment, setSelectedAppointment] = useState<AppointmentType | null>(null);
    const [appointmentModal, setAppointmentModal] = useState<boolean>(false);
    const [disponibilityModal, setDisponibilityModal] = useState<boolean>(false);
    const [callbackOnSubmitNewDisponibility, setCallbackOnSubmitNewDisponibility] = useState<boolean>(false);
    const [callbackOnSubmit, setCallbackOnSubmit] = useState<boolean>(false);
    const [showHideCancelAppointmentModal, setShowHideCancelAppointmentModal] = useState<boolean>(false);
    const currentHour = Number(moment().format('HH'));
    const currentDate = moment().format('YYYY-MM-DD');

    const logout = () => {
        callbackOnLogout(null);
        localStorage.removeItem('userLogged');
    };

    const renderUserSpecialization = (userSpecializationId: number) => {
        const specialization = mockSpecializations.find(specialization => specialization.id === userSpecializationId);

        if (currentUser && specialization) {
            return `${specialization.specialization}`;
        }

        return null;
    };

    const renderMyAppointments = () => {
        if (appointments && appointments.length) {
            return (
                appointments &&
                appointments.map((item, index) => {
                    const patientName = mockUsers.find(user => user.id === item.userId);
                    const medic = mockUsers.find(user => user.id === item.medicId);
                    const specialization =
                        medic && mockSpecializations.find(speciality => speciality.id === medic.specializationId);
                    const clinicOfAppointment = medic && mockClinics.find(clinic => clinic.id === medic.clinicId);
                    const interval = mockDisponibilityIntervals.find(
                        interval => interval.id === item.disponibilityIntervalId
                    );
                    const checkIfDateIsExpired = () =>
                        interval &&
                        (currentDate > interval.day || (currentDate === interval.day && item.startHour <= currentHour))
                            ? true
                            : false;
                    const renderMessageIfNoDateSelected = () => {
                        if (interval) {
                            return moment(interval.day).format('DD MMMM YYYY');
                        }

                        return `No available date`;
                    };
                    const renderMessageIfNoTimeSelected = () => {
                        if (item.startHour) {
                            return `${item.startHour}:00 - ${interval &&
                                Number(item.startHour) + Number(interval.durationHours)}:00`;
                        }

                        return `Please contact the clinic by phone in order to set up a day`;
                    };

                    return (
                        <div
                            key={index}
                            style={{
                                backgroundColor: 'seashell',
                                marginBottom: 10,
                                padding: 10,
                                borderRadius: 5,
                                boxShadow: '5px 5px 5px grey'
                            }}
                        >
                            {currentUser && currentUser.roleId === 1 ? (
                                <>
                                    <p>
                                        <b>Pacient name: </b>
                                        {patientName && patientName.firstname} {patientName && patientName.lastname}
                                    </p>
                                    <p>
                                        <b>Date: </b>
                                        {renderMessageIfNoDateSelected()}
                                    </p>
                                    <p>
                                        <b>Time: </b>
                                        {renderMessageIfNoTimeSelected()}
                                    </p>
                                    <p>
                                        <b>Observations: </b>
                                        {item.observations || 'None'}
                                    </p>
                                    <p>
                                        <b>Status: </b>
                                        {checkIfDateIsExpired() ? (
                                            <span>
                                                Done <Icon type="check" style={{ color: 'green' }} />
                                            </span>
                                        ) : item.status === 'New' ? (
                                            <span>
                                                {item.status} <Icon type="history" style={{ color: 'blue' }} />
                                            </span>
                                        ) : (
                                            <span>
                                                {item.status} <Icon type="close" style={{ color: 'red' }} />
                                            </span>
                                        )}
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
                                        {clinicOfAppointment && clinicOfAppointment.clinic}
                                    </p>
                                    <p>
                                        <b>Medic: </b>Dr. {medic && medic.firstname} {medic && medic.lastname}
                                    </p>
                                    <p>
                                        <b>Date: </b>
                                        {renderMessageIfNoDateSelected()}
                                    </p>
                                    <p>
                                        <b>Time: </b>
                                        {renderMessageIfNoTimeSelected()}
                                    </p>
                                    <p>
                                        <b>Observations: </b>
                                        {item.observations || 'None'}
                                    </p>
                                    <p>
                                        <b>Status: </b>
                                        {checkIfDateIsExpired() ? (
                                            <span>
                                                Done <Icon type="check" style={{ color: 'green' }} />
                                            </span>
                                        ) : item.status === 'New' ? (
                                            <span>
                                                {item.status} <Icon type="history" style={{ color: 'blue' }} />
                                            </span>
                                        ) : (
                                            <span>
                                                {item.status} <Icon type="close" style={{ color: 'red' }} />
                                            </span>
                                        )}
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

    const renderMedicDisponibility = () => {
        const selectedMedicDisponibilities = mockDisponibilityIntervals
            .filter(item => item.userId === currentUser.id)
            .sort((a, b) => moment(a.day).diff(b.day));

        if (selectedMedicDisponibilities && selectedMedicDisponibilities.length) {
            return selectedMedicDisponibilities.map((item, index) => {
                return (
                    <>
                        <h4>
                            <span
                                style={{
                                    fontSize: 10,
                                    backgroundColor: 'slategrey',
                                    color: 'white',
                                    borderRadius: '50%',
                                    padding: '1px 6px'
                                }}
                            >
                                {index + 1}
                            </span>
                            &nbsp;
                            {moment(item.day).format('DD/MMM/YYYY')} - from {item.startHour}
                            <sup>00</sup> to {item.endHour}
                            <sup>00</sup>
                        </h4>
                    </>
                );
            });
        }

        return <h3>No disponibilities</h3>;
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

        message.warning({
            content: `Appointment cancelled`,
            duration: 4
        });
    };

    const addNewAppointment = () => {
        if (appointmentModal) {
            return (
                <ConfirmModal
                    onCancel={onCancelAddAppointment}
                    onOk={onConfirmCreateNewAppointment}
                    visible={true}
                    text={
                        //@ts-ignore
                        <NewAppointment
                            currentUser={currentUser}
                            callbackSetAppointments={setAppointments}
                            callbackSetAppointmentModal={setAppointmentModal}
                            callbackOnSubmit={callbackOnSubmit}
                            setCallbackOnSubmit={setCallbackOnSubmit}
                        />
                    }
                    title={'Create new appointment'}
                />
            );
        }
    };

    const addNewDisponibility = () => {
        if (disponibilityModal) {
            return (
                <ConfirmModal
                    onCancel={onCancelAddDisponibility}
                    onOk={onConfirmCreateNewDisponibility}
                    visible={true}
                    text={
                        //@ts-ignore
                        <NewDisponibility
                            currentUser={currentUser}
                            callbackSetDisponibilityModal={setDisponibilityModal}
                            callbackOnSubmitNewDisponibility={callbackOnSubmitNewDisponibility}
                            setCallbackOnSubmitNewDisponibility={setCallbackOnSubmitNewDisponibility}
                        />
                    }
                    title={`Add disponibility for Dr. ${currentUser && currentUser.firstname} ${currentUser &&
                        currentUser.lastname}`}
                />
            );
        }
    };

    const onCancelAddAppointment = () => {
        setAppointmentModal(false);
        setCallbackOnSubmit(false);
    };

    const onConfirmCreateNewAppointment = () => {
        setCallbackOnSubmit(true);
    };

    const clickAddNewAppointmentButton = () => {
        setAppointmentModal(true);
        setCallbackOnSubmit(false);
    };

    const onCancelAddDisponibility = () => {
        setDisponibilityModal(false);
        setCallbackOnSubmitNewDisponibility(false);
    };

    const onConfirmCreateNewDisponibility = () => {
        setCallbackOnSubmitNewDisponibility(true);
    };

    const clickAddNewDisponibilityButton = () => {
        setDisponibilityModal(true);
        setCallbackOnSubmitNewDisponibility(false);
    };

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: 0 }}>
                <h2>
                    <span
                        style={{
                            display: 'block',
                            boxShadow: '0 0 3px black',
                            fontSize: 14,
                            backgroundColor: 'lightgreen',
                            borderRadius: 3,
                            textAlign: 'center'
                        }}
                    >
                        Check me doctor
                    </span>
                    Welcome, {currentUser && currentUser.roleId === 1 ? 'Dr.' : ''}{' '}
                    {currentUser && currentUser.firstname}-{currentUser && currentUser.lastname}
                    <Icon type="smile" style={{ marginLeft: 5, color: 'green' }} />
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

            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
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
                    <h2
                        style={{
                            backgroundColor: '#9c9c9c',
                            borderRadius: 5,
                            boxShadow: '5px 5px 5px grey',
                            marginBottom: 30,
                            textAlign: 'center'
                        }}
                    >
                        <Icon type="solution" /> My appointments
                    </h2>
                    {renderMyAppointments()}
                </div>
                <div>
                    {currentUser && currentUser.roleId === 2 ? (
                        <Button type="primary" onClick={clickAddNewAppointmentButton}>
                            <Icon type="plus" /> Add new appointment
                        </Button>
                    ) : null}
                </div>
                {currentUser && currentUser.roleId === 1 ? (
                    <div
                        style={{ marginRight: 30, padding: 10, borderRadius: 5, border: '1px solid black' }}
                        className="bg-disponibilities"
                    >
                        <h3 style={{ textAlign: 'center' }}>
                            <b>My disponibilities</b>
                        </h3>
                        {renderMedicDisponibility()}
                    </div>
                ) : null}
                <div>
                    {currentUser && currentUser.roleId === 1 ? (
                        <Button type="primary" onClick={clickAddNewDisponibilityButton}>
                            <Icon type="plus" /> Add new disponibility
                        </Button>
                    ) : null}
                </div>
            </div>

            {addNewAppointment()}
            {addNewDisponibility()}
            {renderCancelAppointmentModal()}
        </>
    );
};
