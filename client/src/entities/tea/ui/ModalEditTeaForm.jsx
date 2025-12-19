import React from "react";
import ButtonGroup from "react-bootstrap/esm/ButtonGroup";

import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import { CircleCheck, X, Leaf, MapPin, Image as ImageIcon } from "lucide-react";

export default function ModalEditoneTeaForm({
  show,
  setShow,
  tea,
  updateHandler,
}) {
  return (
    <Modal 
      show={show} 
      onHide={() => setShow(false)} 
      centered 
      size="lg"
    >
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="fw-bold" style={{ color: "var(--color-primary)", fontFamily: "var(--font-heading)" }}>
          Редактирование: {tea.name}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="p-4">
        <Form onSubmit={updateHandler}>
          
          {/* Ряд 1: Название и Сорт */}
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="text-muted small">Название</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  defaultValue={tea.name}
                  required
                  style={{ borderColor: "var(--color-secondary)" }}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="text-muted small">Сорт / Категория</Form.Label>
                <div className="input-group">
                    <span className="input-group-text bg-white border-end-0" style={{ borderColor: "var(--color-secondary)" }}>
                        <Leaf size={16} color="var(--color-primary)"/>
                    </span>
                    <Form.Control
                      type="text"
                      name="sort"
                      defaultValue={tea.sort}
                      style={{ borderColor: "var(--color-secondary)", borderLeft: "none" }}
                    />
                </div>
              </Form.Group>
            </Col>
          </Row>

          {/* Ряд 2: Локация и Фото */}
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="text-muted small">Локация</Form.Label>
                <div className="input-group">
                    <span className="input-group-text bg-white border-end-0" style={{ borderColor: "var(--color-secondary)" }}>
                        <MapPin size={16} color="var(--color-primary)"/>
                    </span>
                    <Form.Control
                      type="text"
                      name="location"
                      defaultValue={tea.location}
                      style={{ borderColor: "var(--color-secondary)", borderLeft: "none" }}
                    />
                </div>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="text-muted small">Ссылка на фото</Form.Label>
                <div className="input-group">
                    <span className="input-group-text bg-white border-end-0" style={{ borderColor: "var(--color-secondary)" }}>
                        <ImageIcon size={16} color="var(--color-primary)"/>
                    </span>
                    <Form.Control
                      type="url"
                      name="img"
                      defaultValue={tea.img}
                      placeholder="https://..."
                      style={{ borderColor: "var(--color-secondary)", borderLeft: "none" }}
                    />
                </div>
              </Form.Group>
            </Col>
          </Row>

          {/* Описание */}
          <Form.Group className="mb-4">
            <Form.Label className="text-muted small">Описание и вкус</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="desc"
              defaultValue={tea.desc}
              required
              style={{ borderColor: "var(--color-secondary)" }}
            />
          </Form.Group>

          {/* Кнопки */}
          <div className="d-flex justify-content-end gap-2 border-top pt-3">
            <Button 
                variant="outline-secondary" 
                onClick={() => setShow(false)}
                className="d-flex align-items-center gap-2 border-0"
            >
              <X size={18} /> Отменить
            </Button>
            
            <Button 
                type="submit" 
                className="btn-gold d-flex align-items-center gap-2 px-4 rounded-pill"
            >
              <CircleCheck size={18} /> Сохранить
            </Button>
          </div>

        </Form>
      </Modal.Body>
    </Modal>
  );
}
