import React from 'react'
import { PostApi } from '../../entities/post/PostApi'
import { useState } from 'react';

export default function PostFormUpdate({id, setShowForm, onUpdate, user, data}) {
const [inputs, setInputs] = useState({
  title: data.title,
  img: data.img,
  desc: data.desc,
  like: data.like,
});
// console.log("34343443+++++++++>>>>INPUTS", inputs);
  const inputsHandler = (e) => {
    setInputs((currentInputs) => ({
      ...currentInputs,
      [e.target.name]: e.target.value,
    }));
    // console.log("+++++++++>>>>INPUTS", inputs);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // if (inputs.title.trim().length === 0 || inputs.img.trim().length === 0 ||
    //   inputs.title.trim().length === 0 || inputs.like.trim().length === 0) {
    //   return;
    // }
    const { statusCode, error, data } = await PostApi.update(id, inputs);
    if (error) return;
    if (statusCode === 200) {
      onUpdate({ ...inputs, id: data?.id, authorId: user.id });
      console.log("ONCREATE", inputs);

      setInputs({ title: "", img: "", desc: "", like: "" });
    }
    console.log(12345678);
    
    setShowForm(false)
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        name="title"
        type="text"
        // required
        placeholder="Щебетун"
        value={inputs.title}
        onChange={inputsHandler}
      />
      <input
        name="img"
        type="text"
        // required
        placeholder="Ваше фото"
        value={inputs.img}
        onChange={inputsHandler}
      />
      <input
        name="desc"
        type="text"
        // required
        placeholder="Напиши красиво"
        value={inputs.desc}
        onChange={inputsHandler}
      />
      <input
        name="like"
        type="text"
        // required
        placeholder="Поклонники"
        value={inputs.like}
        onChange={inputsHandler}
      />
      <button type="submit">Сохранить</button>
    </form>
  );
}
