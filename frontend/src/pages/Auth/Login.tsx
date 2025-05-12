import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { Helmet } from "react-helmet";

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
  const auth = useContext(AuthContext);
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
      const isLogged = await auth.login(data.email, data.password);
      if (isLogged) {
        navigate("/");
      } else {
        alert("Something went wrong, verify you email or password.");
      }
    }

    console.log(data);
  }

  return (
      <div className="w-full max-w-2xl overflow-visible bg-gradient-to-l from-slate-300 to-slate-100 text-slate-600 border border-slate-300 grid grid-col-2 justify-center p-4 gap-4 rounded-lg shadow-md">
      <Helmet title="Login" />
      
      <form onSubmit={handleSubmit(onSubmit)} className="w-full mt-4 space-y-3">
        <div className="mt-14   flex flex-col justify-center items-center space-y-2" >
          <h2 className="text-2xl text-slate-700 font-bold">Login</h2>
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            className="outline-none border-2 rounded-md px-2 py-1 text-slate-500 w-full focus:border-blue-300"
            placeholder="Email"
            id="email"
            type="email"
            {...register("email")}
          />
          {errors.email?.message && (
            <p className="text-red-500">{errors.email?.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="password">Senha:</label>
          <input
            className="outline-none border-2 rounded-md px-2 py-1 text-slate-500 w-full focus:border-blue-300"
            placeholder="Password"
            id="password"
            type="password"
            {...register("password")}
          />
          {errors.password?.message && (
            <p className="text-red-500">{errors.password?.message}</p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              className="mr-2 w-4 h-4"
              id="remember"
              name="remember"
              type="checkbox"
            />
            <span className="text-slate-500">Lembrar </span>
          </div>
          <a className="text-blue-500 font-medium hover:underline" href="#">
            Forgot Password
          </a>
        </div>
        <button
          className="w-full justify-center py-1 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-md text-white ring-2"
          id="login"
          name="login"
          type="submit"
        >
          login
        </button>
        <p className="flex justify-center space-x-1">
          <span className="text-slate-700"> Nao tem conta? </span>
          <NavLink to="/register" className="text-blue-500 hover:underline">
            Criar conta
          </NavLink>
        </p>
      </form>
    </div>
  );
}
