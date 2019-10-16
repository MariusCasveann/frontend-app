import classNames from 'classnames';
import React, { ReactNode } from 'react';
import { FaExclamationCircle } from 'react-icons/fa';
import { Spin } from 'antd';
import './CardLayout.css';

interface CardProps {
    cardTitleClass?: string;
    children: ReactNode;
    className?: string;
    error?: boolean;
    loading?: boolean;
    renderSelection?: () => ReactNode;
    selectionWidth?: number;
    title?: string;
    titleWidth?: number;
    width: number;
}

const CardTitle = ({ title, renderSelection, cardTitleClass }: Partial<CardProps>) => (
    <div className="card-title-wrapper">
        {title ? <div className="card-title">{title}</div> : undefined}
        {renderSelection ? <div className={`card-selection ${cardTitleClass}`}>{renderSelection()}</div> : undefined}
    </div>
);

export const Card = ({
    className,
    cardTitleClass,
    width,
    title,
    titleWidth,
    selectionWidth,
    renderSelection,
    children,
    loading,
    error
}: CardProps) => (
    <div className={classNames(className, 'card')} style={{ flex: `1 1 ${width}%` }}>
        {title || renderSelection ? (
            <CardTitle
                title={title}
                renderSelection={renderSelection}
                titleWidth={titleWidth}
                selectionWidth={selectionWidth}
                cardTitleClass={cardTitleClass}
            />
        ) : (
            undefined
        )}
        {error ? (
            <div className={classNames('card-content-error')}>
                <div>
                    <FaExclamationCircle size={48} />
                </div>
                <div>An error has occured. Please contact an administrator</div>
            </div>
        ) : !loading ? (
            <div className={classNames('card-content-data')}>
                <div className="card-content-wrapper">{children}</div>
            </div>
        ) : (
            <div className="card-content-loading">
                <Spin size="large" spinning={true} />
            </div>
        )}
    </div>
);

interface CardLayoutProps {
    className?: string;
    width: number;
    children: ReactNode;
}

export const CardLayout = ({ className, width, children }: CardLayoutProps) => (
    <div className={classNames('card-layout', className)} style={{ flex: `1 1 ${width}%` }}>
        {children}
    </div>
);
