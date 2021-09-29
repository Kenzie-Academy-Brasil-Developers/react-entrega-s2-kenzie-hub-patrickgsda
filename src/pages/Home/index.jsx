import React from "react";
import { useHistory } from "react-router";
import Button from "../../components/Button";
import Card from "@material-ui/core/Paper";
import { Container, Content } from "./styles";

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
      <Card elevation={3} sx={{ padding: "20px", maxWidth: "400px" }}>
        <h1>Patrick's Hub</h1>
        <p>
          Patrick's Hub ajuda você a se conectar com várias pessoas
          programadoras da Kenzie Academy!
        </p>
        <Content>
          <Button selected="outlined" color="success" onClick={onRegister}>
            Registrar
          </Button>
          <Button selected="outlined" color="primary" onClick={onLogin}>
            Entrar
          </Button>
        </Content>
      </Card>
    </Container>
  );
}

export default Home;
