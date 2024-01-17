import { useContext, useState } from "react";
import "./profile.css";
import { AuthContext } from "../../context/AuthContext";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {  useForm } from "react-hook-form";
import { FormDataProps } from "../Auth/Register";
import { useNavigate } from "react-router-dom";
import convertFormDataToFormDataProps from "../../utils/convertData";

const fileSchema = z.object({
  size: z.number(),
  type: z.string(),
  name: z.string(),
});

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
  image: fileSchema,
});
export default function Profile() {
  const user = useContext(AuthContext).user;
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    setSelectedFile(file || null);
  }

  async function onSubmit(data: FormDataProps) {
    if (data) {
      const image = selectedFile;
    
      try {
        const formData = new FormData();
        
        if (image) {
          formData.append('image', image);
        }

        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("password", data.password);
        formData.append("confirmpassword", data.confirmpassword);
        formData.append("phone", data.phone);

        const userData = convertFormDataToFormDataProps(formData)

        const updatedUser = await auth.updateUser(userData.image, userData.name, userData.email, userData.password, userData.confirmpassword, userData.phone)

        if (updatedUser) {
          navigate("/");
        } else {
          alert("Something went wrong, verify your email or password.");
        }
      } catch (error) {
        console.error("Error updating user:", error);
      }
    }
  }

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <section className="section-user">
      <p>preview img</p>
      <img src={user?.image} alt="" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-container">
          <input type="file" {...register("image")} onChange={onFileChange} />
        </div>
        <label htmlFor=""> Name: </label>
        <input
          type="text"
          {...register("name")}
          placeholder={user?.name || "Digite um novo nome..."}
        />
        <label htmlFor=""> Telefone: </label>
        <input
          type="text"
          {...register("phone")}
          placeholder={user?.email || "Adicionar novo numero."}
        />
        <label htmlFor=""> Email:</label>
        <input
          type="email"
          {...register("email")}
          placeholder={user?.email || "Digite um e-mail valido..."}
        />
        <label htmlFor=""> Nova Senha:</label>
        <div className="password-toggle">
          <input
            type={passwordVisible ? "text" : "password"}
            className="passwordInput"
            {...register("password")}
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
            {...register("confirmpassword")}
            placeholder="Confirmar nova senha..."
          />
          <button onClick={togglePasswordVisibility} />
        </div>
        <input type="submit" value="Editar" />
      </form>
    </section>
  );
}
