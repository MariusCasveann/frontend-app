import * as React from 'react';
import { Modal } from 'antd';

export interface ConfirmModalProps {
    onCancel: () => void;
    onOk: () => void;
    visible: boolean;
    text: string;
    title: string;
}

export default ({ onCancel, onOk, visible, text, title }: ConfirmModalProps) => (
    <Modal title={title} visible={visible} onOk={onOk} onCancel={onCancel}>
        <p>{text}?</p>
    </Modal>
);
