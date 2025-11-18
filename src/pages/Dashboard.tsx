// src/pages/Dashboard.tsx
import { DashboardCard } from '@/components/dashboard/DashboardCard';
import { Layers, CheckCircle, Send } from 'lucide-react';

function Dashboard() {
  return (
    <div className="p-8">
      <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground">Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <DashboardCard
          title="Total de Instâncias"
          value="12"
          description="Número total de instâncias criadas"
          icon={Layers}
        />
        <DashboardCard
          title="Instâncias Conectadas"
          value="8"
          description="Instâncias atualmente online"
          icon={CheckCircle}
        />
        <DashboardCard
          title="Mensagens Enviadas (24h)"
          value="1,250"
          description="Total de mensagens enviadas nas últimas 24 horas"
          icon={Send}
        />
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Próximos Passos</h2>
        <p className="mt-2 text-muted-foreground">
          Esta seção será implementada em breve com mais informações e ações rápidas.
        </p>
      </div>
    </div>
  );
}

export default Dashboard;
