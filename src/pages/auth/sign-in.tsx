import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Loader2Icon } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { signIn } from '@/api/sign-in'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/hooks/useAuth'

const signInForm = z.object({
  email: z.string().email('Email obrigatório'),
  password: z.string().min(1, 'Forneça uma senha válida'),
})

type SignInForm = z.infer<typeof signInForm>

export function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInForm),
  })

  const auth = useAuth()

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
    onSuccess: ({ access_token: token }) => {
      auth.saveCredentials(token)
    },
  })

  async function handleSignIn(data: SignInForm) {
    try {
      await authenticate({
        email: data.email,
        password: data.password,
      })
    } catch (err) {
      toast.error(`${err}`)
    }
  }

  return (
    <>
      <Helmet title="login" />

      <div className="p-8">
        <h1 className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Acessar Painel
            </h1>
            <p className="text-sm text-muted-foreground">
              Gerencie seus produtos, clientes e vendas!
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(handleSignIn)}>
            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                errorMessage={errors.email?.message}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                {...register('password')}
                errorMessage={errors.password?.message}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader2Icon className="animate-spin" />
              ) : (
                'Cadastrar'
              )}
            </Button>
          </form>
        </h1>
      </div>
    </>
  )
}
