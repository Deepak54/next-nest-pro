'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useLogin } from '@/hooks/useLogin'
import { toast } from 'sonner'

// 1. Schema de validação com Zod
const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'O e-mail é obrigatório.' })
    .email({ message: 'Por favor, insira um e-mail válido.' }),
  password: z
    .string()
    .min(1, { message: 'A senha é obrigatória.' })
    .min(8, { message: 'A senha deve ter no mínimo 8 caracteres.' }),
})

// 2. Extrai o tipo do schema para usar no TypeScript
type FormData = z.infer<typeof formSchema>

// 3. Exporta o componente da página
export default function LoginPage() {
  // Pega a função de login e o estado de carregamento do nosso hook customizado
  const { mutate: login, isPending } = useLogin()

  // Configura o formulário com React Hook Form e o resolvedor Zod
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  // Função que é chamada quando o formulário é enviado com sucesso (após passar na validação)
  function onSubmit(data: FormData) {
    login(data)
  }

  // 4. Renderiza o JSX do formulário
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-950">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Entre com seu e-mail e senha para acessar a plataforma.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="seu@email.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField control={form.control} name="password" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
						<Input placeholder="********" type="password" {...field} />
					  </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

				<Button	onClick={() => toast.success('Teste de notificação!')}>
					Testar Notificação
				</Button>

              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>
          </Form>
        </CardContent>
        <div className="mt-4 text-center text-sm pb-4">
          Não tem uma conta?{' '}
          <Link href="/register" className="underline">
            Registre-se
          </Link>
        </div>
      </Card>
    </div>
  )
}