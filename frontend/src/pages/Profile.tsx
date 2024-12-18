import * as z from "zod";

const schema = z.object({
  email: z
    .string()
    .min(1, { message: "Este campo tem que ser preenchido." })
    .email("Este não é um email válido."),
  password: z
    .string()
    .min(6, { message: "A senha deve conter pelo menos 6 caracteres" }),
});

export default function Profile() {
  return (
    <div>Profile</div>
  )
}
