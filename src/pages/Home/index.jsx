import React from "react";
import { useHistory } from "react-router";
import Button from "../../components/Button";
import { Container } from "./styles";

function Home() {
  const history = useHistory();

  const onRegister = (data) => {
    history.push("/register");
  };
  const onLogin = (data) => {
    history.push("/login");
  };
  return (
    <Container>
      <Button onClick={onRegister}>Registrar</Button>
      <Button onClick={onLogin}>Login</Button>
    </Container>
  );
}

export default Home;
