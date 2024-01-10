import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { NavLink, useNavigate } from "react-router-dom";
import "./styles.css";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

interface FormData {
  email: string;
  password: string;
}

const schema = z.object({
  email: z
    .string()
    .min(1, { message: "Este campo tem que ser preenchido." })
    .email("Este não é um email válido."),
  password: z
    .string()
    .min(6, { message: "A senha deve conter pelo menos 6 caracteres" }),
});

export default function Login() {
  const auth = useContext(AuthContext)
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormData) {
    if (data) {
      const isLogged = await auth.login(
        data.email,
        data.password
      );
      if (isLogged) {
        navigate("/");
      } else {
        alert("Something went wrong, verify you email or password.");
      }
    }

    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="auth-page">
      <h2 style={{ textAlign: "center" }}>Login</h2>
      <label htmlFor="email">Email:</label>
      <input type="email" {...register("email")} />
      {errors.email?.message && <p>{errors.email?.message}</p>}

      <label htmlFor="password">Password:</label>
      <input type="string" {...register("password")} />
      {errors.password?.message && <p>{errors.password?.message}</p>}

      <button type="submit">Login</button>
      <div className="info">
        <p>
          Nao possui uma conta? <NavLink to="/register">Criar conta.</NavLink>
        </p>
      </div>
    </form>
  );
}
