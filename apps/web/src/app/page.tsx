import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md animate-in fade-in-0 zoom-in-95">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold tracking-tight">
            Projeto Full-Stack
          </CardTitle>
          <CardDescription className="pt-2">
            Next.js | NestJS | MongoDB | Angular Material | Terraform | Kubernetes
          </CardDescription>
        </CardHeader>
		
        <CardContent className="flex flex-col gap-4">
          <Button asChild>
            <Link href="/dashboard">Acessar o Dashboard</Link>
          </Button>
		  
          <div className="flex justify-center gap-4">
            <Button variant="outline" asChild>
              <Link href="/login">Login []</Link>
            </Button>
			
            <Button variant="secondary" asChild>
              <Link href="/register"> Registrar </Link>
            </Button>
          </div>
		  
        </CardContent>
      </Card>
    </main>
  );
}