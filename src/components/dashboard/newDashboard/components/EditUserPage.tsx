import * as React from 'react';
import { useState } from 'react';
import moment from 'moment';
import { FormComponentProps } from 'antd/lib/form';
import { cities, countries, foreignLanguages, nationalities, UserType } from '../mockData';
import { createHashHistory } from 'history';
import {
    Button,
    Checkbox,
    Col,
    DatePicker,
    Form,
    Icon,
    InputNumber,
    Input,
    message,
    notification,
    Row,
    Select,
    Tooltip,
    Upload
} from 'antd';

const history = createHashHistory();

const disabledDateInterval = (current: any) => {
    return current && current > moment().subtract(18, 'year');
};

const info = (message: string, color?: string) => {
    return <span style={{ fontSize: 10, color: `${color}` }}>{message}</span>;
};

const EditUserForm = (props: FormComponentProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [imageUrl, setImageUrl] = useState<string>('');
    const { form } = props;
    const { getFieldDecorator, getFieldValue, setFieldsValue } = form;
    const selectedUser: UserType = JSON.parse(`${localStorage.getItem('selectedUser')}`);

    getFieldDecorator('keys', {
        initialValue:
            (selectedUser && selectedUser.addresses && selectedUser.addresses.map((address, index) => index)) || []
    });

    const keys = getFieldValue('keys');

    let fieldId: number = keys.length;

    const remove = (k: any) => {
        setFieldsValue({ keys: keys.filter((key: any) => key !== k) });
    };

    const add = () => {
        setFieldsValue({ keys: keys.concat(fieldId++) });
    };

    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 5 }
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 5 }
        }
    };

    const formItemLayoutWithOutLabel = {
        wrapperCol: {
            xs: { span: 24, offset: 0 },
            sm: { span: 20, offset: 4 }
        }
    };

    const formItems = keys.map((k: any, index: number) => (
        <>
            <span style={{ backgroundColor: 'grey', color: 'white', borderRadius: 3, padding: '0 5px' }}>
                Address {index + 1}
            </span>
            <Form.Item label={'Country'} required={true} key={k}>
                {getFieldDecorator(`addresses[${k}].country`, {
                    validateTrigger: ['onChange'],
                    rules: [
                        {
                            required: true,
                            whitespace: true,
                            message: 'Please select a country'
                        }
                    ],
                    initialValue: (selectedUser && selectedUser.addresses && selectedUser.addresses[k].country) || ''
                })(
                    <Select>
                        {countries.map((country, index) => {
                            return (
                                <Select.Option key={index} value={country}>
                                    {country}
                                </Select.Option>
                            );
                        })}
                    </Select>
                )}
            </Form.Item>

            <Form.Item label={'City'} required={true} key={k}>
                {getFieldDecorator(`addresses[${k}].city`, {
                    validateTrigger: ['onChange'],
                    rules: [
                        {
                            required: true,
                            whitespace: true,
                            message: 'Please select a city'
                        }
                    ],
                    initialValue: (selectedUser && selectedUser.addresses && selectedUser.addresses[k].city) || ''
                })(
                    <Select>
                        {cities.map((city, index) => {
                            return (
                                <Select.Option key={index} value={city}>
                                    {city}
                                </Select.Option>
                            );
                        })}
                    </Select>
                )}
            </Form.Item>

            <Form.Item label={'Street'} required={true} key={k}>
                {getFieldDecorator(`addresses[${k}].street`, {
                    validateTrigger: ['onChange'],
                    rules: [
                        {
                            required: true,
                            whitespace: true,
                            message: 'Please add your street name'
                        }
                    ],
                    initialValue: (selectedUser && selectedUser.addresses && selectedUser.addresses[k].street) || ''
                })(<Input placeholder="Street name" />)}
            </Form.Item>

            <Form.Item label={'Number'} required={true} key={k}>
                {getFieldDecorator(`addresses[${k}].number`, {
                    validateTrigger: ['onChange'],
                    rules: [
                        {
                            required: true,
                            whitespace: true,
                            message: 'Please add your house number'
                        }
                    ],
                    initialValue: (selectedUser && selectedUser.addresses && selectedUser.addresses[k].number) || ''
                })(<Input placeholder="House number" type="number" />)}
                <Icon
                    className="dynamic-delete-button"
                    type="minus-circle-o"
                    onClick={() => remove(k)}
                    style={{ marginLeft: '96%' }}
                />
            </Form.Item>
        </>
    ));

    const submitForm = (event: any) => {
        event.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                const newUser = { ...selectedUser, ...values, imageUrl };
                localStorage.setItem('newUser', JSON.stringify(newUser));
                localStorage.removeItem('selectedUser');
                notification.success({
                    message: 'SUCCESS',
                    placement: 'bottomRight',
                    description: 'User updated successfully'
                });
                history.push('/new-dashboard');
            } else {
                notification.error({
                    message: 'ERROR',
                    placement: 'bottomRight',
                    description: 'Please check the fields again'
                });
            }
        });
    };

    const isDisabled = (language: string) => {
        const nationality = getFieldValue('nationality');

        if (language === nationality) {
            return true;
        }

        return false;
    };

    const cancelSubmit = () => {
        localStorage.setItem('newUser', JSON.stringify(selectedUser));
        history.push('/new-dashboard');
    };

    const getBase64 = (img: any, callback: any) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };

    const beforeUpload = (file: any) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }

        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isLt2M) {
            message.error('Image must be smaller than 2MB!');
        }

        return isJpgOrPng && isLt2M;
    };

    const handleChange = (info: any) => {
        if (info.file.status === 'uploading') {
            setLoading(true);

            return;
        }

        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj, (imageUrl: any) => {
                setImageUrl(imageUrl);
                setLoading(false);
            });
        }
    };

    const uploadButton = (
        <div>
            <Icon type={loading ? 'loading' : 'upload'} />
        </div>
    );

    const isImage = (
        <>
            <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
            <Icon type="upload" style={{ position: 'absolute', left: 88, top: -7 }} />
        </>
    );

    return (
        <Form {...formItemLayout} style={{ padding: '20px 60px', backgroundColor: 'lightgrey' }} onSubmit={submitForm}>
            <h3>
                Edit user: {selectedUser && selectedUser.firstName}-{selectedUser && selectedUser.lastName}
            </h3>

            <Form.Item label="Firstname" required={true} key={'firstName'}>
                {getFieldDecorator(`firstName`, {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [
                        {
                            required: true,
                            whitespace: true,
                            message: 'Please enter firstname.'
                        }
                    ],
                    initialValue: selectedUser && selectedUser.firstName
                })(<Input placeholder="Firstname" />)}
            </Form.Item>

            <Form.Item label="Lastname" required={true} key={'lastName'}>
                {getFieldDecorator(`lastName`, {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [
                        {
                            required: true,
                            whitespace: true,
                            message: 'Please enter lastname.'
                        }
                    ],
                    initialValue: selectedUser && selectedUser.lastName
                })(<Input placeholder="Lastname" />)}
            </Form.Item>

            <Form.Item label="Username" required={true} key={'username'}>
                {getFieldDecorator(`username`, {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [
                        {
                            required: true,
                            whitespace: true,
                            message: 'Please enter username.'
                        }
                    ],
                    initialValue: selectedUser && selectedUser.username
                })(<Input placeholder="Username" />)}
            </Form.Item>

            <Form.Item label="Nationality" required={true} key={'nationality'}>
                {getFieldDecorator(`nationality`, {
                    validateTrigger: ['onChange'],
                    rules: [
                        {
                            required: true,
                            whitespace: true,
                            message: 'Please choose nationality.'
                        }
                    ],
                    initialValue: selectedUser && selectedUser.nationality
                })(
                    <Select>
                        {nationalities.map((national, index) => {
                            return (
                                <Select.Option key={index} value={national}>
                                    {national}
                                </Select.Option>
                            );
                        })}
                    </Select>
                )}
            </Form.Item>

            <Form.Item label="Phone Number" required={true} key={'phoneNumber'}>
                {getFieldDecorator(`phoneNumber`, {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [
                        {
                            required: true,
                            whitespace: true,
                            message: 'Please enter your phone number.'
                        }
                    ],
                    initialValue: selectedUser && selectedUser.phoneNumber
                })(
                    <InputNumber
                        formatter={value => `${value}`.replace(/^(\()?\d{4}(\))?(-|\s)?\d{3}(-|\s)\d{3}$/, '-')}
                        placeholder="Please enter your phone number"
                        style={{ width: '100%' }}
                        maxLength={9}
                        minLength={9}
                    />
                )}
                <Tooltip placement="right" title="Phone number should have 9 digits, e.g. 745384372">
                    <Icon type="info-circle" />
                </Tooltip>
            </Form.Item>

            <Form.Item label="Date of birth" required={true} key={'dateOfBirth'}>
                {getFieldDecorator(`dateOfBirth`, {
                    validateTrigger: ['onChange'],
                    rules: [
                        {
                            type: 'object',
                            required: true,
                            whitespace: true,
                            message: 'Please choose your date of birth.'
                        }
                    ],
                    initialValue: selectedUser && selectedUser.dateOfBirth ? moment(selectedUser.dateOfBirth) : ''
                })(<DatePicker disabledDate={disabledDateInterval} format={'DD-MM-YYYY'} />)}
                &nbsp;
                {info('Must have at least 18 years old', 'darkred')}
            </Form.Item>

            <Form.Item label="Upload avatar" required={true} key={'avatar'}>
                {getFieldDecorator(`avatar`, {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [
                        {
                            type: 'object',
                            required: true,
                            whitespace: true,
                            message: 'Please upload an avatar.'
                        }
                    ],
                    initialValue: selectedUser && selectedUser.imageUrl
                })(
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        beforeUpload={beforeUpload}
                        onChange={handleChange}
                    >
                        {imageUrl ? isImage : uploadButton}
                    </Upload>
                )}
            </Form.Item>

            {imageUrl ? (
                <Button style={{ left: 410, bottom: 155 }} size="small" type="link" onClick={() => setImageUrl('')}>
                    <Icon type="close" style={{ backgroundColor: 'lightgrey', borderRadius: 5 }} />
                </Button>
            ) : null}

            <Form.Item label="Languages to be learned" required={true} key={'languages'}>
                {getFieldDecorator(`languages`, {
                    rules: [
                        {
                            type: 'array',
                            required: true,
                            whitespace: true,
                            message: 'Please choose at least a language.'
                        }
                    ],
                    initialValue: selectedUser && selectedUser.languages
                })(
                    <Checkbox.Group style={{ width: '100%' }}>
                        <Row>
                            {foreignLanguages.map((language, index) => {
                                return (
                                    <Col span={8} key={index}>
                                        <Checkbox disabled={Boolean(isDisabled(language))} value={language}>
                                            {language}
                                        </Checkbox>
                                    </Col>
                                );
                            })}
                        </Row>
                    </Checkbox.Group>
                )}
            </Form.Item>

            <Form.Item style={{ marginLeft: 330 }}>
                {formItems}
                <Form.Item {...formItemLayoutWithOutLabel}>
                    <Button type="dashed" onClick={add}>
                        <Icon type="home" /> Add new address
                    </Button>
                </Form.Item>
            </Form.Item>

            <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
                <Button type="danger" style={{ width: '40%', marginRight: 30 }} onClick={cancelSubmit}>
                    <Icon type="cancel" />
                    Cancel
                </Button>
                <Button htmlType="submit" style={{ width: '40%', backgroundColor: 'deepskyblue', color: 'white' }}>
                    <Icon type="done" />
                    Save
                </Button>
            </Form.Item>
        </Form>
    );
};

export const EditUserPage = Form.create()(EditUserForm);
