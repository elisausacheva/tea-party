import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { TeaApi } from "../../entities/tea/TeaApi";
import ModalEditTeaForm from "../../entities/tea/ui/ModalEditTeaForm"; // Предполагаем, что компонент существует
// import "./OneTeaPage.css"; // Добавим отдельный CSS файл для этой страницы
import { Container, Row, Col, Card, Button, Spinner, Badge } from "react-bootstrap";
import { ArrowLeft, Edit, Trash2, MapPin, Leaf } from "lucide-react";
import CommentsSection from "../../widgets/CommentsSection/CommentsSection";

export default function OneTeaPage({user}) {
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
      if (response.statusCode === 200) {
        navigate("/");
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

  if (loading) return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
        <Spinner animation="border" style={{ color: "var(--color-primary)" }} />
    </Container>
  );

  const isAdmin = user?.id && user.isAdmin;

return (
    <Container className="py-5">
      <Button 
        variant="link" 
        onClick={() => navigate(-1)} 
        className="mb-4 text-decoration-none d-flex align-items-center gap-2"
        style={{ color: "var(--color-secondary)" }}
      >
        <ArrowLeft size={20} /> Вернуться к списку
      </Button>

      <Card className="border-0 shadow-lg overflow-hidden mb-5" style={{ borderRadius: "20px" }}>
        <Row className="g-0">
          <Col md={6} className="bg-light d-flex align-items-center justify-content-center overflow-hidden" style={{ minHeight: "400px" }}>
            {tea.img ? (
               <img 
                 src={tea.img} 
                 alt={tea.name} 
                 className="img-fluid w-100 h-100" 
                 style={{ objectFit: "cover" }} 
               />
            ) : (
               <div className="text-muted text-center p-5">
                  <Leaf size={64} color="var(--color-secondary)" />
                  <p className="mt-2">Нет фото</p>
               </div>
            )}
          </Col>
          <Col md={6}>
            <Card.Body className="p-4 p-lg-5 d-flex flex-column h-100">
              
              <div className="d-flex justify-content-between align-items-start mb-3">
                 <div>
                    <h1 className="fw-bold mb-2" style={{ color: "var(--color-primary)", fontFamily: "var(--font-heading)" }}>
                        {tea.name}
                    </h1>
                    {tea.sort && (
                        <Badge bg="light" text="dark" className="border">
                            {tea.sort}
                        </Badge>
                    )}
                 </div>
                 
                 {/* Кнопки действий (только для владельца) */}
                 {isAdmin && (
                     <div className="d-flex gap-2">
                         <Button variant="outline-secondary" size="sm" onClick={() => setShow(true)}>
                             <Edit size={18} />
                         </Button>
                         <Button variant="outline-danger" size="sm" onClick={deleteHandler}>
                             <Trash2 size={18} />
                         </Button>
                     </div>
                 )}
              </div>

              {tea.location && (
                  <div className="d-flex align-items-center gap-2 mb-4 text-muted">
                      <MapPin size={18} color="var(--color-accent)" />
                      <span>{tea.location}</span>
                  </div>
              )}

              <div className="mb-4 flex-grow-1">
                  <h5 style={{ color: "var(--color-secondary)" }}>О чае</h5>
                  <p className="lead" style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
                      {tea.desc}
                  </p>
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>

      <Row className="justify-content-center">
          <Col lg={10}>
             <CommentsSection teaID={id} user={user} />
          </Col>
      </Row>

      <ModalEditTeaForm 
         show={show} 
         setShow={setShow} 
         tea={tea} 
         updateHandler={updateHandler} 
      />

    </Container>
  );
}
