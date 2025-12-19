import React from "react";
// import {useNavigate} from 'react-router'
import { TeaApi } from "../../entities/tea/TeaApi";
import "./PostCard.css";
import { useState } from "react";
import PostFormUpdate from "../../widgets/PostFormUpdate/PostFormUpdate";
import { useNavigate } from "react-router";

export default function Postcard({ el, user, onDelete, onCreate, onUpdate }) {
  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);

  const deleteHahdler = async (id) => {
    const { statusCode } = await TeaApi.delete(id);
    if (statusCode === 200) {
      onDelete?.(id);
    }
  };
  // const splitus = el.createdAt.split('T')[0]
  const data = {
    sort: el.sort,
    name: el.name,
    location: el.location,
    img: el.img,
    desc: el.desc,
  };
  return (
    <div className="post-card">
      <div className="post-table">
        <p>----------------------------------------------------------------</p>
        <p>{el.name}</p>
        <p>
          Фоточка:
          {el.img && <img src={el.img} alt="tea" style={{ maxWidth: 200 }} />}
        </p>
        <p>Веселый текст: {el.desc}</p>
        <p>Сорт: {el.sort}</p>
        <p>Местоположение: {el.location}</p>
      </div>
      {showForm && (
        <PostFormUpdate
          id={el.id}
          user={user}
          onUpdate={onUpdate}
          setShowForm={setShowForm}
          onCreate={onCreate}
          data={data}
        />
      )}
      {user?.id === el.userID && (
        <>
          <button onClick={() => deleteHahdler(el.id)}>Удалить</button>
          <button onClick={() => setShowForm(true)}>Обновить</button>
          <button
            onClick={() => {
              navigate(`/onetea/${el.id}`);
            }}
          >
            Подробнее
          </button>
        </>
      )}
    </div>
  );
}
