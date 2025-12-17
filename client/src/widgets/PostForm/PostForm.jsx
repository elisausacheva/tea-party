import React from "react";

import { useState } from "react";
import { PostApi } from "../../entities/post/PostApi";

export default function PostForm({ onCreate, userId }) {
  const [inputs, setInputs] = useState({
    // id: 0,
    title: "",
    img: "",
    desc: "",
    like: "",
    // authorId: 0,
  });

  const inputsHandler = (e) => {
    setInputs((currentInputs) => ({
      ...currentInputs,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!inputs.title.trim().length === 0 || !inputs.desc.trim().length === 0) {
      return;
    }
    const { statusCode, error, data } = await PostApi.create(inputs);
    console.log("data", data);
    if (error) return;
    if (statusCode === 201) {
      onCreate({ ...inputs, id: data?.id, authorId: userId });
      console.log("ONCREATE", inputs);

      setInputs({ title: "", img: "", desc: "", like: "" });
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        name="title"
        type="text"
        required
        placeholder="Увековечь себя в истории"
        value={inputs.title}
        onChange={inputsHandler}
      />
      <input
        name="img"
        type="url"
        required
        placeholder="Закинь фоточку"
        value={inputs.img}
        onChange={inputsHandler}
      />
      <input
        name="desc"
        type="text"
        required
        placeholder="Напиши красиво"
        value={inputs.desc}
        onChange={inputsHandler}
      />
      <input
        name="like"
        type="text"
        required
        placeholder="Накрути себе лайков"
        value={inputs.like}
        onChange={inputsHandler}
      />
      <button type="submit">Создать</button>
    </form>
  );
}
