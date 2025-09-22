// apps/web/src/hooks/useLogin.ts
'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuthStore } from '@/stores/auth.store';

export const useLogin = () => {
  const { setToken, setUser } = useAuthStore()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (credentials: any) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || 'Falha no login')
      }
      return response.json()
    },
    onSuccess: (data) => {
      setToken(data.accessToken)
      setUser(data.user)
      queryClient.clear()
      window.location.href = '/dashboard'
    },
    onError: (error) => {
      console.error('Erro no login:', error.message)
      alert(`Erro no login: ${error.message}`)
    },
  })
}