import React from "react";
import { useState } from "react";
import { TeaApi } from "../../entities/tea/TeaApi";
import { Card, Form, Button, Row, Col } from "react-bootstrap";
import { PlusCircle, Image as ImageIcon, MapPin, Leaf } from "lucide-react";

export default function PostForm({ onCreate, user }) {
  const [inputs, setInputs] = useState({
    sort: "",
    name: "",
    location: "",
    img: "",
    desc: "",
  });

  const [isExpanded, setIsExpanded] = useState(false);
  if (!user?.isAdmin) return null;

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
      onCreate({ ...inputs, id: data?.id, userID: user.id });
      console.log("ONCREATE", inputs);

      setInputs({ sort: "", name: "", location: "", img: "", desc: "" });
    }
  };

  return (
    <>
      {!isExpanded && (
        <Card
          className="border-0 shadow-sm animate__animated animate__fadeIn"
          style={{ backgroundColor: "#fff" }}
        >
          <Card.Header className="bg-transparent border-0 pt-4 px-4 pb-0 d-flex justify-content-between align-items-center">
            <h5
              className="fw-bold m-0"
              style={{ color: "var(--color-primary)" }}
            >
              Новый чай в коллекцию
            </h5>
            <Button variant="close" onClick={() => setIsExpanded(false)} />
          </Card.Header>
          <Card.Body className="p-4">
            <Form onSubmit={submitHandler}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-muted small">
                      Название
                    </Form.Label>
                    <Form.Control
                      name="name"
                      value={inputs.name}
                      onChange={inputsHandler}
                      placeholder="Например, Те Гуань Инь"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-muted small">
                      Сорт / Категория
                    </Form.Label>
                    <div className="input-group">
                      <span className="input-group-text bg-white text-muted">
                        <Leaf size={16} />
                      </span>
                      <Form.Control
                        name="sort"
                        value={inputs.sort}
                        onChange={inputsHandler}
                        placeholder="Улун, Пуэр..."
                      />
                    </div>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-muted small">
                      Локация
                    </Form.Label>
                    <div className="input-group">
                      <span className="input-group-text bg-white text-muted">
                        <MapPin size={16} />
                      </span>
                      <Form.Control
                        name="location"
                        value={inputs.location}
                        onChange={inputsHandler}
                        placeholder="Китай, Фуцзянь"
                      />
                    </div>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-muted small">
                      Фото (URL)
                    </Form.Label>
                    <div className="input-group">
                      <span className="input-group-text bg-white text-muted">
                        <ImageIcon size={16} />
                      </span>
                      <Form.Control
                        name="img"
                        type="url"
                        value={inputs.img}
                        onChange={inputsHandler}
                        placeholder="https://..."
                      />
                    </div>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-4">
                <Form.Label className="text-muted small">
                  Описание и вкус
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="desc"
                  value={inputs.desc}
                  onChange={inputsHandler}
                  placeholder="Расскажите о вкусе и аромате..."
                  required
                />
              </Form.Group>

              <div className="d-grid">
                <Button type="submit" className="btn-gold py-2 fw-bold">
                  Сохранить
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      )}
    </>
  );
}
