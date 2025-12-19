import React from "react";
import { Card, Button, Badge, Col } from "react-bootstrap";
import { Link } from "react-router";
import { MapPin, ArrowRight, Leaf } from "lucide-react";

export default function TeaCard({ tea }) {
  return (
    <Col md={6} lg={4} className="mb-4">
      <Card className="h-100 border-0 shadow-sm tea-card-hover" style={{ borderRadius: "15px", overflow: "hidden" }}>
        
        <div style={{ height: "220px", overflow: "hidden", position: "relative" }}>
          {tea.img ? (
            <Card.Img
              variant="top"
              src={tea.img}
              alt={tea.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <div className="d-flex align-items-center justify-content-center h-100 bg-light">
              <Leaf size={48} color="#dee2e6" />
            </div>
          )}
          {tea.sort && (
             <Badge bg="success" className="position-absolute top-0 end-0 m-3 shadow-sm" style={{ backgroundColor: "var(--color-primary) !important" }}>
                {tea.sort}
             </Badge>
          )}
        </div>

        <Card.Body className="d-flex flex-column">
          <div className="mb-2 text-muted small d-flex align-items-center gap-1">
             <MapPin size={14} /> {tea.location || "Неизвестно"}
          </div>

          <Card.Title className="fw-bold fs-5 mb-3" style={{ color: "var(--color-primary)" }}>
            {tea.name}
          </Card.Title>

          <Card.Text className="text-muted flex-grow-1" style={{ fontSize: "0.95rem" }}>
            {/* Обрезаем длинное описание */}
            {tea.desc?.length > 80 ? `${tea.desc.substring(0, 80)}...` : tea.desc}
          </Card.Text>

          <Link to={`/onetea/${tea.id}`} className="text-decoration-none mt-3">
            <Button 
                variant="outline-dark" 
                className="w-100 d-flex align-items-center justify-content-center gap-2"
                style={{ borderColor: "var(--color-secondary)", color: "var(--color-secondary)" }}
            >
              Подробнее <ArrowRight size={16} />
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </Col>
  );
}