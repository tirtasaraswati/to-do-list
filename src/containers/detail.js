import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Modal, Button } from "antd";
import Input from "../components/input";
import Select from "../components/select";
import moment from "moment";
import "antd/dist/antd.css";
import "../assets/index.scss";
import allFunctionApp from "../redux/App/action";

const { handleState, handleStateData, clearForm } = allFunctionApp;

export default function ({ onSubmit }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.App);
  const [isDisabled, setDisabled] = useState(false);

  useEffect(() => {
    if (state.form.status == 1) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [state.form]);

  const closePopUp = () => {
    dispatch(handleState("isModalVisible", false));
    dispatch(clearForm());
  };

  const onDelete = (data) => {
    let filterData;
    if (data.status == 1) {
      filterData = state.listDataDone.filter((value) => value.id !== data.id);
      dispatch(handleState("listDataDone", filterData));
    } else {
      filterData = state.listDataNotDone.filter(
        (value) => value.id !== data.id
      );
      dispatch(handleState("listDataNotDone", filterData));
    }
    dispatch(handleState("isModalVisible", false));
    dispatch(clearForm());
  };

  return (
    <Modal
      title={"Detail List"}
      visible={state.isModalVisible}
      onCancel={closePopUp}
      footer={[
        <Row>
          <Col>
            <Button
              type="primary"
              size="large"
              onClick={(e) => onSubmit(e, state.form)}
            >
              Save
            </Button>
          </Col>
          <Col style={{ marginLeft: "10px" }}>
            <Button
              type="default"
              size="large"
              disabled={isDisabled}
              onClick={() => onDelete(state.form)}
            >
              Delete
            </Button>
          </Col>
        </Row>,
      ]}
    >
      <Row>
        <Col span={24}>
          <div>
            <Input
              type="text"
              label="Title"
              name="title"
              value={state.form.title}
              onChange={(name, val, subState) => {
                dispatch(handleStateData(name, val, subState));
              }}
              subState="form"
            />
          </div>
          <div>
            <Input
              type="text"
              label="Description"
              name="description"
              value={state.form.description}
              onChange={(name, val, subState) => {
                dispatch(handleStateData(name, val, subState));
              }}
              subState="form"
            />
          </div>
          <div>
            <Select
              label="Status"
              name="status"
              options={state.statusData}
              initialValue={state.form.status}
              value={state.form.status}
              onChange={(name, val, subState) => {
                dispatch(handleStateData(name, val, subState));
              }}
              subState="form"
            />
          </div>
          <div>
            <Input
              type="text"
              label="Created At"
              name="createdAt"
              value={moment(state.form.createdAt).format("YYYY-MM-DD HH:mm")}
              onChange={(name, val, subState) => {
                dispatch(handleStateData(name, val, subState));
              }}
              subState="form"
            />
          </div>
        </Col>
      </Row>
    </Modal>
  );
}
