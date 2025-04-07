import { useState } from "react";
import { 
  Cog, User, Bell, Lock, Palette, Monitor, Moon, Sun, Laptop, 
  CheckCircle, Save, ChevronRight, LogOut, Link, FlaskConical,
  Store, Calendar, Code, ExternalLink, BadgeCheck, AlertCircle
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  status: "connected" | "disconnected";
  buttonText: string;
  actionType: "connect" | "configure" | "documentation";
}

export default function Settings() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");
  
  const [theme, setTheme] = useState("system");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [language, setLanguage] = useState("pt-BR");
  const [configDialogOpen, setConfigDialogOpen] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);

  const [profile, setProfile] = useState({
    name: "Dr. Rafael Costa",
    email: "dr.rafael@smartcardio.com",
    specialty: "Cardiologia",
    license: "CRM 12345",
    phone: "(11) 98765-4321"
  });

  const integrations: Integration[] = [
    {
      id: "lab",
      name: "Laboratórios de Análises",
      description: "Integração com laboratórios para recebimento automático de resultados",
      icon: <FlaskConical />,
      status: "connected",
      buttonText: "Configurar",
      actionType: "configure"
    },
    {
      id: "pharmacy",
      name: "Farmácias",
      description: "Integração com farmácias para envio automático de receitas",
      icon: <Store />,
      status: "disconnected",
      buttonText: "Conectar",
      actionType: "connect"
    },
    {
      id: "gcalendar",
      name: "Google Calendar",
      description: "Sincronize sua agenda médica com o Google Calendar",
      icon: <Calendar />,
      status: "disconnected",
      buttonText: "Conectar",
      actionType: "connect"
    },
    {
      id: "api",
      name: "API para Desenvolvedores",
      description: "Acesse nossa API para integrar com seu próprio software",
      icon: <Code />,
      status: "disconnected",
      buttonText: "Ver documentação",
      actionType: "documentation"
    },
    {
      id: "ecg",
      name: "Dispositivos de ECG",
      description: "Conecte com aparelhos de ECG para importação direta de exames",
      icon: <ExternalLink />,
      status: "disconnected",
      buttonText: "Conectar",
      actionType: "connect"
    },
    {
      id: "portal",
      name: "Portal do Paciente",
      description: "Permita que pacientes acessem resultados e agendamentos",
      icon: <User />,
      status: "disconnected",
      buttonText: "Configurar",
      actionType: "configure"
    }
  ];

  const saveSettings = () => {
    toast({
      title: "Configurações salvas",
      description: "Suas configurações foram atualizadas com sucesso.",
    });
  };

  const saveProfile = () => {
    toast({
      title: "Perfil atualizado",
      description: "Suas informações de perfil foram atualizadas com sucesso.",
    });
  };

  const handleLogout = () => {
    toast({
      title: "Logout",
      description: "Você será redirecionado para a tela de login.",
    });
    // Redirecionar para a tela de login em uma aplicação real
  };

  const handleIntegrationAction = (integration: Integration) => {
    setSelectedIntegration(integration);
    
    if (integration.actionType === "configure") {
      setConfigDialogOpen(true);
    } else if (integration.actionType === "connect") {
      toast({
        title: `Conectando com ${integration.name}`,
        description: "Iniciando processo de integração...",
      });
    } else if (integration.actionType === "documentation") {
      toast({
        title: "Documentação da API",
        description: "A documentação seria aberta em uma nova janela.",
      });
    }
  };

  const handleConnectIntegration = () => {
    if (!selectedIntegration) return;
    
    toast({
      title: "Integração conectada",
      description: `A integração com ${selectedIntegration.name} foi configurada com sucesso.`,
    });
    
    setConfigDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gradient-cardio mb-1">Configurações</h1>
          <p className="text-muted-foreground">Configurações da sua conta e preferências do sistema</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-1">
          <CardContent className="p-0">
            <nav>
              <div className="space-y-1 py-2">
                <div className="px-3 py-2 text-sm font-semibold">Configurações</div>
                <Button
                  variant={activeTab === "profile" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("profile")}
                >
                  <User className="mr-2 h-4 w-4" />
                  Perfil
                </Button>
                <Button
                  variant={activeTab === "notifications" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("notifications")}
                >
                  <Bell className="mr-2 h-4 w-4" />
                  Notificações
                </Button>
                <Button
                  variant={activeTab === "appearance" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("appearance")}
                >
                  <Palette className="mr-2 h-4 w-4" />
                  Aparência
                </Button>
                <Button
                  variant={activeTab === "integrations" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("integrations")}
                >
                  <Link className="mr-2 h-4 w-4" />
                  Integrações
                </Button>
                <Button
                  variant={activeTab === "security" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("security")}
                >
                  <Lock className="mr-2 h-4 w-4" />
                  Segurança
                </Button>
              </div>
              <Separator />
              <div className="p-4">
                <Button
                  variant="outline"
                  className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sair
                </Button>
              </div>
            </nav>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardContent className="p-6">
            {activeTab === "profile" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold">Perfil</h2>
                  <p className="text-muted-foreground">Gerencie suas informações pessoais e profissionais</p>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome Completo</Label>
                      <Input 
                        id="name" 
                        value={profile.name}
                        onChange={(e) => setProfile({...profile, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={profile.email}
                        onChange={(e) => setProfile({...profile, email: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="specialty">Especialidade</Label>
                      <Input 
                        id="specialty" 
                        value={profile.specialty}
                        onChange={(e) => setProfile({...profile, specialty: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="license">CRM</Label>
                      <Input 
                        id="license" 
                        value={profile.license}
                        onChange={(e) => setProfile({...profile, license: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input 
                        id="phone" 
                        value={profile.phone}
                        onChange={(e) => setProfile({...profile, phone: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4 flex justify-end">
                    <Button onClick={saveProfile} className="bg-cardio-600 hover:bg-cardio-700">
                      <Save className="mr-2 h-4 w-4" />
                      Salvar Alterações
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === "notifications" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold">Notificações</h2>
                  <p className="text-muted-foreground">Gerencie como e quando recebe notificações</p>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Ativar Notificações</Label>
                      <p className="text-sm text-muted-foreground">Ative ou desative todas as notificações</p>
                    </div>
                    <Switch 
                      checked={notificationsEnabled} 
                      onCheckedChange={setNotificationsEnabled} 
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Canais de Notificação</h3>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Notificações por E-mail</Label>
                        <p className="text-sm text-muted-foreground">Receba alertas e resumos por e-mail</p>
                      </div>
                      <Switch 
                        checked={emailNotifications} 
                        onCheckedChange={setEmailNotifications}
                        disabled={!notificationsEnabled} 
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Notificações por SMS</Label>
                        <p className="text-sm text-muted-foreground">Receba alertas importantes por SMS</p>
                      </div>
                      <Switch 
                        checked={smsNotifications} 
                        onCheckedChange={setSmsNotifications}
                        disabled={!notificationsEnabled} 
                      />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Tipos de Notificação</h3>
                    
                    {[
                      { 
                        title: "Consultas", 
                        description: "Notificações sobre agendamentos, confirmações e cancelamentos", 
                        checked: true 
                      },
                      { 
                        title: "Resultados de Exames", 
                        description: "Alertas quando novos resultados estiverem disponíveis", 
                        checked: true 
                      },
                      { 
                        title: "Lembretes", 
                        description: "Lembretes para consultas e tarefas pendentes", 
                        checked: true 
                      },
                      { 
                        title: "Atualizações do Sistema", 
                        description: "Notificações sobre novos recursos e atualizações", 
                        checked: false 
                      },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>{item.title}</Label>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                        <Switch defaultChecked={item.checked} disabled={!notificationsEnabled} />
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-4 flex justify-end">
                    <Button onClick={saveSettings} className="bg-cardio-600 hover:bg-cardio-700">
                      <Save className="mr-2 h-4 w-4" />
                      Salvar Preferências
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === "appearance" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold">Aparência</h2>
                  <p className="text-muted-foreground">Personalize a aparência e o tema do sistema</p>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Tema</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div 
                        className={`border rounded-lg p-4 cursor-pointer hover:border-cardio-500 flex flex-col items-center ${theme === 'light' ? 'border-cardio-500 bg-cardio-50' : ''}`}
                        onClick={() => setTheme('light')}
                      >
                        <Sun className="h-10 w-10 text-cardio-500 mb-2" />
                        <span>Claro</span>
                        {theme === 'light' && <CheckCircle className="h-4 w-4 text-cardio-500 mt-2" />}
                      </div>
                      <div 
                        className={`border rounded-lg p-4 cursor-pointer hover:border-cardio-500 flex flex-col items-center ${theme === 'dark' ? 'border-cardio-500 bg-cardio-50' : ''}`}
                        onClick={() => setTheme('dark')}
                      >
                        <Moon className="h-10 w-10 text-cardio-500 mb-2" />
                        <span>Escuro</span>
                        {theme === 'dark' && <CheckCircle className="h-4 w-4 text-cardio-500 mt-2" />}
                      </div>
                      <div 
                        className={`border rounded-lg p-4 cursor-pointer hover:border-cardio-500 flex flex-col items-center ${theme === 'system' ? 'border-cardio-500 bg-cardio-50' : ''}`}
                        onClick={() => setTheme('system')}
                      >
                        <Laptop className="h-10 w-10 text-cardio-500 mb-2" />
                        <span>Sistema</span>
                        {theme === 'system' && <CheckCircle className="h-4 w-4 text-cardio-500 mt-2" />}
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Idioma</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <Select value={language} onValueChange={setLanguage}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o idioma" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                          <SelectItem value="en-US">English (US)</SelectItem>
                          <SelectItem value="es">Español</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="pt-4 flex justify-end">
                    <Button onClick={saveSettings} className="bg-cardio-600 hover:bg-cardio-700">
                      <Save className="mr-2 h-4 w-4" />
                      Salvar Preferências
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === "integrations" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold">Integrações</h2>
                  <p className="text-muted-foreground">Conecte o sistema a outros serviços e aplicativos</p>
                </div>
                
                <div className="space-y-4">
                  {integrations.map((integration) => (
                    <Card key={integration.id} className="overflow-hidden border">
                      <div className="p-6 flex items-center justify-between">
                        <div className="flex items-start gap-4">
                          <div className="rounded-md bg-muted p-2 w-10 h-10 flex items-center justify-center text-cardio-600">
                            {integration.icon}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{integration.name}</h3>
                              {integration.status === "connected" ? (
                                <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200 flex items-center gap-1">
                                  <BadgeCheck className="h-3 w-3" /> Conectado
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="bg-gray-50 text-gray-700 hover:bg-gray-50 border-gray-200 flex items-center gap-1">
                                  <AlertCircle className="h-3 w-3" /> Não conectado
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{integration.description}</p>
                          </div>
                        </div>
                        <Button 
                          onClick={() => handleIntegrationAction(integration)}
                          variant={integration.status === "connected" ? "outline" : "default"}
                        >
                          {integration.buttonText}
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>

                <div className="mt-8 border rounded-lg p-4 bg-muted/10">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Configurações avançadas de integração</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Configure webhooks, adicione chaves de API personalizadas e gerencie permissões.
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Configurações avançadas
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === "security" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold">Segurança</h2>
                  <p className="text-muted-foreground">Gerencie suas credenciais e configurações de segurança</p>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Alterar Senha</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Senha Atual</Label>
                        <Input id="current-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">Nova Senha</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Segurança da Conta</h3>
                    
                    <div className="rounded-md border p-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <h4 className="font-medium">Autenticação de Dois Fatores</h4>
                          <p className="text-sm text-muted-foreground">
                            Adicione uma camada extra de segurança com autenticação de dois fatores
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Configurar
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="rounded-md border p-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <h4 className="font-medium">Dispositivos Conectados</h4>
                          <p className="text-sm text-muted-foreground">
                            Gerencie dispositivos que estão conectados à sua conta
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Gerenciar
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="rounded-md border p-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <h4 className="font-medium">Log de Atividades</h4>
                          <p className="text-sm text-muted-foreground">
                            Visualize o histórico de atividades recentes da sua conta
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Visualizar
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 flex justify-end">
                    <Button onClick={saveSettings} className="bg-cardio-600 hover:bg-cardio-700">
                      <Save className="mr-2 h-4 w-4" />
                      Salvar Alterações
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog open={configDialogOpen} onOpenChange={setConfigDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Configurar {selectedIntegration?.name}</DialogTitle>
            <DialogDescription>
              Configure os parâmetros de integração para {selectedIntegration?.name}.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {selectedIntegration?.id === "lab" && (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="lab-name" className="text-right">
                    Laboratório
                  </Label>
                  <Select defaultValue="dasa">
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Selecione um laboratório" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dasa">Dasa</SelectItem>
                      <SelectItem value="fleury">Fleury</SelectItem>
                      <SelectItem value="db">DB Diagnósticos</SelectItem>
                      <SelectItem value="custom">Personalizado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="api-key" className="text-right">
                    Chave API
                  </Label>
                  <Input
                    id="api-key"
                    type="password"
                    className="col-span-3"
                    defaultValue="••••••••••••••••"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="receive-method" className="text-right">
                    Recebimento
                  </Label>
                  <Select defaultValue="push">
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Método de recebimento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="push">Notificação Push</SelectItem>
                      <SelectItem value="email">E-mail</SelectItem>
                      <SelectItem value="pull">Consulta Periódica</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">
                    Notificações
                  </Label>
                  <div className="flex items-center space-x-2 col-span-3">
                    <Switch id="auto-notify" defaultChecked />
                    <Label htmlFor="auto-notify" className="font-normal">Notificar automaticamente novos resultados</Label>
                  </div>
                </div>
              </>
            )}

            {selectedIntegration?.id === "portal" && (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="portal-url" className="text-right">
                    URL do Portal
                  </Label>
                  <Input
                    id="portal-url"
                    className="col-span-3"
                    defaultValue="https://pacientes.smartcardio.com.br"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Status</Label>
                  <div className="col-span-3">
                    <Select defaultValue="disabled">
                      <SelectTrigger>
                        <SelectValue placeholder="Status do portal" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="enabled">Ativado</SelectItem>
                        <SelectItem value="disabled">Desativado</SelectItem>
                        <SelectItem value="maintenance">Manutenção</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label className="text-right pt-2">Permissões</Label>
                  <div className="space-y-2 col-span-3">
                    <div className="flex items-center space-x-2">
                      <Switch id="view-results" defaultChecked />
                      <Label htmlFor="view-results" className="font-normal">Ver resultados de exames</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="schedule" defaultChecked />
                      <Label htmlFor="schedule" className="font-normal">Agendar consultas</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="cancel" defaultChecked />
                      <Label htmlFor="cancel" className="font-normal">Cancelar consultas</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="chat" />
                      <Label htmlFor="chat" className="font-normal">Chat com a equipe médica</Label>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfigDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleConnectIntegration}>
              Salvar configurações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Conectar a {selectedIntegration?.name}</AlertDialogTitle>
            <AlertDialogDescription>
              Você será redirecionado para autorizar a conexão com {selectedIntegration?.name}.
              Esse processo requer que você forneça credenciais de acesso.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction>Continuar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
