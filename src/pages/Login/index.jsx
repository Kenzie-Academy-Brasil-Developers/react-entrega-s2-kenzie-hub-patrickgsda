import * as React from "react";
import * as yup from "yup";
import { useHistory, Link, Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import { Container } from "./styles";
import Button from "../../components/Button";
import api from "../../services/api";
import { toast } from "react-toastify";

const formSchema = yup.object().shape({
  email: yup.string().required("").email("E-mail inválido"),
  password: yup.string().required(),
});

function Login({ authenticated, setAuthenticated }) {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSubmitForm = (data) => {
    api
      .post("/sessions", data)
      .then((response) => {
        toast.success("Você entrou!");
        const { token } = response.data;
        localStorage.setItem("@KenzieHub:token", JSON.stringify(token));
        setAuthenticated(true);
        history.push("/logged");
      })
      .catch((err) => {
        toast.error("E-mail ou senha incorretos.");
      });
  };

  if (authenticated) {
    return <Redirect to="/logged" />;
  }

  return (
    <Container>
      <Card elevation={3} sx={{ padding: "20px", maxWidth: "350px" }}>
        <h1>Kenzie Hub</h1>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": {
              m: 1,
              width: "35ch",
            },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#FFF",
          }}
          onSubmit={handleSubmit(onSubmitForm)}
        >
          <TextField
            label="E-mail"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          ></TextField>

          <TextField
            label="Senha"
            type="password"
            {...register("password")}
            error={!!errors.password}
          ></TextField>

          <Button selected="outlined" color="primary" type="submit">
            ENTRAR
          </Button>
        </Box>
      </Card>
    </Container>
  );
}

export default Login;
