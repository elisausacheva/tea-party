import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { TeaApi } from "../../entities/tea/TaeApi";

export default function OneTeaPage() {
  const navigate = useNavigate();
  const [tea, setTea] = useState({});
  // console.log('__________----', tea);

  const { id } = useParams();

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
      <button onClick={() => navigate(-1)}>Назад</button>
      <h2>OneTeaPage</h2>
      <div> Фото: {tea.img}</div>
      <div> Название: {tea.title}</div>
      <div> Текст: {tea.desc}</div>
    </>
  );
}
