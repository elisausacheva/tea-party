import React from 'react'
// import {useNavigate} from 'react-router'
import { PostApi } from '../../entities/post/PostApi'
import './PostCard.css'
import { useState } from 'react'
import PostFormUpdate from '../../widgets/PostFormUpdate/PostFormUpdate'
import { useNavigate } from 'react-router'

export default function Postcard({ el, user, onDelete, onCreate, onUpdate }) {
  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);

  const deleteHahdler = async (id) => {
    const { statusCode } = await PostApi.delete(id);
    if (statusCode === 200) {
      onDelete?.(id);
    }
  };
  // const splitus = el.createdAt.split('T')[0]
  const data = { title:el.title, img:el.img, desc:el.desc, like:el.like };
  return (
    <div className="post-card">
      <div className="post-table">
        <p>----------------------------------------------------------------</p>
        <p>{el.title}</p>
        
        <p>
          Фоточка:
          {el.img && <img src={el.img} alt="post" style={{ maxWidth: 200 }} />}
        </p>
        <p>Веселый текст: {el.desc}</p>А ты популярен: <p>{el.like}</p>
        <p>Опубликовано: {new Date(el.createdAt).toLocaleString()}</p>
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
      {user?.id === el.authorId && (
        <>
          <button onClick={() => deleteHahdler(el.id)}>Удалить</button>
          <button onClick={() => setShowForm(true)}>Обновить</button>
          <button
            onClick={() => {
              navigate(`/onepost/${el.id}`);
            }}
          >
            Подробнее
          </button>
        </>
      )}
    </div>
  );
}
