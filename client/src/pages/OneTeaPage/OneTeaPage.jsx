import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { TeaApi } from "../../entities/tea/TaeApi";

export default function OneTeaPage() {
  const navigate = useNavigate();
  const [tea, setTea] = useState({});
  const [show, setShow] = useState(false);
  // console.log('__________----', tea);
  const params = useParams();
  const { id } = params;
  const { teaID } = params;

const updateHandler = async (event) => {
    event.preventDefault();
    try {
      const targetData = event.target;
      const dataForApi = Object.fromEntries(new FormData(targetData));
      if (!dataForApi.name || !dataForApi.desc)
        return alert("Заполните все поля");
      const response = await TeaApi.update(teaID, dataForApi);
      if (response.statusCode === 200) {
        setTea(response.data);
        setShow(false);
      }
    } catch (error) {
      console.log(error);
    }
  };


  const deleteHandler = async () => {
    try {
      const response = await TeaApi.delete(teaID);
      if (response.status === 204) navigate("/teas");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getOneTea = async () => {
      try {
        const data = await TeaApi.getTeaById(id);
        setTea(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getOneTea();
  }, [id]);

  return (
    <>
     <ModalEditTeaForm
        show={show}
        setShow={setShow}
        oneGift={tea}
        updateHandler={updateHandler}
      />
      <Button onClick={deleteHandler}>
        <Trash /> Удалить
      </Button>
      <button onClick={() => navigate(-1)}>Назад</button>
      <h2>OneTeaPage</h2>
      <div> Фото: {tea.img}</div>
      <div> Название: {tea.name}</div>
      <div> Текст: {tea.desc}</div>
    </>
  );
}
