import React, { useEffect, useState } from "react";
import { Card, Button, Form, Spinner } from "react-bootstrap";
import { CommentApi } from "../../entities/comment/CommentApi";
import { MessageCircle, Send, User as UserIcon } from "lucide-react";
import { NavLink } from "react-router";

export default function CommentsSection({ teaID, user }) {
  const [comments, setComments] = useState([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadComments = async () => {
      if (!teaID) return;
      setLoading(true);
      const { statusCode, data, error } = await CommentApi.getComments(teaID);

      if (statusCode === 200 && Array.isArray(data)) {
        setComments(data);
      } else {
        setComments([]);
      }
      if (statusCode !== 404) {
        console.log(error);
      }
      setLoading(false);
    };

    loadComments();
  }, [teaID]);

  // 2. Обработка отправки
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // Формируем данные как ждет сервер
    const newCommentData = {
      text: inputText,
      teaID: teaID, // ID чая берем из пропсов
    };

    const { statusCode, data, error } = await CommentApi.create(newCommentData);

    if (error) {
      setError(error);
      return;
    }

    if (statusCode === 201) {
      // Добавляем новый коммент в список сразу (оптимистично) или берем из ответа сервера
      // Сервер возвращает созданный объект в 'data'
      // Важно: сервер вернул просто объект комментария.
      // Если тебе нужно имя юзера сразу, нужно чтобы бэк его возвращал,
      // либо временно подставим текущего юзера для отображения
      const createdComment = { ...data, User: user };

      setComments((prev) => [...prev, createdComment]); // Добавляем вниз списка
      setInputText(""); // Чистим инпут
      setError("");
    }
  };

  return (
    <div className="mt-5">
      <h3
        className="mb-4 d-flex align-items-center gap-2"
        style={{ color: "var(--color-primary)" }}
      >
        <MessageCircle size={24} /> Комментарии ({comments.length})
      </h3>

      {/* --- СПИСОК КОММЕНТАРИЕВ --- */}
      <div className="comments-list mb-4 d-flex flex-column gap-3">
        {loading && <Spinner animation="border" variant="success" />}

        {!loading && comments.length === 0 && (
          <p className="text-muted fst-italic">
            Пока никто не оставил отзыв. Будьте первыми!
          </p>
        )}

        {comments.map((comment) => (
          <Card key={comment.id} className="border-0 shadow-sm">
            <Card.Body className="p-3">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div className="d-flex align-items-center gap-2">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center text-white"
                    style={{
                      width: "32px",
                      height: "32px",
                      backgroundColor: "var(--color-secondary)",
                    }}
                  >
                    <UserIcon size={16} />
                  </div>
                  {/* Если бэкэнд делает include User, то тут будет имя. Если нет - заглушка */}
                  <strong style={{ color: "var(--color-primary)" }}>
                    {comment.User?.name || `Пользователь #${comment.userID}`}
                  </strong>
                </div>
                <small className="text-muted">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </small>
              </div>
              <Card.Text style={{ color: "var(--color-text)" }}>
                {comment.text}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>

      {/* --- ФОРМА ОТПРАВКИ (Как на скетче, снизу) --- */}
      {user?.email ? (
        <Card
          className="border-0 shadow-sm"
          style={{ backgroundColor: "#fafaf5" }}
        >
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label
                  className="fw-bold"
                  style={{ color: "var(--color-secondary)" }}
                >
                  Оставьте свой отзыв
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Как вам этот чай? Раскрылся ли аромат?"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  style={{ borderColor: "var(--color-secondary)" }}
                />
              </Form.Group>

              {error && <div className="text-danger mb-2">{error}</div>}

              <Button
                type="submit"
                className="btn-gold d-flex align-items-center gap-2"
                disabled={!inputText.trim()}
              >
                <Send size={18} /> Отправить
              </Button>
            </Form>
          </Card.Body>
        </Card>
      ) : (
        <div className="alert alert-warning text-center">
          <NavLink
            to="/login"
            style={{ color: "var(--color-primary)", fontWeight: "bold" }}
          >
            Войдите
          </NavLink>
          , чтобы оставить комментарий.
        </div>
      )}
    </div>
  );
}
