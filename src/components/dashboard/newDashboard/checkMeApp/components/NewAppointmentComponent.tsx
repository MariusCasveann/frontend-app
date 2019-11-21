import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button, Form, Icon, Input, message, Radio, Select } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
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

const NewAppointmentForm = (props: any) => {
    const { form } = props;
    const { getFieldDecorator, getFieldValue, getFieldsValue, resetFields, setFieldsValue } = form;

    const [cities, setCities] = useState<CityType[] | null>(mockCities);
    const [specializations, setSpecializations] = useState<SpecializationType[] | null>(mockSpecializations);
    const [clinics, setClinics] = useState<ClinicType[] | null>(mockClinics);
    const [medics, setMedics] = useState<UserType[] | null>(mockUsers.filter(user => user.roleId === 1));

    // const [cityFirst, setCityFirst] = useState<boolean>(false);
    // const [clinicFirst, setClinicFirst] = useState<boolean>(false);
    // const [specializationFirst, setSpecializationFirst] = useState<boolean>(false);
    // const [medicFirst, setMedicFirst] = useState<boolean>(false);

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
    const selectedStartHour = getFieldValue('startHour');
    const selectedObservations = getFieldValue('observations');
    const filteredDisponibilityIntervals = mockDisponibilityIntervals.filter(
        interval => selectedMedic && interval.userId === selectedMedic.id
    );

    useEffect(() => {
        checkSelectedCity();
    }, [selectedCity]);

    // useEffect(() => {
    //     checkSelectedSpecialization();
    // }, [selectedSpecialization]);

    // useEffect(() => {
    //     checkSelectedClinic();
    // }, [selectedClinic]);

    useEffect(() => {
        checkSelectedMedic();
    }, [selectedMedic]);

    const checkSelectedCity = () => {
        if (selectedSpecialization && selectedClinic && selectedMedic) {
            return;
        }

        if (selectedCity) {
            const selectedClinics = mockClinics.filter(item => item.cityId === selectedCity.id);
            // selectedClinics && selectedClinics.length === 1 && setFieldsValue({'clinic': selectedClinics[0].clinic});
            selectedClinics && setClinics(selectedClinics);
            let filteredSpecializationsArr: any = [];
            let filteredMedicsArr: any = [];

            selectedClinics.forEach(clinic => {
                const specializationPerClinic = mockSpecializationPerClinic.filter(item => item.clinicId === clinic.id);
                // console.log('specializationPerClinic', specializationPerClinic);

                specializationPerClinic.forEach(item => {
                    const filteredSpecializations = mockSpecializations.find(
                        special => special.id === item.specializationId
                    );
                    const filteredMedics = mockUsers.find(medic => medic.specializationId === item.specializationId);
                    // console.log('filteredSpecializations', filteredSpecializations);

                    filteredSpecializationsArr.push(filteredSpecializations);
                    filteredSpecializationsArr = filteredSpecializationsArr.filter(
                        (item: any, index: number) => filteredSpecializationsArr.indexOf(item) === index
                    );
                    setSpecializations(filteredSpecializationsArr);

                    filteredMedicsArr.push(filteredMedics);
                    // filteredMedicsArr = filteredMedicsArr.filter((item: any, index: number) => filteredSpecializationsArr.indexOf(item) === index);
                    setMedics(filteredMedicsArr);
                    console.log('filteredSpecializationsArr', filteredSpecializationsArr);
                    console.log('filteredMedicsArr', filteredMedicsArr);
                });
            });

            // filtrare pentru medici in functie de specializari (oras, clinica, specializare => medici)

            // console.log('SPECIALIZATIONS in check city', specializations);
        }
    };

    // console.log('SPECIALIZATIONS outside', specializations);

    const checkSelectedSpecialization = () => {
        if (selectedSpecialization) {
            const selectedMedics = mockUsers.filter(item => item.specializationId === selectedSpecialization.id);
            setMedics(selectedMedics);
        }
    };

    const checkSelectedClinic = () => {
        if (selectedClinic) {
            const cityOfSelectedClinic = mockCities.filter(item => item.id === selectedClinic.cityId);
            setCities(cityOfSelectedClinic);

            const medicsFromSelectedClinic = mockUsers.filter(item => item.clinicId === selectedClinic.id);
            setMedics(medicsFromSelectedClinic);

            setFieldsValue({
                cityId: cityOfSelectedClinic && cityOfSelectedClinic[0] && cityOfSelectedClinic[0].id
            });
        }
    };

    const checkSelectedMedic = () => {
        if (selectedMedic) {
            const medicSpecialization = mockSpecializations.filter(item => item.id === selectedMedic.specializationId);
            setSpecializations(medicSpecialization);
            // console.log('MEDIC Specialization', medicSpecialization);

            const medicClinic = mockClinics.filter(item => item.id === selectedMedic.clinicId);
            setClinics(medicClinic);
            // console.log('MEDIC CLINICCCC', medicClinic);

            const medicCity = mockCities.filter(item => item.id === medicClinic[0].cityId);
            setCities(medicCity);
            // console.log('MEDIC CITY', medicCity);

            setFieldsValue({
                cityId: medicCity && medicCity[0] && medicCity[0].id,
                clinicId: medicClinic && medicClinic[0] && medicClinic[0].id,
                specializationId: medicSpecialization && medicSpecialization[0] && medicSpecialization[0].id
            });
        }
    };

    const submitForm = (event: any) => {
        event.preventDefault();

        form.validateFields((err: any, values: any) => {
            if (!err) {
                message.success({
                    content: `New appointment successfully created`,
                    duration: 3
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
        // <Form {...formItemLayout} style={{ padding: 5, borderRadius: 10, backgroundColor: 'seashell' }} onSubmit={submitForm}>
        <Form {...formItemLayout} style={{ padding: 5, borderRadius: 10, backgroundColor: 'seashell' }}>
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

            <Form.Item>
                <Button onClick={submitForm} style={{ backgroundColor: 'peachpuff' }}>
                    SUBMIT
                </Button>
            </Form.Item>

            <pre>{JSON.stringify(getFieldsValue())}</pre>
        </Form>
    );
};

export const NewAppointment = Form.create()(NewAppointmentForm);
