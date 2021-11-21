import React from "react";
import { Input, Col, Row } from "antd";
import "../assets/input.scss";

const CustomInput = ({
  onChange,
  disabled,
  value,
  size = "large",
  placeholder,
  label = "",
  name,
  subState,
}) => {
  return (
    <div style={{ marginBottom: "15px" }}>
      <Row className="form-custom">
        <Col span={8}>
          <div className="label-form">{label}</div>
        </Col>
        <Col span={16}>
          <Input
            className={"input-form"}
            size={size}
            disabled={disabled}
            value={value}
            name={name}
            id={name}
            placeholder={placeholder}
            onChange={(e) => {
              onChange(name, e.target.value, subState);
            }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default CustomInput;
