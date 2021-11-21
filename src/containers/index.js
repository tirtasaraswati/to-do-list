import React, { useState, useCallback, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Modal, Input, Form, Table } from "antd";
import allFunctionApp, { getPoster } from "../redux/App/action";
import "antd/dist/antd.css";
import "../assets/index.scss";

const { getData, handleState, getDetail } = allFunctionApp;

export default function () {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.App);
  const [form] = Form.useForm();
  const [page, setPage] = useState(state.page);
  const [isShowModal, setShowModal] = useState(false);
  const showModal = () => setShowModal(!isShowModal);

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Action",
      key: "id",
      render: (text, record) => (
        <div>
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </div>
      ),
    },
  ];

  return (
    <div className="margin">
      <Row gutter={16}>
        <Col span={24}>
          <div className="topbar-title">TO DO List</div>
        </Col>
        <Col span={24}>
          <Table columns={columns} dataSource={state.listData} />
          {/* <Form form={form} onFinish={onSearch}>
            <Form.Item name="title">
              <Input.Search
                className="input"
                placeholder="Search keyword"
                value={state.search.title}
                size="large"
                enterButton
                onChange={(e) => {
                  dispatch(handleState("title", e.target.value));
                }}
                onSearch={onSearch}
              />
            </Form.Item>
          </Form> */}
        </Col>
      </Row>

      <Modal
        className="modal"
        visible={isShowModal}
        onCancel={showModal}
        footer={null}
      >
        {/* <img className="img-poster" src={state.poster} width="400" /> */}
      </Modal>
    </div>
  );
}
