'use client';

import AuthGuard from '@/components/auth/AuthGuard';
import { useAuthStore } from '@/stores/auth.store';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

/**
 * Este é o conteúdo real do Dashboard, que só será renderizado
 * se o AuthGuard permitir.
 */
function DashboardContent() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  function handleLogout() {
    logout();
    router.replace('/login');
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-lg animate-in fade-in-0 zoom-in-95">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Dashboard Protegido</CardTitle>
          <CardDescription>
            Bem-vindo à sua área segura.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Logado como: <span className="font-semibold">{user?.email}</span>
          </p>
          <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
            <h3 className="font-semibold">Dados do Usuário</h3>
            <pre className="mt-2 overflow-x-auto text-sm">
              {JSON.stringify(user, null, 2)}
            </pre>
          </div>
          <Button onClick={handleLogout} variant="destructive" className="w-full">
            Sair (Logout)
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

/**
 * Esta é a página exportada. Ela não renderiza nada diretamente,
 * apenas usa o AuthGuard como "porteiro" para o conteúdo real.
 */
export default function DashboardPage() {
  return (
    <AuthGuard>
      <DashboardContent />
    </AuthGuard>
  );
}