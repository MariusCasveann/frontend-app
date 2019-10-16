jest.mock('antd');

import { openSuccessNotification, openErrorNotification } from '../Notifications';
import { notification } from 'antd';

describe('openSuccessNotification', () => {
    const message = 'the action was successful';
    const description = 'congrats!';

    it('should show success message', () => {
        openSuccessNotification(message);
        expect(notification.success).toHaveBeenCalledWith(
            expect.objectContaining({
                message
            })
        );
    });

    it('should show description', () => {
        openSuccessNotification(message, description);
        expect(notification.success).toHaveBeenCalledWith(
            expect.objectContaining({
                message,
                description
            })
        );
    });
});

describe('openErrorNotification', () => {
    const message = 'the action failed';
    it('should show error message', async () => {
        openErrorNotification(message);
        expect(notification.error).toHaveBeenCalledWith(
            expect.objectContaining({
                message
            })
        );
    });
});
