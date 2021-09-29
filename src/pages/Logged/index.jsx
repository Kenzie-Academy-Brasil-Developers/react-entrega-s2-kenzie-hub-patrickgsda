import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useHistory, Link, Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Container, Content } from "./styles";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Typography from "../../components/Typography";
import api from "../../services/api";
import { Card } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { toast } from "react-toastify";

function Logged(authenticated) {
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("@KenzieHub:user"));
  const [techs, setTechs] = useState([]);
  const [token] = useState(
    JSON.parse(localStorage.getItem("@KenzieHub:token")) || ""
  );
  const formSchema = yup.object().shape({
    title: yup.string().required(""),
    status: yup.string().required(""),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  useEffect(() => {
    api
      .get("https://kenziehub.herokuapp.com/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setTechs(response.data.techs))
      .catch((error) => "");
  });
  const onSubmitForm = (data) => {
    api
      .post("https://kenziehub.herokuapp.com/users/techs", data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((data) => {
        toast.success("Tecnologia Adicionada!");
        console.log(data);
      })
      .catch((_) => toast.error("Tecnologia já está adicionada!"));
  };

  const delTech = (id) => {
    api
      .delete(`https://kenziehub.herokuapp.com/users/techs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        toast.success("Tecnologia Deletada!");
      });
  };

  function logout() {
    localStorage.clear();
    window.location.href = "/";
  }

  if (!authenticated.authenticated) {
    return <Redirect to="/login" />;
  }

  return (
    <Container>
      <Card elevation={3} sx={{ padding: "20px", maxWidth: "555px" }}>
        <Button
          sx={{ position: "relative", float: "right" }}
          selected="outlined"
          color="error"
          onClick={() => logout()}
        >
          Sair
        </Button>
        <h1>Patrick's Hub</h1>

        <Typography sx={{ marginBottom: "50px" }} selected="h6">
          Bem vindo, {user.name}.
        </Typography>

        <h2>Minhas Infos</h2>

        <Typography sx={{ marginBottom: "5px" }} selected="h6">
          Bio: {user.bio}.
        </Typography>
        <Typography sx={{ marginBottom: "5px" }} selected="h6">
          E-mail: {user.email}.
        </Typography>
        <Typography sx={{ marginBottom: "5px" }} selected="h6">
          Contato: {user.contact}.
        </Typography>
        <Typography sx={{ marginBottom: "5px" }} selected="h6">
          Curso: {user.course_module}.
        </Typography>

        <h2>Minhas Techs</h2>

        <Box
          sx={{ display: "flex" }}
          component="form"
          onSubmit={handleSubmit(onSubmitForm)}
        >
          <Input
            label="Nome da Tecnologia"
            name="title"
            register={register}
            error={!!errors.title}
          ></Input>
          <Input
            label="Nivel da Tecnologia"
            name="status"
            register={register}
            error={!!errors.status}
          ></Input>
          <Button selected="outlined" color="success" type="submit">
            Adicionar
          </Button>
        </Box>
        <Content>
          {techs &&
            techs.map((tech, index) => {
              return (
                <Card
                  key={index}
                  elevation={3}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "20px",
                    margin: "10px",
                    maxWidth: "150px",
                  }}
                >
                  <Typography selected="h6">{tech.title}</Typography>
                  <Typography selected="h7">{tech.status}</Typography>
                  <Button
                    sx={{ marginTop: "10px" }}
                    selected="outlined"
                    color="error"
                    onClick={() => delTech(tech.id)}
                  >
                    Excluir
                  </Button>
                </Card>
              );
            })}
        </Content>
      </Card>
    </Container>
  );
}

export default Logged;
