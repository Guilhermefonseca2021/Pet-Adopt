import { useContext, useState } from "react";
import "./profile.css";
import { AuthContext } from "../../context/AuthContext";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormData } from "../Auth/Register";
import { useNavigate } from "react-router-dom";

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
  phone: z.string().min(8, { message: "Digite um numero valido." }),
});

export default function Profile() {
  const user = useContext(AuthContext).user;
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  
  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onFileChange() {}

  async function onSubmit(data: FormData) {
    if(data) {
      const updatedUser = await auth.updateUser(
        data.name,
        data.email,
        data.password,
        data.confirmpassword,
        data.phone,
      )
      if (updatedUser) {
        navigate("/");
      } else {
        alert("Something went wrong, verify you email or password.");
      }
    }
  }

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <section className="section-user">
      <p>Preview Img</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-container">
          <input type="file" {...register("name")} onChange={onFileChange} />
        </div>
        <label htmlFor=""> Name:</label>
        <input
          type="text"
          placeholder={user?.name || "Digite um novo nome..."}
        />
        <label htmlFor=""> Telefone: </label>
        <input
          type="text"
          name="email"
          placeholder={user?.email || "Adicionar novo numero."}
        />
        
        <label htmlFor=""> Email:</label>
        <input
          type="email"
          placeholder={user?.email || "Digite um e-mail valido..."}
        />
        <label htmlFor=""> Nova Senha:</label>
        <div className="password-toggle">
          <input
            type={passwordVisible ? "text" : "password"}
            className="passwordInput"
            placeholder="Nova senha..."
          />
          <button onClick={togglePasswordVisibility}>
            {passwordVisible ? "Hide" : "Show"}
          </button>
        </div>
        <label htmlFor=""> Confirmar Nova senha:</label>
        <div className="password-toggle">
          <input
            type={passwordVisible ? "text" : "password"}
            className="passwordInput"
            placeholder="Confirmar nova senha..."
          />
          <button onClick={togglePasswordVisibility} />
        </div>
        <input type="submit" value="Editar" />
      </form>
    </section>
  );
}
