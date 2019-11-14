import * as React from 'react';
import { Icon, Modal } from 'antd';

export interface ConfirmModalProps {
    onCancel: () => void;
    onOk: () => void;
    visible: boolean;
    text: any;
    subtext?: string;
    title: string;
}

export default ({ onCancel, onOk, visible, text, title, subtext }: ConfirmModalProps) => (
    <Modal title={title} visible={visible} onOk={onOk} onCancel={onCancel}>
        <p>{text}</p>
        {subtext ? (
            <b>
                <Icon type="warning" style={{ marginRight: 5 }} />
                Note
                <p style={{ fontSize: 12, margin: 0 }}>{subtext}</p>
            </b>
        ) : null}
    </Modal>
);
