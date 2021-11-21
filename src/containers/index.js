import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Table, Button } from "antd";
import { EditOutlined, PlusCircleOutlined } from "@ant-design/icons";
import Modal from "./detail";
import "antd/dist/antd.css";
import "../assets/index.scss";
import allFunctionApp from "../redux/App/action";

const { getData, handleState, handleStateData } = allFunctionApp;

export default function () {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.App);

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  const editCell = (data, type) => {
    dispatch(handleStateData("form", data));
    dispatch(handleState("isModalVisible", true));
  };

  // const handleOk = (e, name, title) => {
  //   let typeData = name === "tableOperation" ? "opt" : "mat";
  //   let newData;
  //   let editData;
  //   if (modalOptMat[typeData].id !== 0) {
  //     editData = stateEstimasi[name].map((item) =>
  //       item.id !== modalOptMat[typeData].id ? item : modalOptMat[typeData]
  //     );
  //     dispatch(onChange(editData, name));
  //   } else if (typeData === "opt") {
  //     newData = {
  //       id: 0,
  //       operationId: modalOptMat[typeData].operationId,
  //       operationDescription: modalOptMat[typeData].operationDescription,
  //       retailPrice: modalOptMat[typeData].retailPrice,
  //       discount:
  //         modalOptMat[typeData].discount === ""
  //           ? 0
  //           : modalOptMat[typeData].discount,
  //       nettPriceIncTax: modalOptMat[typeData].nettPriceIncTax,
  //       nettPriceExcTax: modalOptMat[typeData].nettPriceExcTax,
  //       status: modalOptMat[typeData].status,
  //       rejectionReason: modalOptMat[typeData].rejectionReason,
  //     };
  //     dispatch(onChange([...stateEstimasi[name], newData], name));
  //   } else {
  //     newData = {
  //       id: 0,
  //       materialNo: modalOptMat[typeData].materialNo,
  //       materialDescription: modalOptMat[typeData].materialDescription,
  //       materialType: modalOptMat[typeData].materialType,
  //       qty: modalOptMat[typeData].qty === "" ? 1 : modalOptMat[typeData].qty,
  //       retailPrice: modalOptMat[typeData].retailPrice,
  //       discount:
  //         modalOptMat[typeData].discount === ""
  //           ? 0
  //           : modalOptMat[typeData].discount,
  //       nettPriceIncTax: modalOptMat[typeData].nettPriceIncTax,
  //       nettPriceExcTax: modalOptMat[typeData].nettPriceExcTax,
  //       status: modalOptMat[typeData].status,
  //       rejectionReason: modalOptMat[typeData].rejectionReason,
  //     };
  //     dispatch(onChange([...stateEstimasi[name], newData], name));
  //   }
  //   dispatch(onChangeModal(!modalOptMat.isModalVisible, "isModalVisible"));
  //   dispatch(clearModal());
  // };

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
            if (data === 1) {
              return <div>{data}</div>;
            }
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
            // onClick={(e) => handleOk(e, table, title)}
          >
            Add To Do List
          </Button>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Table columns={columnsDone} dataSource={state.listDataDone} />
        </Col>
        <Col span={12}>
          <Table columns={columnsNotDone} dataSource={state.listDataNotDone} />
        </Col>
      </Row>
      <Modal />
    </div>
  );
}
