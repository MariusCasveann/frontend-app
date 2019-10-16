import { notification } from 'antd';
import { notificationDuration } from '../../../../config/constants';

export const openSuccessNotification = (message: string, description?: string) => {
    notification.success({
        message,
        description,
        className: 'notification-success',
        duration: notificationDuration
    });
};

export const openErrorNotification = (message: string, description?: string) => {
    notification.error({
        message,
        description,
        className: 'notification-error',
        duration: notificationDuration
    });
};
