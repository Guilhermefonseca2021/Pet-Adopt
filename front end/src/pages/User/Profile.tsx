import { useContext } from "react";
import './profile.css'
import { AuthContext } from "../../context/AuthContext";

export default function Profile() {
  const user = useContext(AuthContext).user;

  function onFileChange() {}

  return (
    <section className="section-user">
      <p>Preview Img</p>
      <form action="">
        <label htmlFor=""> Image: </label>
        <input type="file" name="image" onChange={onFileChange} />
        <label htmlFor=""> Telefone: </label>
        <input type="text" name="email" placeholder={user?.email || "Digite um email valido."} />
        <label htmlFor=""> Name:</label>
        <input type="text" placeholder={user?.name || "Digite um novo nome..."}  />
        <label htmlFor=""> Email:</label>
        <input type="email" placeholder={user?.email}  />
        <label htmlFor=""> Senha:</label>
        <input type="password" placeholder="Nova senha..."  />
        <label htmlFor=""> Nova senha:</label>
        <input type="password" placeholder="Confirmar nova senha." />
        <input type="submit" value="Editar" />
      </form>
    </section>
  );
}
