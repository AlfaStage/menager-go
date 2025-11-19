// src/components/instances/QRCodeModal.tsx
import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Button,
} from '@evoapi/design-system';
import { QrCode, RefreshCw, CheckCircle2, Copy } from 'lucide-react';
import { toast } from 'sonner';
import type { Instance } from '@/types/instance';
import { Skeleton } from '@evoapi/design-system';

interface QRCodeModalProps {
  instance: Instance | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRefresh?: () => Promise<void>;
}

export default function QRCodeModal({
  instance,
  open,
  onOpenChange,
  onRefresh,
}: QRCodeModalProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (!open || !instance || instance.connected) return;
    const interval = setInterval(() => {
      if (onRefresh) onRefresh().catch(console.error);
    }, 10000);
    return () => clearInterval(interval);
  }, [open, instance, onRefresh]);

  const handleRefresh = async () => {
    if (!onRefresh) return;
    setIsRefreshing(true);
    try {
      await onRefresh();
      toast.success('QR Code atualizado!');
    } catch (error) {
      toast.error('Erro ao atualizar QR Code');
    } finally {
      setIsRefreshing(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Código de pareamento copiado!');
  };

  if (!instance) return null;

  if (instance.connected) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
            <h2 className="text-2xl font-bold text-foreground">Conectado com Sucesso!</h2>
            <p className="text-muted-foreground mt-2">
              A instância <strong>{instance.instanceName}</strong> está conectada.
            </p>
            <Button onClick={() => onOpenChange(false)} className="mt-6 w-full">
              Fechar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <QrCode className="h-6 w-6 text-primary" />
            Conectar Instância
          </DialogTitle>
          <DialogDescription>
            Use o QR Code ou o código de pareamento para conectar <strong>{instance.instanceName}</strong>.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center py-4">
          <div className="flex flex-col items-center justify-center">
            {instance.qrcode?.base64 ? (
              <img
                src={instance.qrcode.base64}
                alt="QR Code"
                className="h-64 w-64 rounded-lg border p-1"
              />
            ) : (
              <Skeleton className="h-64 w-64 rounded-lg" />
            )}
            <Button
              variant="outline"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="mt-4 w-full"
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Atualizando...' : 'Atualizar QR Code'}
            </Button>
          </div>

          <div className="space-y-4">
            {instance.qrcode?.pairingCode && (
              <div>
                <Label htmlFor="pairing-code">Ou use o Código de Pareamento</Label>
                <div className="flex items-center gap-2 mt-2">
                  <p
                    id="pairing-code"
                    className="flex-1 rounded-md border bg-muted px-4 py-2 font-mono text-lg font-semibold"
                  >
                    {instance.qrcode.pairingCode}
                  </p>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(instance.qrcode?.pairingCode || '')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
            <div>
              <h3 className="font-semibold text-foreground">Como Conectar:</h3>
              <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground mt-2">
                <li>Abra o WhatsApp no seu celular</li>
                <li>Vá para <span className="font-semibold">Configurações &gt; Aparelhos conectados</span></li>
                <li>Toque em <span className="font-semibold">Conectar um aparelho</span></li>
                <li>Aponte a câmera para o QR Code ou use o código de pareamento</li>
              </ol>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
