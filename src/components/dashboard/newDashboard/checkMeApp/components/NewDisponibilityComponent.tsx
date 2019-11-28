import * as React from 'react';
import { useState, useEffect } from 'react';
import moment from 'moment';
import { Button, DatePicker, Form, Icon, message, Select, Radio } from 'antd';
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
        xs: { span: 24 },
        sm: { span: 10 }
    },
    wrapperCol: {
        xs: { span: 8 },
        sm: { span: 8 }
    }
};

// interface DisponibilityProps {
//     callbackOnSubmitNewDisponibility: boolean;
//     callbackSetDisponibilityModal: boolean;
//     currentUser: UserType;
//     form: any;
//     setCallbackOnSubmitNewDisponibility;
// };

const NewDisponibilityForm = (props: any) => {
    const {
        callbackOnSubmitNewDisponibility,
        callbackSetDisponibilityModal,
        currentUser,
        form,
        setCallbackOnSubmitNewDisponibility
    } = props;
    const { getFieldDecorator, getFieldValue, getFieldsValue, resetFields, setFieldsValue } = form;
    const [disponibilityIntervals, setDisponibilityIntervals] = useState<DisponibilityIntervalType[]>(
        mockDisponibilityIntervals
    );
    const selectedDay = getFieldValue('day');
    const selectedStartHour: number = getFieldValue('startHour');
    const selectedEndHour: number = getFieldValue('endHour');
    const selectedDurationHours: number = getFieldValue('durationHours');
    const currentDate = moment().format('YYYY-MM-DD');
    const currentHour = Number(moment().format('HH'));
    const durationHoursArr: number[] = [1, 2, 3, 4];
    const startHoursArr: number[] = [];
    const endHoursArr: number[] = [];

    for (let i = 6; i < 20; i++) {
        startHoursArr.push(i);
    }

    for (let i = 7; i < 21; i++) {
        endHoursArr.push(i);
    }

    useEffect(() => {
        setCallbackOnSubmitNewDisponibility(false);
    }, [selectedStartHour, selectedEndHour, selectedDurationHours]);

    useEffect(() => {
        if (callbackOnSubmitNewDisponibility) {
            submitForm();
        }
    }, [callbackOnSubmitNewDisponibility]);

    useEffect(() => {
        if (selectedStartHour > selectedEndHour) {
            setFieldsValue({ endHour: null });
        }
    }, [selectedStartHour]);

    useEffect(() => {
        if (moment(selectedDay).format('YYYY-MM-DD') === currentDate && selectedStartHour <= currentHour) {
            setFieldsValue({ endHour: null, startHour: null, durationHours: null });
        }
    }, [selectedDay]);

    const resetFieldsValues = () => {
        resetFields();
    };

    const disabledDate = (current: any) => {
        if (currentHour >= 19) {
            return current && current < moment();
        }

        return current && current < moment().subtract(1, 'day');
    };

    const submitForm = () => {
        form.validateFields((err: any, values: any) => {
            if (!err) {
                const newDisponibility: DisponibilityIntervalType = {
                    id: mockDisponibilityIntervals.length + 1,
                    userId: currentUser && currentUser.id,
                    day: selectedDay,
                    startHour: selectedStartHour,
                    endHour: selectedEndHour,
                    durationHours: selectedDurationHours
                };
                mockDisponibilityIntervals.push(newDisponibility);

                setDisponibilityIntervals(mockDisponibilityIntervals);
                callbackSetDisponibilityModal(false);

                message.success({
                    content: `New disponibility successfully added`,
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

    return (
        <Form
            {...formItemLayout}
            style={{ padding: 5, boxShadow: '2px 2px 5px grey', borderRadius: 7, backgroundColor: '#defce1' }}
        >
            <Form.Item label="Day" key={'day'}>
                {getFieldDecorator('day', {
                    validateTrigger: ['onChange'],
                    rules: [
                        {
                            type: 'object',
                            required: true,
                            whitespace: true,
                            message: 'Please select a day'
                        }
                    ]
                })(<DatePicker disabledDate={disabledDate} format={'YYYY-MM-DD'} />)}
            </Form.Item>

            {selectedDay && (
                <Form.Item label="Start hour" key={'startHour'}>
                    {getFieldDecorator('startHour', {
                        validateTrigger: ['onChange'],
                        rules: [
                            {
                                type: 'number',
                                required: true,
                                whitespace: true,
                                message: 'Please add start hour'
                            }
                        ]
                    })(
                        <Select>
                            {startHoursArr.map((item, index) => {
                                return (
                                    <Select.Option
                                        disabled={
                                            currentDate === moment(selectedDay).format('YYYY-MM-DD') &&
                                            item <= currentHour
                                        }
                                        value={item}
                                        key={index}
                                    >
                                        {item}
                                    </Select.Option>
                                );
                            })}
                        </Select>
                    )}
                </Form.Item>
            )}

            {selectedStartHour && (
                <Form.Item label="End hour" key={'endHour'}>
                    {getFieldDecorator('endHour', {
                        validateTrigger: ['onChange'],
                        rules: [
                            {
                                type: 'number',
                                required: true,
                                whitespace: true,
                                message: 'Please add end hour'
                            }
                        ]
                    })(
                        <Select>
                            {endHoursArr.map((item, index) => {
                                return (
                                    <Select.Option
                                        disabled={item < getFieldValue('startHour') + 1}
                                        value={item}
                                        key={index}
                                    >
                                        {item}
                                    </Select.Option>
                                );
                            })}
                        </Select>
                    )}
                </Form.Item>
            )}

            {selectedEndHour && (
                <Form.Item label="Duration" key={'durationHours'}>
                    {getFieldDecorator('durationHours', {
                        validateTrigger: ['onChange'],
                        rules: [
                            {
                                type: 'number',
                                required: true,
                                whitespace: true,
                                message: 'Please select duration of appointment'
                            }
                        ]
                    })(
                        <Radio.Group buttonStyle="solid" size="small">
                            {durationHoursArr.map((item, index) => {
                                return (
                                    <Radio.Button
                                        disabled={item > selectedEndHour - selectedStartHour}
                                        value={item}
                                        key={index}
                                    >
                                        {item} {item < 2 ? 'hour' : 'hours'}
                                    </Radio.Button>
                                );
                            })}
                        </Radio.Group>
                    )}
                </Form.Item>
            )}

            <Form.Item style={{ display: 'flex', justifyContent: 'flex-end', marginRight: 190 }}>
                <Button onClick={resetFieldsValues} type="ghost" style={{ backgroundColor: 'peachpuff' }}>
                    <Icon type="reload" />
                    Reset fields values
                </Button>
            </Form.Item>
        </Form>
    );
};

export const NewDisponibility = Form.create()(NewDisponibilityForm);
