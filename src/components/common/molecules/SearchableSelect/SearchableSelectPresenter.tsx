import React, { RefObject } from 'react';
import { Select, Spin } from 'antd';

export interface SelectItemProps {
    label: string | null;
    id: string;
}

const { Option } = Select;

interface SearchableSelectProps {
    placeholder?: string;
    fetching?: boolean;
    onSearchCallback: (value: string) => void;
    data: SelectItemProps[];
    loading: boolean;
    mode?: string;
}

const SearchableSelectPresenter = React.forwardRef(
    (
        props: SearchableSelectProps,
        ref: ((instance: HTMLSpanElement | null) => void) | RefObject<HTMLSpanElement> | null | undefined
    ) => {
        const {
            placeholder = 'Please select',
            fetching = false,
            data,
            mode = 'multiple',
            loading,
            onSearchCallback
        } = props;

        return (
            <span ref={ref}>
                <Select
                    mode={mode}
                    {...props}
                    placeholder={placeholder}
                    notFoundContent={fetching ? <Spin size="small" /> : null}
                    onSearch={onSearchCallback}
                    loading={loading}
                    filterOption={(input, option) =>
                        Boolean(
                            typeof input === 'string' &&
                                option &&
                                option.props &&
                                option.props.children &&
                                option.props.children
                                    .toString()
                                    .toLowerCase()
                                    .indexOf(input.toLowerCase()) >= 0
                        )
                    }
                    showSearch={true}
                    className="width-100-percent"
                >
                    {data.map((item: SelectItemProps) => (
                        <Option key={item.id} value={item.id}>
                            {item.label}
                        </Option>
                    ))}
                </Select>
            </span>
        );
    }
);

export default SearchableSelectPresenter;
