// src/components/instances/InstanceCard.tsx
import { Button, Card, CardContent } from "@evoapi/design-system";
import {
  Settings,
  Trash2,
  Power,
  PowerOff,
  MessageSquare,
  Dot,
} from "lucide-react";
import type { Instance } from "@/types/instance";
import { cn } from '@/utils/cn';

type InstanceCardProps = {
  instance: Instance;
  isDeleting?: string | null;
  onSettings: (instance: Instance) => void;
  onDelete: (instance: Instance) => void;
  onConnect: (instance: Instance) => void;
  onDisconnect: (instance: Instance) => void;
  onSendMessage?: (instance: Instance) => void;
};

const StatusIndicator = ({ status }: { status: string }) => {
  const isConnected = status === "open";
  return (
    <div className="flex items-center">
      <Dot
        className={cn(
          "h-6 w-6",
          isConnected ? "text-green-500" : "text-red-500"
        )}
      />
      <span
        className={cn(
          "text-sm font-semibold",
          isConnected ? "text-green-500" : "text-red-500"
        )}
      >
        {isConnected ? "Conectado" : "Desconectado"}
      </span>
    </div>
  );
};

export default function InstanceCard({
  instance,
  isDeleting,
  onSettings,
  onDelete,
  onConnect,
  onDisconnect,
  onSendMessage,
}: InstanceCardProps) {
  const isConnected = instance.status === "open";

  return (
    <Card className="flex flex-col justify-between overflow-hidden shadow-lg transition-all hover:shadow-xl hover:-translate-y-1">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            {instance.profilePicUrl && (
              <div className="flex-shrink-0">
                <img
                  src={instance.profilePicUrl}
                  alt={instance.profileName || instance.instanceName}
                  className="h-12 w-12 rounded-full object-cover"
                />
              </div>
            )}
            <div className="flex-1">
              <h3 className="text-lg font-bold text-foreground">
                {instance.profileName || instance.instanceName}
              </h3>
              <p className="text-sm text-muted-foreground">
                {instance.instanceName}
              </p>
            </div>
          </div>
          <StatusIndicator status={instance.status} />
        </div>

        {instance.profileStatus && (
          <div className="mt-4 text-sm text-muted-foreground">
            <p className="truncate">{instance.profileStatus}</p>
          </div>
        )}
      </CardContent>

      <div className="flex items-center justify-end gap-2 border-t border-border bg-muted/50 p-3">
        {isConnected ? (
          <Button
            variant="ghost"
            size="icon"
            className="text-yellow-500 hover:bg-yellow-500/10 hover:text-yellow-400"
            onClick={() => onDisconnect(instance)}
          >
            <PowerOff className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            className="text-green-500 hover:bg-green-500/10 hover:text-green-400"
            onClick={() => onConnect(instance)}
          >
            <Power className="h-4 w-4" />
          </Button>
        )}
        {isConnected && onSendMessage && (
          <Button
            variant="ghost"
            size="icon"
            className="text-blue-500 hover:bg-blue-500/10 hover:text-blue-400"
            onClick={() => onSendMessage(instance)}
          >
            <MessageSquare className="h-4 w-4" />
          </Button>
        )}
        <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:bg-muted"
            onClick={() => onSettings(instance)}
          >
            <Settings className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-red-500 hover:bg-red-500/10 hover:text-red-400"
          disabled={isDeleting === instance.instanceName}
          onClick={() => onDelete(instance)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}
