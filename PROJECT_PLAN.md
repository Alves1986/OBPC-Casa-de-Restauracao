
# Plano de Projeto: Hub Digital OBPC Casa de Restauração (Next.js 15 Edition)

## 1. Estrutura de Diretórios (Feature-Based)
O projeto agora segue a convenção de "App Router" do Next.js 15:

```text
/app
  /(auth)         # Rotas autenticadas (área do membro)
  /(public)       # Landing page e funil de visita
  /api            # Webhooks e integrações externas
/components
  /ui             # Shadcn/Primitives (Acessíveis)
  /shared         # Componentes transversais
  /events         # Módulo complexo de agenda
/lib
  /prisma.ts      # Singleton do cliente de DB
  /utils.ts       # Helpers de Tailwind e Datas
/services
  /occurrence.ts  # Motor de sincronização RRULE
/styles           # Configurações globais de design
```

## 2. Estratégia de Sincronização de Eventos
Para garantir que um idoso num 4G instável veja a agenda instantaneamente:

1.  **Materialização:** Sempre que um `Event` ou `EventException` é salvo via Server Action, disparar o `OccurrenceManager`.
2.  **Janela de Tempo:** O sistema calcula e popula a tabela `EventOccurrence` para os próximos 12 meses.
3.  **Query Simples:** O frontend nunca calcula RRULE. Ele faz: `SELECT * FROM EventOccurrence WHERE occurrenceDate BETWEEN x AND y`.

## 3. Diretrizes de UX (Android Mid-Range)
- **Zero CLS (Cumulative Layout Shift):** Reservar espaços de imagens e cards.
- **Toque Amigável:** Botões com altura mínima de 48px.
- **Contraste:** Razão mínima de 4.5:1 em todos os textos informativos.
