import { z } from "zod";

export const RoleZ = z.enum(["admin", "manager", "user"]);

export const PasswordZ = z
  .string()
  .min(8, "Mínimo 8 caracteres")
  .regex(/[A-Z]/, "Precisa de maiúscula")
  .regex(/[a-z]/, "Precisa de minúscula")
  .regex(/[0-9]/, "Precisa de número")
  .regex(/[^A-Za-z0-9]/, "Precisa de símbolo");

export const RegisterZ = z.object({
  name: z.string().min(2, "Nome muito curto"),
  email: z.string().email("Email inválido").transform((e: string) => e.toLowerCase()),
  password: PasswordZ,
  roles: z.array(RoleZ).optional(),
});

export const LoginZ = z.object({
  email: z.string().email("Email inválido").transform((e: string) => e.toLowerCase()),
  password: z.string().min(8, "Mínimo 8 caracteres"),
});
