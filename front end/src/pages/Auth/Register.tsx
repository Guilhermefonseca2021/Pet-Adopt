import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./styles.css";
import { AuthContext } from "../../context/AuthContext";

export interface FormDataProps {
  image: File;
  name: string;
  email: string;
  password: string;
  confirmpassword: string;
  phone: string;
}

const schema = z.object({
  name: z.string().min(3, { message: "Por favor insira um nome válido." }),
  email: z
    .string()
    .min(6, { message: "Este campo tem que ser preenchido." })
    .email("Este não é um email válido."),
  password: z
    .string()
    .min(6, { message: "A senha deve conter ao menos 6 caracteres" }),
  confirmpassword: z
    .string()
    .min(6, { message: "Confirmação de senha inválida" }),
  phone: z
    .string()
    .min(8, { message: "Digite um numero valido." }),
});

export default function Register() {
  const [output, setOutput] = useState<FormDataProps>();
  console.log(output);
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: zodResolver(schema),
  });
  
  async function onSubmit(data: FormDataProps) {
    if (data) {
      const isLogged = await auth.register(
        data.name,
        data.email,
        data.password,
        data.confirmpassword,
        data.phone,
      );
      if (isLogged) {
        navigate("/");
      } else {
        alert("Something went wrong, verify you email or password.");
      }
    }
    setOutput(data);
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="auth-page">
      <h2 style={{ textAlign: "center" }}>Login</h2>

      <label htmlFor="name">Name:</label>
      <input {...register("name")} />
      {errors.name?.message && <p>{errors.name?.message}</p>}

      <label htmlFor="phone">Telefone:</label>
      <input type="number" {...register("phone")} />
      {errors.phone?.message && <p>{errors.phone?.message}</p>}

      <label htmlFor="email">Email:</label>
      <input type="email" {...register("email")} />
      {errors.email?.message && <p>{errors.email?.message}</p>}

      <label htmlFor="password">Senha:</label>
      <input type="number" {...register("password")} />
      {errors.password?.message && <p>{errors.password?.message}</p>}

      <label htmlFor="confirmpassword">Confirmacao de senha:</label>
      <input type="number" {...register("confirmpassword")} />
      {errors.confirmpassword?.message && <p>{errors.confirmpassword?.message}</p>}

      <button type="submit">Criar conta</button>
      <div className="info">
        <p>
          Ja possui conta? <NavLink to="/login">Faca login.</NavLink>
        </p>
      </div>
    </form>
  );
}
