import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { TeaApi } from "../../entities/post/TeaApi";

export default function OneTeaPage() {
  const navigate = useNavigate();
  const [tea, setTea] = useState({});

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
      <div> Сорт: {tea.sort}</div>
      <div> Название: {tea.name}</div>
      <div> Место: {tea.location}</div>
      <div>
        {" "}
        Изображение:{" "}
        <img src={tea.img} alt={tea.name} style={{ maxWidth: 300 }} />
      </div>
      <div> Описание: {tea.desc}</div>
    </>
  );
}
