import React from "react";
import { useHistory, Redirect } from "react-router-dom";
import { Container } from "./styles";

function Logged(authenticated) {
  if (!authenticated) {
    return <Redirect to="/login" />;
  }
  return (
    <Container>
      <h1>Olá, site em desenvolvimento...</h1>
    </Container>
  );
}

export default Logged;
