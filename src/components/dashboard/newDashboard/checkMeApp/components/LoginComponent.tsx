import * as React from 'react';
import { Button, Form, Icon, Input, message, notification } from 'antd';
import { mockUsers } from '../mockDataForCheckMe';

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 9 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 3 }
    }
};

const LoginForm = (props: any) => {
    const { form, callbackOnSubmit } = props;
    const { getFieldDecorator, getFieldValue, setFieldsValue } = form;

    const checkUser = () => {
        if (
            mockUsers.find(
                user => user.username === getFieldValue('username') && user.password === getFieldValue('password')
            )
        ) {
            return true;
        }

        return false;
    };

    const submitForm = (event: any) => {
        event.preventDefault();

        form.validateFields((err: any, values: any) => {
            if (!err && checkUser()) {
                localStorage.setItem('userLogged', JSON.stringify(values));
                callbackOnSubmit(values);
                message.success({
                    content: `Welcome ${values.username}`,
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

    return (
        <>
            <h2
                style={{
                    margin: '10px 0 20px 645px',
                    backgroundColor: '#4caf50',
                    display: 'inline-block',
                    padding: 10,
                    borderRadius: 10
                }}
            >
                Check me doctor
            </h2>
            <Form {...formItemLayout} style={{ backgroundColor: '#a9a9a9' }} onSubmit={submitForm}>
                <Form.Item label="Username" required={true} key={'username'}>
                    {getFieldDecorator(`username`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [
                            {
                                required: true,
                                whitespace: true,
                                message: 'Please check username.'
                            }
                        ]
                    })(<Input placeholder="Username" maxLength={10} />)}
                </Form.Item>

                <Form.Item label="Password" required={true} key={'lastName'}>
                    {getFieldDecorator(`password`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [
                            {
                                required: true,
                                whitespace: true,
                                message: 'Please check password.'
                            }
                        ]
                    })(<Input placeholder="Password" type="password" maxLength={10} />)}
                </Form.Item>

                <Form.Item>
                    <Button
                        htmlType="submit"
                        style={{ marginLeft: 700, width: '30%', backgroundColor: 'deepskyblue', color: 'white' }}
                    >
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export const Login = Form.create()(LoginForm);
