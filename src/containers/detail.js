import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Modal, Button } from "antd";
import Input from "../components/input";
import Select from "../components/select";
import moment from "moment";
import "antd/dist/antd.css";
import "../assets/index.scss";
import allFunctionApp from "../redux/App/action";

const { handleState, handleStateData, clearForm } = allFunctionApp;

export default function () {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.App);

  const closePopUp = () => {
    dispatch(clearForm());
    dispatch(handleState("isModalVisible", false));
  };

  return (
    <Modal
      title={"Update"}
      visible={state.isModalVisible}
      onCancel={closePopUp}
      footer={[
        <Row>
          <Col>
            <Button
              type="primary"
              size="large"
              // onClick={(e) => handleOk(e, table, title)}
            >
              Save
            </Button>
          </Col>
          <Col style={{ marginLeft: "10px" }}>
            <Button
              type="default"
              size="large"
              // onClick={() => closePopUp()}
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
              onChange={(val, name, subState) => {
                dispatch(handleStateData(val, name, subState));
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
              onChange={(val, name, subState) => {
                dispatch(handleStateData(val, name, subState));
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
              onChange={(val, name, subState) => {
                dispatch(handleStateData(val, name, subState));
              }}
              subState="form"
            />
          </div>
          <div>
            <Input
              type="text"
              label="Created At"
              name="createdAt"
              value={moment(state.form.createdAt).format("DD-MM-YYYY hh:mm")}
              onChange={(val, name, subState) => {
                dispatch(handleStateData(val, name, subState));
              }}
              subState="form"
            />
          </div>
        </Col>
      </Row>
    </Modal>
  );
}
