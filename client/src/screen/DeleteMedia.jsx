/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */


import React from "react";
import { Button, Container } from "react-bootstrap";
import { deleteMedia } from "./../actions/teacherAction";

export default function DeleteMedia() {
  const deleteHandler = async () => {
    await deleteMedia();
  };
  return (
    <Container style={{ margin: "5px" }}>
      Rekaman Gambar dan Audio akan terhapus sebelum waktu 1 Bulan
      <br />
      <Button variant="outline-danger" onClick={deleteHandler}>
        Delete
      </Button>
    </Container>
  );
}
