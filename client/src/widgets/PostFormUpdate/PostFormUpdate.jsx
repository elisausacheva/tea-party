import React from "react";
import { TeaApi } from "../../entities/tea/TeaApi";
import { useState } from "react";

export default function PostFormUpdate({
  id,
  setShowForm,
  onUpdate,
  user,
  data,
}) {
  const [inputs, setInputs] = useState({
    sort: data.sort,
    name: data.name,
    location: data.location,
    img: data.img,
    desc: data.desc,
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

    // if (inputs.sort.trim().length === 0 || inputs.name.trim().length === 0 ||
    //   inputs.location.trim().length === 0 || inputs.img.trim().length === 0) {
    //   return;
    // }
    const { statusCode, error, data } = await TeaApi.update(id, inputs);
    if (error) return;
    if (statusCode === 200) {
      onUpdate({ ...inputs, id: data?.id, userID: user.id });
      console.log("ONCREATE", inputs);

      setInputs({ sort: "", name: "", location: "", img: "", desc: "" });
    }
    console.log(12345678);

    setShowForm(false);
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        name="sort"
        value={inputs.sort}
        onChange={inputsHandler}
        placeholder="Сорт чая"
      />
      <input
        name="name"
        value={inputs.name}
        onChange={inputsHandler}
        placeholder="Название чая"
      />
      <input
        name="location"
        value={inputs.location}
        onChange={inputsHandler}
        placeholder="Местоположение"
      />
      <input
        name="img"
        value={inputs.img}
        onChange={inputsHandler}
        placeholder="Ссылка на изображение"
      />
      <textarea
        name="desc"
        value={inputs.desc}
        onChange={inputsHandler}
        placeholder="Описание"
      />
      <button type="submit">Обновить чай</button>
    </form>
  );
}
