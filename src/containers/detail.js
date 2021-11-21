import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import allFunctionApp from "../redux/App/action";
import "antd/dist/antd.css";
import "../assets/index.scss";

const { getDetail, clearForm } = allFunctionApp;

export default function () {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.App);
  let history = useHistory();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("Detail"));
    if (data !== null) {
      dispatch(getDetail(data));
    }
  }, [dispatch]);

  const onCancel = () => {
    dispatch(clearForm());
    history.goBack();
    localStorage.clear();
  };

  return (
    <div className="margin">
      <div className="card">
        <Row gutter={24}>
          <Col span={24}>
            <div className="title">
              <ArrowLeftOutlined className="btn-back" onClick={onCancel} />
              Detail Movie
            </div>
          </Col>
          <Col span={5} md={5} s={8}>
            <div>
              <img
                className="img-detail"
                alt={state.dataDetail.Title}
                src={state.dataDetail.Poster}
              />
            </div>
          </Col>
          <Col span={12} md={12} s={17}>
            <div className="text-detail">
              <h1 style={{ borderBottom: "1px solid grey" }}>
                {state.dataDetail.Title}
              </h1>
              <h2 style={{ color: "#0a58a0" }}>{state.dataDetail.Type}</h2>
              <h2 style={{ color: "#6f6f6f" }}>{state.dataDetail.Year}</h2>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
