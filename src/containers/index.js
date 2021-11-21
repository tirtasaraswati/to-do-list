import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Table, Button } from "antd";
import { EditOutlined, PlusCircleOutlined } from "@ant-design/icons";
import Modal from "./detail";
import moment from "moment";
import "antd/dist/antd.css";
import "../assets/index.scss";
import allFunctionApp from "../redux/App/action";

const { getData, handleState, clearForm } = allFunctionApp;

export default function () {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.App);
  const [filteredValue, setFilteredValue] = useState(null);
  useEffect(() => {
    dispatch(getData());
    dispatch(clearForm());
  }, [dispatch]);

  const editCell = (data, type) => {
    dispatch(handleState("form", data));
    dispatch(handleState("isModalVisible", true));
  };

  const onSubmit = (e, data) => {
    let newData;
    let editData;
    if (data.id !== 0) {
      if (data.status == 1) {
        editData = state.listDataDone.map((item) =>
          item.id !== state.form.id ? item : state.form
        );
        dispatch(handleState("listDataDone", editData));
      } else {
        editData = state.listDataNotDone.map((item) =>
          item.id !== state.form.id ? item : state.form
        );
        dispatch(handleState("listDataNotDone", editData));
      }
    } else if (data.id == 0) {
      if (data.status == 1) {
        newData = {
          id: state.listDataDone.length + state.listDataNotDone.length + 1,
          title: state.form.title,
          description: state.form.description,
          status: state.form.status,
          createdAt: moment(state.form.createdAt).format("YYYY-MM-DD HH:mm"),
        };
        dispatch(handleState("listDataDone", [...state.listDataDone, newData]));
      } else {
        newData = {
          id: state.listDataDone.length + state.listDataNotDone.length + 1,
          title: state.form.title,
          description: state.form.description,
          status: state.form.status,
          createdAt: moment(state.form.createdAt).format("YYYY-MM-DD HH:mm"),
        };
        dispatch(
          handleState("listDataNotDone", [...state.listDataNotDone, newData])
        );
      }
    }
    dispatch(handleState("isModalVisible", !state.isModalVisible));
    dispatch(clearForm());
  };

  const columnsDone = [
    {
      title: "Done",
      children: [
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
          render: (data) => {
            let findStatus = state.statusData.find(
              (item) => item.value == data
            );
            return <>{findStatus.label}</>;
          },
        },
        {
          title: "Created At",
          dataIndex: "createdAt",
          key: "createdAt",
        },
        {
          title: "Action",
          key: "id",
          render: (record, data) => {
            return (
              <>
                <a onClick={() => editCell(data, "done")}>
                  <EditOutlined />
                </a>
              </>
            );
          },
        },
      ],
    },
  ];

  const columnsNotDone = [
    {
      title: "Not Done",
      children: [
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
          render: (data) => {
            let findStatus = state.statusData.find(
              (item) => item.value == data
            );
            return <>{findStatus.label}</>;
          },
        },
        {
          title: "Created At",
          dataIndex: "createdAt",
          key: "createdAt",
        },
        {
          title: "Action",
          key: "id",
          render: (record, data) => {
            return (
              <>
                <a onClick={() => editCell(data, "not")}>
                  <EditOutlined />
                </a>
              </>
            );
          },
        },
      ],
    },
  ];

  return (
    <div className="margin">
      <Row gutter={16}>
        <Col span={24}>
          <div className="topbar-title">TO DO List</div>
        </Col>
      </Row>
      <Row style={{ marginBottom: "15px" }}>
        <Col>
          <Button
            type="default"
            size="large"
            shape="round"
            icon={<PlusCircleOutlined />}
            onClick={() => dispatch(handleState("isModalVisible", true))}
          >
            Add To Do List
          </Button>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Table
            columns={columnsDone}
            dataSource={state.listDataDone}
            pagination={{ defaultPageSize: 20 }}
          />
        </Col>
        <Col span={12}>
          <Table
            columns={columnsNotDone}
            dataSource={state.listDataNotDone}
            pagination={{ defaultPageSize: 20 }}
          />
        </Col>
      </Row>
      <Modal onSubmit={onSubmit} />
    </div>
  );
}
