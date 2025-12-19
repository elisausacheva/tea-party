import React, { useEffect, useState } from "react";
//import axios from "axios";
import TeaCard from "../../widgets/Tea/TeaCard/TeaCard";
import TeaAddForm from "../../widgets/Tea/TeaAddForm/TeaAddForm";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/esm/Button";
import axiosInstance from "../../shared/lib/axiosInstance";
import Loader from "../../shared/hocs/Loader/Loader";
import TeaApi from "../../entities/tea/api/TaeApi";

export default function TeasPage({ user }) {
  const [teas, setTeas] = useState([]);
  const [showForm, setShowForm] = useState(false);

  async function getTeas() {
    try {
      const response = await TeaApi.getAll();
      if (response.statusCode === 200) setTeas(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const targetData = event.target;
      const dataForApi = Object.fromEntries(new FormData(targetData));
      if (!dataForApi.name || !dataForApi.desc)
        return alert("Заполните все поля");
      const dataForApiFile = new FormData();
      dataForApiFile.append("name", dataForApi.name);
      dataForApiFile.append("desc", dataForApi.desc);
      dataForApiFile.append("file", dataForApi.file);
      const response = await TeaApi.create(dataForApiFile);
      if (response.statusCode === 201) {
        setTeas((prev) => [response.data, ...prev]);
      }
      targetData.reset();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTeas();
  }, []);

  return (
    <Loader isLoading={teas.length === 0}>
      <div className="container">
        <br />
        <Row>
          {user.status === "logged" && (
            <Button
              variant={showForm ? "primary-outline" : "primary"}
              onClick={() => setShowForm((prev) => !prev)}
            >
              {showForm ? "Закрыть форму" : "Добавить"}
            </Button>
          )}

          <br />
          {showForm && <TeaAddForm submitHandler={submitHandler} />}
        </Row>
        {teas.length === 0 && <h2>Нет чая</h2>}
        <br />
        <Row>
          {teas.map((obj) => (
            <TeaCard key={obj.id} tea={obj} />
          ))}
        </Row>
      </div>
    </Loader>
  );
}
