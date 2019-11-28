import * as React from 'react';
import { useState, useEffect } from 'react';
import moment from 'moment';
import { Button, Form, Icon, message, Radio, Select } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import {
    mockAppointments,
    mockCities,
    mockClinics,
    mockDisponibilityIntervals,
    mockSpecializations,
    mockSpecializationPerClinic,
    mockUsers,
    AppointmentType,
    CityType,
    ClinicType,
    DisponibilityIntervalType,
    SpecializationType,
    SpecializationPerClinicType,
    UserType
} from '../mockDataForCheckMe';

const formItemLayout = {
    labelCol: {
        xs: { span: 14 },
        sm: { span: 8 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 10 }
    }
};

const availableIntervalsLayout = {
    wrapperCol: {
        xs: { span: 10 },
        sm: { span: 36 }
    }
};

interface HourAvailabilityType {
    hour: number;
    available: boolean;
}

const NewAppointmentForm = (props: any) => {
    const {
        currentUser,
        callbackOnSubmit,
        callbackSetAppointments,
        callbackSetAppointmentModal,
        form,
        setCallbackOnSubmit
    } = props;
    const { getFieldDecorator, getFieldValue, resetFields, setFieldsValue } = form;

    const [cities, setCities] = useState<CityType[] | null>(mockCities);
    const [specializations, setSpecializations] = useState<SpecializationType[] | null>(mockSpecializations);
    const [clinics, setClinics] = useState<ClinicType[] | null>(mockClinics);
    const [medics, setMedics] = useState<UserType[] | null>(mockUsers.filter(user => user.roleId === 1));

    const selectedCityId = getFieldValue('cityId');
    const selectedCity = mockCities.find((item: CityType) => item.id === selectedCityId);
    const selectedSpecializationId = getFieldValue('specializationId');
    const selectedSpecialization = mockSpecializations.find(
        (item: SpecializationType) => item.id === selectedSpecializationId
    );
    const selectedClinicId = getFieldValue('clinicId');
    const selectedClinic = mockClinics.find((item: ClinicType) => item.id === selectedClinicId);
    const selectedMedicId = getFieldValue('medicId');
    const selectedMedic = medics && medics.find((item: UserType) => item.id === selectedMedicId);
    const selectedDisponibilityIntervalId = getFieldValue('disponibilityIntervalId');
    const selectedDisponibilityInterval = mockDisponibilityIntervals.find(
        (item: DisponibilityIntervalType) => item.id === selectedDisponibilityIntervalId
    );
    const selectedStartHour = getFieldValue('startHour');
    const selectedObservations = getFieldValue('observations');
    const filteredDisponibilityIntervals = mockDisponibilityIntervals
        .filter(interval => selectedMedic && interval.userId === selectedMedic.id)
        .sort((a, b) => moment(a.day).diff(b.day));
    const disponibilityIntervalsMap = {};
    for (let i = 0; i < mockDisponibilityIntervals.length; i++) {
        disponibilityIntervalsMap[mockDisponibilityIntervals[i].id] = mockDisponibilityIntervals[i];
    }

    const hoursForStart: HourAvailabilityType[] = [];

    useEffect(() => {
        checkSelectedCity();
    }, [selectedCity]);

    useEffect(() => {
        checkSelectedSpecialization();
    }, [selectedSpecialization]);

    useEffect(() => {
        checkSelectedClinic();
    }, [selectedClinic]);

    useEffect(() => {
        checkSelectedMedic();
    }, [selectedMedic]);

    useEffect(() => {
        if (callbackOnSubmit) {
            submitForm();
        }
    }, [callbackOnSubmit]);

    useEffect(() => {
        setCallbackOnSubmit(false);
    }, [
        selectedCity,
        selectedSpecialization,
        selectedClinic,
        selectedMedic,
        selectedStartHour,
        selectedDisponibilityInterval
    ]);

    const checkSelectedCity = () => {
        // if (selectedMedic) {
        //     return;
        // } else if (selectedCity) {
        //     const selectedClinics = mockClinics.filter(item => item.cityId === selectedCity.id);
        //     // selectedClinics && selectedClinics.length === 1 && setFieldsValue({'clinic': selectedClinics[0].clinic});
        //     selectedClinics && setClinics(selectedClinics);
        //     let filteredSpecializationsArr: any = [];
        //     let filteredMedicsArr: any = [];
        //     selectedClinics.forEach(clinic => {
        //         const specializationPerClinic = mockSpecializationPerClinic.filter(item => item.clinicId === clinic.id);
        //         // console.log('specializationPerClinic', specializationPerClinic);
        //         specializationPerClinic.forEach(item => {
        //             const filteredSpecializations = mockSpecializations.find(special => special.id === item.specializationId);
        //             // console.log('filteredSpecializations', filteredSpecializations);
        //             filteredSpecializationsArr.push(filteredSpecializations);
        //             filteredSpecializationsArr = filteredSpecializationsArr.filter((item: any, index: number) => filteredSpecializationsArr.indexOf(item) === index);
        //             setSpecializations(filteredSpecializationsArr);
        //             console.log('filteredSpecializationsArr', filteredSpecializationsArr);
        //         });
        //     });
        //     const filteredMedics = mockUsers.filter(user => selectedSpecialization && selectedClinic && user.specializationId === selectedSpecialization.id && user.clinicId === selectedClinic.id);
        //     setMedics(filteredMedics);
        //     // filteredSpecializationsArr.forEach((element: SpecializationType) => {
        //     //     const filteredMedics = mockUsers.filter(user => user.specializationId === element.id);
        //     //     // filteredMedicsArr = [...filteredMedics];
        //     //     console.log('filteredMedics: ', filteredMedics);
        //     //     // filteredMedicsArr = ();
        //     //     console.log('FILTERED MEDIC ARR: ', filteredMedicsArr);
        //     // });
        //     // filteredMedicsArr.push(filteredMedics);
        //     // const filteredMedics = mockUsers.find(medic => medic.specializationId === item.specializationId);
        //     // filteredMedicsArr = filteredMedicsArr.filter((item: any, index: number) => filteredSpecializationsArr.indexOf(item) === index);
        //     // setMedics(filteredMedicsArr);
        //     // console.log('filteredMedicsArr', filteredMedicsArr);
        //     console.log('Specializari pe clinicile ramase: ', filteredSpecializationsArr);
        //     // filtrare pentru medici in functie de specializari (oras, clinica, specializare => medici)
        // }
    };

    const checkSelectedSpecialization = () => {
        if (selectedMedic) {
            return;
        } else {
            if (selectedSpecialization && !selectedCity && !selectedMedic) {
                const filteredMedics: UserType[] = mockUsers.filter(
                    user => user.specializationId === selectedSpecializationId
                );
                setMedics(filteredMedics);

                // const filteredClinics = mockClinics.filter(clinic => clinic && clinic.);
            }

            if (selectedSpecialization && selectedClinic && selectedCity) {
                const medicsWithSelectedSpecialization: UserType[] = mockUsers.filter(
                    item => item.specializationId === selectedSpecialization.id && item.clinicId === selectedClinic.id
                );
                setMedics(medicsWithSelectedSpecialization);

                // setFieldsValue(
                //     {
                //         'medicId': medicsWithSelectedSpecialization && medicsWithSelectedSpecialization[0] && medicsWithSelectedSpecialization[0].id,
                //     }
                // );
            }
            //     const selectedMedics = mockUsers.filter(item => selectedSpecialization && item.specializationId === selectedSpecialization.id);
            //     console.log('SPECIALIZATIONSSSS', selectedSpecialization);
            //     setMedics(selectedMedics);

            //     if (selectedCity) {
            //         const selectedClinics = mockClinics.filter(item => item.cityId === selectedCity.id);
            //         // selectedClinics && selectedClinics.length === 1 && setFieldsValue({'clinic': selectedClinics[0].clinic});
            //         selectedClinics && setClinics(selectedClinics);
            //         let filteredSpecializationsArr: any = [];
            //         let filteredMedicsArr: any = [];
            //         selectedClinics.forEach(clinic => {
            //             const specializationPerClinic = mockSpecializationPerClinic.filter(item => item.clinicId === clinic.id);
            //             // console.log('specializationPerClinic', specializationPerClinic);

            //             specializationPerClinic.forEach(item => {
            //                 const filteredSpecializations = mockSpecializations.find(special => special.id === item.specializationId);
            //                 // console.log('filteredSpecializations', filteredSpecializations);

            //                 filteredSpecializationsArr.push(filteredSpecializations);
            //                 filteredSpecializationsArr = filteredSpecializationsArr.filter((item: any, index: number) => filteredSpecializationsArr.indexOf(item) === index);
            //                 setSpecializations(filteredSpecializationsArr);

            //                 console.log('filteredSpecializationsArr', filteredSpecializationsArr);
            //             });
            //         });
            //     }
            // }

            // if (selectedSpecialization) {
            //     const selectedMedics = mockUsers.filter(item => item.specializationId === selectedSpecialization.id);
            //     setMedics(selectedMedics);
        }
    };

    const checkSelectedClinic = () => {
        if (selectedMedic) {
            return;
        } else {
            const cityOfSelectedClinic: CityType[] = mockCities.filter(
                item => selectedClinic && item.id === selectedClinic.cityId
            );

            if (selectedClinic) {
                const medicsFromSelectedClinic: UserType[] = mockUsers.filter(
                    item => selectedClinic && item.clinicId === selectedClinic.id
                );
                setMedics(medicsFromSelectedClinic);
                setCities(cityOfSelectedClinic);
            }

            setFieldsValue({
                cityId: cityOfSelectedClinic && cityOfSelectedClinic[0] && cityOfSelectedClinic[0].id
            });

            if (selectedCity && selectedSpecialization && !selectedMedic) {
                resetFields('specializationId');
            }

            let filteredSpecializationsArr: any = [];
            const selectedClinics = mockClinics.filter(
                item => cityOfSelectedClinic && cityOfSelectedClinic[0] && item.cityId === cityOfSelectedClinic[0].id
            );

            selectedClinics.forEach(clinic => {
                const specializationPerClinic: SpecializationPerClinicType[] = mockSpecializationPerClinic.filter(
                    item => item.clinicId === clinic.id
                );
                specializationPerClinic.forEach(item => {
                    const filteredSpecializations = mockSpecializations.find(
                        special => special.id === item.specializationId
                    );
                    filteredSpecializationsArr.push(filteredSpecializations);
                    filteredSpecializationsArr = filteredSpecializationsArr.filter(
                        (item: any, index: number) => filteredSpecializationsArr.indexOf(item) === index
                    );
                    setSpecializations(filteredSpecializationsArr);
                });
            });
        }
    };

    const checkSelectedMedic = () => {
        if (selectedMedic) {
            const medicSpecialization: SpecializationType[] = mockSpecializations.filter(
                item => item.id === selectedMedic.specializationId
            );
            setSpecializations(medicSpecialization);

            const medicClinic: ClinicType[] = mockClinics.filter(item => item.id === selectedMedic.clinicId);
            setClinics(medicClinic);

            const medicCity: CityType[] = mockCities.filter(item => item.id === medicClinic[0].cityId);
            setCities(medicCity);

            const medicUsers: UserType[] = mockUsers.filter(user => user.roleId === 1);
            setMedics(
                medicUsers.filter(
                    medic =>
                        medic.specializationId === medicSpecialization[0].id && medic.clinicId === medicClinic[0].id
                )
            );

            setFieldsValue({
                cityId: medicCity && medicCity[0] && medicCity[0].id,
                clinicId: medicClinic && medicClinic[0] && medicClinic[0].id,
                specializationId: medicSpecialization && medicSpecialization[0] && medicSpecialization[0].id
            });
        }
    };

    const checkAvailability = (startHour: number) => {
        const filteredAppointments: AppointmentType[] = mockAppointments.filter(
            item => item.disponibilityIntervalId === selectedDisponibilityIntervalId
        );

        if (filteredAppointments) {
            for (let i = 0; i < filteredAppointments.length; i++) {
                if (filteredAppointments[i].startHour === startHour) {
                    return false;
                }
            }
        }

        return true;
    };

    const renderIntervals = () => {
        if (selectedDisponibilityInterval) {
            const { endHour, startHour, durationHours } = selectedDisponibilityInterval;

            for (let i = startHour; i < endHour; i += durationHours) {
                const hourAvailability: HourAvailabilityType = {
                    hour: i,
                    available: checkAvailability(i)
                };

                hoursForStart.push(hourAvailability);
            }
        }
    };

    const submitForm = () => {
        form.validateFields((err: any, values: any) => {
            if (!err) {
                const newAppointment: AppointmentType = {
                    id: mockAppointments.length + 1,
                    userId: currentUser && currentUser.id,
                    medicId: selectedMedicId,
                    cityId: selectedCityId,
                    clinicId: selectedClinicId,
                    status: 'New',
                    startHour: selectedStartHour,
                    observations: selectedObservations,
                    disponibilityIntervalId: selectedDisponibilityIntervalId
                };
                mockAppointments.push(newAppointment);

                callbackSetAppointments(
                    mockAppointments
                        .filter(item => item.userId === currentUser.id)
                        .sort((a, b) =>
                            moment(disponibilityIntervalsMap[a.disponibilityIntervalId].day).diff(
                                disponibilityIntervalsMap[b.disponibilityIntervalId].day
                            )
                        )
                );
                callbackSetAppointmentModal(false);

                message.success({
                    content: `New appointment successfully created`,
                    duration: 4
                });
            } else {
                message.error({
                    content: 'Please check the fields again',
                    duration: 3
                });
            }
        });
    };

    const resetFieldsValues = () => {
        resetFields();
        setCities(mockCities);
        setSpecializations(mockSpecializations);
        setClinics(mockClinics);
        setMedics(mockUsers.filter(user => user.roleId === 1));
    };

    return (
        <Form
            {...formItemLayout}
            style={{ padding: 5, boxShadow: '2px 2px 5px grey', borderRadius: 7, backgroundColor: 'seashell' }}
        >
            <Form.Item label="City" key={'cityId'}>
                {getFieldDecorator(`cityId`, {
                    validateTrigger: ['onChange'],
                    rules: [
                        {
                            type: 'number',
                            required: true,
                            whitespace: true,
                            message: 'Please select a city.'
                        }
                    ]
                })(
                    <Select>
                        {cities &&
                            cities.map((item: CityType, index: number) => {
                                return (
                                    <Select.Option key={index} value={item.id}>
                                        {item.city}
                                    </Select.Option>
                                );
                            })}
                    </Select>
                )}
            </Form.Item>

            <Form.Item label="Specialization" key={'specializationId'}>
                {getFieldDecorator(`specializationId`, {
                    validateTrigger: ['onChange'],
                    rules: [
                        {
                            type: 'number',
                            required: true,
                            whitespace: true,
                            message: 'Please select a specialization.'
                        }
                    ]
                })(
                    <Select>
                        {specializations &&
                            specializations.map((item: SpecializationType, index: number) => {
                                return (
                                    <Select.Option key={index} value={item.id}>
                                        {item.specialization}
                                    </Select.Option>
                                );
                            })}
                    </Select>
                )}
            </Form.Item>

            <Form.Item label="Clinic" key={'clinicId'}>
                {getFieldDecorator(`clinicId`, {
                    validateTrigger: ['onChange'],
                    rules: [
                        {
                            type: 'number',
                            required: true,
                            whitespace: true,
                            message: 'Please select a clinic.'
                        }
                    ]
                })(
                    <Select>
                        {clinics &&
                            clinics.map((item: ClinicType, index: number) => {
                                return (
                                    <Select.Option key={index} value={item.id}>
                                        {item.clinic}
                                    </Select.Option>
                                );
                            })}
                    </Select>
                )}
            </Form.Item>

            <Form.Item label="Medic" key={'medicId'}>
                {getFieldDecorator(`medicId`, {
                    validateTrigger: ['onChange'],
                    rules: [
                        {
                            type: 'number',
                            required: true,
                            whitespace: true,
                            message: 'Please select a medic.'
                        }
                    ]
                })(
                    <Select>
                        {medics &&
                            medics.map((item: UserType, index: number) => {
                                return (
                                    <Select.Option key={index} value={item.id}>
                                        {item.firstname} - {item.lastname}
                                    </Select.Option>
                                );
                            })}
                    </Select>
                )}
            </Form.Item>

            {/* {getFieldValue('medicId') &&
                <Form.Item {...availableIntervalsLayout} label={filteredDisponibilityIntervals && filteredDisponibilityIntervals.length ? "Pick a day" : "Pick an hour"} key={'startHour'} style={{ display: 'flex', justifyContent: 'flex-start', }}>
                    {getFieldDecorator(`startHour`, {
                        validateTrigger: ['onChange'],
                        rules: [
                            {
                                type: 'number',
                                required: filteredDisponibilityIntervals && filteredDisponibilityIntervals.length ? true : false,
                                whitespace: true,
                                message: 'Please select an interval.',
                            }
                        ],
                    })(
                        <Radio.Group buttonStyle="solid" size="small">
                            {
                                filteredDisponibilityIntervals && filteredDisponibilityIntervals.length
                                    ? filteredDisponibilityIntervals.map((interval, index) => {
                                        return <Radio.Button value={interval.startHour + index}>{interval.startHour + index} - {interval.startHour + interval.durationHours + index}</Radio.Button>;
                                    })
                                    : <p style={{ fontSize: 12 }}>No date available for this medic.</p>
                            }
                        </Radio.Group>
                    )}
                </Form.Item>
            } */}

            {getFieldValue('medicId') && (
                <Form.Item
                    {...availableIntervalsLayout}
                    label="Pick a day"
                    key={'disponibilityIntervalId'}
                    style={{ display: 'flex', justifyContent: 'flex-start' }}
                >
                    {getFieldDecorator(`disponibilityIntervalId`, {
                        validateTrigger: ['onChange'],
                        rules: [
                            {
                                type: 'number',
                                required:
                                    filteredDisponibilityIntervals && filteredDisponibilityIntervals.length
                                        ? true
                                        : false,
                                whitespace: true,
                                message: 'Please select a day.'
                            }
                        ]
                    })(
                        filteredDisponibilityIntervals && filteredDisponibilityIntervals.length ? (
                            <Select>
                                {filteredDisponibilityIntervals.map(
                                    (item: DisponibilityIntervalType, index: number) => {
                                        return (
                                            <Select.Option key={index} value={item.id}>
                                                {moment(item.day).format('DD-MMM-YYYY')}
                                            </Select.Option>
                                        );
                                    }
                                )}
                            </Select>
                        ) : (
                            <p style={{ fontSize: 12 }}>No date available for this medic.</p>
                        )
                    )}
                </Form.Item>
            )}

            {getFieldValue('disponibilityIntervalId') && (
                <Form.Item
                    {...availableIntervalsLayout}
                    label="Pick an hour"
                    key={'startHour'}
                    style={{ display: 'flex', justifyContent: 'flex-start' }}
                >
                    {getFieldDecorator(`startHour`, {
                        validateTrigger: ['onChange'],
                        rules: [
                            {
                                type: 'number',
                                required: true,
                                whitespace: true,
                                message: 'Please select an hour.'
                            }
                        ]
                    })(
                        <Radio.Group buttonStyle="solid" size="small">
                            {renderIntervals()}
                            {hoursForStart.map((item, index) => {
                                if (selectedDisponibilityInterval) {
                                    const { durationHours } = selectedDisponibilityInterval;
                                    const { hour, available } = item;
                                    const addPrefix = (theHour: number) =>
                                        theHour < 10 ? `0${theHour}` : `${theHour}`;

                                    return (
                                        <Radio.Button value={hour} disabled={!available} key={index}>
                                            {addPrefix(hour)} - {addPrefix(hour + durationHours)}
                                        </Radio.Button>
                                    );
                                }
                            })}
                        </Radio.Group>
                    )}
                </Form.Item>
            )}

            <Form.Item label="Observations" key={'observations'}>
                {getFieldDecorator(`observations`, {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [
                        {
                            type: 'string',
                            whitespace: true
                        }
                    ]
                })(<TextArea placeholder="Add text" />)}
            </Form.Item>

            <Form.Item style={{ display: 'flex', justifyContent: 'flex-end', marginRight: 154 }}>
                <Button onClick={resetFieldsValues} type="ghost" style={{ backgroundColor: 'peachpuff' }}>
                    <Icon type="reload" />
                    Reset fields values
                </Button>
            </Form.Item>
        </Form>
    );
};
//@ts-ignore
export const NewAppointment = Form.create()(NewAppointmentForm);
