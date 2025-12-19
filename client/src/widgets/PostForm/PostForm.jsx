import React from "react";

import { useState } from "react";
import { TeaApi } from "../../entities/tea/TeaApi";

export default function PostForm({ onCreate, userId }) {
  const [inputs, setInputs] = useState({
    sort: "",
    name: "",
    location: "",
    img: "",
    desc: "",
  });

  const inputsHandler = (e) => {
    setInputs((currentInputs) => ({
      ...currentInputs,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!inputs.name.trim().length === 0 || !inputs.desc.trim().length === 0) {
      return;
    }
    const { statusCode, error, data } = await TeaApi.create(inputs);
    console.log("data", data);
    if (error) return;
    if (statusCode === 201) {
      onCreate({ ...inputs, id: data?.id, userID: userId });
      console.log("ONCREATE", inputs);

      setInputs({ sort: "", name: "", location: "", img: "", desc: "" });
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        name="sort"
        type="text"
        required
        placeholder="Сорт чая"
        value={inputs.sort}
        onChange={inputsHandler}
      />
      <input
        name="name"
        type="text"
        required
        placeholder="Название чая"
        value={inputs.name}
        onChange={inputsHandler}
      />
      <input
        name="location"
        type="text"
        required
        placeholder="Местоположение"
        value={inputs.location}
        onChange={inputsHandler}
      />
      <input
        name="img"
        type="url"
        required
        placeholder="Ссылка на изображение"
        value={inputs.img}
        onChange={inputsHandler}
      />
      <textarea
        name="desc"
        required
        placeholder="Описание чая"
        value={inputs.desc}
        onChange={inputsHandler}
      />
      <button type="submit">Создать чай</button>
    </form>
  );
}
