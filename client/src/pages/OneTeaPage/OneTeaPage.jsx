import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import TeaApi from "../../entities/tea/api/TaeApi";
import ModalEditTeaForm from "../../entities/tea/ui/ModalEditTeaForm"; // Предполагаем, что компонент существует
import "./OneTeaPage.css"; // Добавим отдельный CSS файл для этой страницы

export default function OneTeaPage() {
  const navigate = useNavigate();
  const [tea, setTea] = useState(null);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [error, setError] = useState(null);

  const params = useParams();
  const { id, teaID } = params;
  const actualId = teaID || id; // Используем teaID если есть, иначе id

  const updateHandler = async (event) => {
    event.preventDefault();
    try {
      const targetData = event.target;
      const dataForApi = Object.fromEntries(new FormData(targetData));

      if (!dataForApi.name || !dataForApi.desc) {
        return alert("Заполните все поля");
      }

      const response = await TeaApi.update(actualId, dataForApi);
      if (response.statusCode === 200) {
        setTea(response.data);
        setShow(false);
      }
    } catch (error) {
      console.error("Ошибка при обновлении:", error);
      setError("Не удалось обновить данные чая");
    }
  };

  const deleteHandler = async () => {
    if (!window.confirm("Вы уверены, что хотите удалить этот чай?")) {
      return;
    }

    try {
      const response = await TeaApi.delete(actualId);
      if (response.status === 204) {
        navigate("/teas");
      }
    } catch (error) {
      console.error("Ошибка при удалении:", error);
      setError("Не удалось удалить чай");
    }
  };

  const editHandler = () => {
    setShow(true);
  };

  useEffect(() => {
    const getOneTea = async () => {
      try {
        setLoading(true);
        const data = await TeaApi.getTeaById(actualId);
        setTea(data.data);
        setError(null);
      } catch (error) {
        console.error("Ошибка при загрузке чая:", error);
        setError("Не удалось загрузить данные о чае");
      } finally {
        setLoading(false);
      }
    };

    getOneTea();
  }, [actualId]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Загружаем информацию о чае...</p>
      </div>
    );
  }

  if (error || !tea) {
    return (
      <div className="error-container">
        <h2>Ошибка</h2>
        <p>{error || "Чай не найден"}</p>
        <button className="btn" onClick={() => navigate(-1)}>
          Вернуться назад
        </button>
      </div>
    );
  }

  return (
    <div className="one-tea-container">
      <ModalEditTeaForm
        show={show}
        setShow={setShow}
        tea={tea}
        updateHandler={updateHandler}
      />

      <div className="header-nav">
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          Назад
        </button>

        <button className="btn" onClick={editHandler}>
          Редактировать
        </button>

        <button className="btn btn-secondary" onClick={deleteHandler}>
          Удалить
        </button>
      </div>

      <div className="tea-card">
        <div className="tea-header">
          <h1 className="tea-title">{tea.name}</h1>
          {tea.category && <span className="tea-category">{tea.category}</span>}
        </div>

        {tea.img && (
          <div className="tea-image-container">
            <img
              src={tea.img}
              alt={tea.name}
              className="tea-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/placeholder-tea.jpg";
              }}
            />
          </div>
        )}

        <div className="tea-details">
          <div className="detail-section">
            <h3>Описание</h3>
            <p className="tea-description">{tea.desc}</p>
          </div>

          {tea.origin && (
            <div className="detail-section">
              <h3>Происхождение</h3>
              <p>{tea.origin}</p>
            </div>
          )}

          {tea.strength && (
            <div className="detail-section">
              <h3>Крепость</h3>
              <div className="strength-indicator">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`strength-dot ${
                      i < tea.strength ? "active" : ""
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {tea.price && (
            <div className="detail-section price-section">
              <h3>Цена</h3>
              <p className="tea-price">{tea.price} ₽</p>
            </div>
          )}
        </div>

        <div className="tea-meta">
          {tea.createdAt && (
            <span>
              Добавлен: {new Date(tea.createdAt).toLocaleDateString()}
            </span>
          )}
          {tea.updatedAt && (
            <span>
              Обновлен: {new Date(tea.updatedAt).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
