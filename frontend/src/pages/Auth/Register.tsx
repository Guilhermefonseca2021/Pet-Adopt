import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { NavLink, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useAuth } from "../../hooks/useAuth";
import api from "../../utils/api";

export interface FormDataProps {
  image: FileList;
  name: string;
  email: string;
  password: string;
  confirmpassword: string;
  phone: string;
}


const schema = z.object({
  name: z.string().min(3, { message: "Por favor insira um nome válido." }),
  image: z
    .instanceof(FileList)
    .refine(files => files.length === 1, { message: "Por favor, envie apenas uma imagem." })
    .refine(
      files =>
        files.length > 0 &&
        ["image/jpeg", "image/png", "image/jpg"].includes(files[0]?.type),
      { message: "O arquivo deve ser uma imagem (JPG ou PNG)." }
    ),
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
  phone: z.string().min(8, { message: "Digite um número válido." }),
});


export default function Register() {
  const navigate = useNavigate();
  const auth = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormDataProps) {
    // const formData = new FormData();
    // formData.append("name", data.name);
    // formData.append("email", data.email);
    // formData.append("password", data.password);
    // formData.append("confirmpassword", data.confirmpassword);
    // formData.append("phone", data.phone);
    // formData.append("image", data.image[0]);
  
    try {
      const response = auth.register(data.name, data.email, data.image, data.password, data.confirmpassword, data.phone)
  
      if (await response) {
        navigate("/"); 
      } else {
        alert("Algo deu errado, por favor tente novamente.");
      }
    } catch (error) {
      console.error("Erro no registro:", error);
      alert("Algo deu errado, por favor tente novamente.");
    }
  }
  
  return (
    <div>
      <Helmet title="register" />
      <div className="flex flex-col justify-center items-center space-y-2">
        <h2 className="text-2xl font-medium text-slate-700">Criar conta</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full mt-4 space-y-3">
        <div>
          <label htmlFor="name">Name:</label>
          <input
            className="outline-none border-2 rounded-md px-2 py-1 text-slate-500 w-full focus:border-blue-300"
            placeholder="Username"
            id="username"
            type="text"
            {...register("name")}
          />
          {errors.name?.message && (
            <p className="text-red-500">{errors.name?.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="phone">Telefone:</label>
          <input
            className="outline-none border-2 rounded-md px-2 py-1 text-slate-500 w-full focus:border-blue-300"
            placeholder="Phone"
            id="phone"
            type="number"
            {...register("phone")}
          />
          {errors.phone?.message && (
            <p className="text-red-500">{errors.phone?.message}</p>
          )}
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
        <div>
          <label htmlFor="confirmpassword">Confirmacao de senha:</label>
          <input
            className="outline-none border-2 rounded-md px-2 py-1 text-slate-500 w-full focus:border-blue-300"
            placeholder="Confirm Password"
            id="confirmpassword"
            type="password"
            {...register("confirmpassword")}
          />
          {errors.confirmpassword?.message && (
            <p className="text-red-500">{errors.confirmpassword?.message}</p>
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
        <div>
          <label htmlFor="image">Imagem de perfil:</label>
          <input
            id="image"
            type="file"
            accept="image/*"
            {...register("image")}
            className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-gray-400"
          />
          {errors.image && (
            <p className="text-red-500">{errors.image.message}</p>
          )}
        </div>

        <button
          className="w-full justify-center py-1 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-md text-white ring-2"
          id="register"
          name="register"
          type="submit"
        >
          Criar conta
        </button>

        <p className="flex justify-center space-x-1">
          <span className="text-slate-700"> Já tem conta? </span>
          <NavLink to="/login" className="text-blue-500 hover:underline">
            Login
          </NavLink>
        </p>
      </form>
    </div>
  );
}
