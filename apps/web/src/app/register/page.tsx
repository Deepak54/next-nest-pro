'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useRegister } from '@/hooks/useRegister';

// 1. Schema Zod ÚNICO e CORRETO para este formulário
const formSchema = z
  .object({
    email: z.string().email({ message: 'E-mail inválido.' }),
    password: z.string().min(8, { message: 'A senha deve ter no mínimo 8 caracteres.' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem.',
    path: ['confirmPassword'], // Mostra o erro no campo de confirmação
  });

// Extrai o tipo a partir do schema
type FormData = z.infer<typeof formSchema>;

export default function RegisterPage() {
  const { mutate: register, isPending } = useRegister();

  // 2. Inicializa o useForm com o schema CORRETO
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  // 3. Função onSubmit que agora usa nosso hook 'useRegister'
  function onSubmit(data: FormData) {
    // Não precisamos do confirmPassword na API, então podemos omiti-lo
    const { confirmPassword, ...submissionData } = data;
    register(submissionData);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-950">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Registrar</CardTitle>
          <CardDescription>
            Crie sua conta para acessar a plataforma.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* 4. O formulário agora está conectado corretamente */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input placeholder="seu@email.com" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input placeholder="********" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar Senha</FormLabel>
                    <FormControl>
                      <Input placeholder="********" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? 'Registrando...' : 'Criar Conta'}
              </Button>
            </form>
          </Form>
        </CardContent>
        <div className="mb-4 text-center text-sm">
          Já tem uma conta?{' '}
          <Link href="/login" className="underline">
            Faça o login
          </Link>
        </div>
      </Card>
    </div>
  );
}