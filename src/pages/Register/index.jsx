import * as React from "react";
import * as yup from "yup";
import { useHistory, Link, Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Card from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import { Container } from "./styles";
import Button from "../../components/Button";
import Input from "../../components/Input";
import api from "../../services/api";
import { toast } from "react-toastify";

const regexPassword =
  /^((?=.*[?!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;
const formSchema = yup.object().shape({
  name: yup
    .string()
    .required("Nome obrigatório")
    .matches("^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ's ]+$", "Nome inválido"),
  email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
  password: yup
    .string()
    .min(8, "Senha com no mínimo 8 caracteres")
    .matches(
      regexPassword,
      "Necessário ter letras, números e ao menos um símbolo!"
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "As senhas não são iguais"),
  bio: yup.string().required("Bio obrigatória"),
  contact: yup.string().required("Contato obrigatório"),
  course_module: yup.string().required("Curso obrigatório"),
});

function Register({ authenticated, setAuthenticated }) {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSubmitForm = ({
    email,
    password,
    name,
    bio,
    contact,
    course_module,
  }) => {
    const user = { email, password, name, bio, contact, course_module };

    api
      .post("/users", user)
      .then((_) => {
        toast.success("Sucesso ao criar a conta");
        history.push("/login");
      })
      .catch((err) => {
        toast.error("Erro ao criar a conta");
      });
    console.log(user);
  };

  if (authenticated) {
    return <Redirect to="/logged" />;
  }

  return (
    <Container>
      <Card elevation={3} sx={{ padding: "20px", maxWidth: "400px" }}>
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
          <h1>Patrick's Hub</h1>

          <Input
            label="Nome"
            name="name"
            register={register}
            error={!!errors.name}
            helperText={errors.name?.message}
          ></Input>

          <Input
            label="E-mail"
            name="email"
            register={register}
            error={!!errors.email}
            helperText={errors.email?.message}
          ></Input>

          <Input
            label="Senha"
            name="password"
            type="password"
            register={register}
            error={!!errors.password}
            helperText={errors.password?.message}
          ></Input>

          <Input
            label="Confirmação de Senha"
            name="confirmPassword"
            type="password"
            register={register}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          ></Input>
          <Input
            label="Bio"
            name="bio"
            register={register}
            error={!!errors.bio}
            helperText={errors.bio?.message}
          ></Input>
          <Input
            label="Linkedin"
            name="contact"
            register={register}
            error={!!errors.contact}
            helperText={errors.contact?.message}
          ></Input>
          <Input
            label="Curso"
            name="course_module"
            register={register}
            error={!!errors.course_module}
            helperText={errors.course_module?.message}
          ></Input>
          <Button selected="outlined" color="success" type="submit">
            REGISTRAR
          </Button>
        </Box>
      </Card>
    </Container>
  );
}

export default Register;
