import React from "react";
import { Link } from "react-router";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/esm/Col";
import { ArrowRight } from "lucide-react";

export default function TeaCard({ tea }) {
  return (
    <Col xs={6}>
      <Card>
        <Card.Body>
          <Card.Title>
            {tea.title}
            <Link
              to={`/onetea/${tea.id}`}
              style={{ float: "right", textDecoration: "none" }}
            >
              <ArrowRight />
            </Link>
          </Card.Title>

          <Card.Img src={import.meta.env.VITE_IMG + `/${tea.img}`} />
        </Card.Body>
      </Card>
      <br />
    </Col>
  );
}
