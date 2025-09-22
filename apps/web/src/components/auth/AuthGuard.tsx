'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/stores/auth.store';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const token = useAuthStore((state) => state.token);
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  // Efeito para garantir que estamos no lado do cliente (navegador)
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Efeito que lida com o redirecionamento
  useEffect(() => {
    // Só age depois de ter certeza que estamos no cliente
    // e o Zustand já teve a chance de se hidratar do localStorage.
    if (isClient && !token) {
      router.replace('/login');
    }
  }, [isClient, token, router]);

  // Se estivermos no servidor, ou antes do token ser verificado no cliente,
  // mostramos uma tela de carregamento.
  if (!isClient || !token) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p>Verificando acesso...</p>
      </div>
    );
  }

  // Se tudo estiver certo (estamos no cliente e o token existe),
  // renderiza a página protegida que foi passada como {children}.
  return <>{children}</>;
}