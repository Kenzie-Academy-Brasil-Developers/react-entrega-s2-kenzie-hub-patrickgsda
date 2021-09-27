import * as React from "react";
import * as yup from "yup";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import { Container } from "./styles";
import Button from "../Button";

const formSchema = yup.object().shape({
  email: yup.string().required("").email("E-mail inválido"),
  password: yup.string().required(),
});

function Form() {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSubmitForm = (data) => {
    history.push("/logged");
  };

  return (
    <Container>
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

        <Button type="submit">ENTRAR</Button>
      </Box>
    </Container>
  );
}

export default Form;
