// src/components/dashboard/DashboardCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@evoapi/design-system';
import { LucideIcon } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
}

export function DashboardCard({ title, value, description, icon: Icon }: DashboardCardProps) {
  return (
    <Card className="shadow-lg transition-all hover:shadow-xl hover:-translate-y-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold text-foreground">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  );
}
