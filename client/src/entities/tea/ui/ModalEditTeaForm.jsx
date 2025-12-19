import { CircleCheck, CirclePlus, CircleX } from "lucide-react";
import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/esm/ButtonGroup";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

export default function ModalEditoneTeaForm({
  show,
  setShow,
  tea,
  updateHandler,
}) {
  return (
    <>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header>
          <Modal.Title>Изменение карточки чая</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={updateHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Название</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Название"
                defaultValue={tea.name}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Описание</Form.Label>
              <Form.Control
                type="text"
                name="desc"
                placeholder="Desc"
                defaultValue={tea.desc}
              />
            </Form.Group>
            <ButtonGroup>
              <Button onClick={() => setShow(false)}>
                Отменить <CircleX />
              </Button>
              <Button type="submit" className="align-right">
                Сохранить <CircleCheck />
              </Button>
            </ButtonGroup>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
