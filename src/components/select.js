import React from "react";
import { Row, Col, Select } from "antd";
import "../assets/select.scss";

const CustomSelect = ({
  onChange,
  disabled,
  initialValue,
  size = "large",
  placeholder,
  label,
  allowClear,
  options = [],
  subState,
  name,
  onSearch,
}) => {
  return (
    <div style={{ marginBottom: "15px" }}>
      <Row className="form-custom">
        <Col span={8}>
          <div className="label-form">{label}</div>
        </Col>
        <Col span={16}>
          <Select
            showSearch
            name={name}
            className="select-form"
            label={label}
            placeholder={placeholder}
            allowClear={allowClear}
            options={options}
            size={size}
            disabled={disabled}
            value={initialValue}
            onSearch={onSearch}
            onChange={(e) => {
              onChange(name, e, subState);
            }}
          >
            {options.map((list) => (
              <Select.Option key={list.value} value={list.value}>
                {list.label}
              </Select.Option>
            ))}
          </Select>
        </Col>
      </Row>
    </div>
  );
};

export default CustomSelect;
