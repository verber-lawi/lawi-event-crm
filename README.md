# Lawi Event CRM

CRM mobile para uso durante eventos. Desenvolvido para a equipe Lawi.

## Deploy na Vercel (5 minutos)

### Passo 1 — Subir o código

**Opção A (GitHub):**
1. Crie um repositório no GitHub
2. Suba esta pasta para o repositório
3. Vá em [vercel.com](https://vercel.com), faça login com GitHub
4. Clique "Import Project" e selecione o repositório

**Opção B (Vercel CLI):**
```bash
npm i -g vercel
cd lawi-event-crm
vercel
```

### Passo 2 — Criar o banco de dados (Vercel KV)

Isso é o que permite que todo o time compartilhe os dados em tempo real.

1. No dashboard da Vercel, entre no projeto
2. Vá em **Storage** (menu lateral)
3. Clique **Create Database** → selecione **KV (Redis)**
4. Dê um nome (ex: `lawi-crm-kv`)
5. Clique **Connect to Project**
6. Faça um novo deploy: vá em **Deployments** → **Redeploy**

Pronto. As variáveis de ambiente (`KV_REST_API_URL`, etc.) são configuradas automaticamente.

### Passo 3 — Usar

1. Acesse a URL do deploy no celular (ex: `lawi-event-crm.vercel.app`)
2. Digite seu nome na primeira vez
3. Compartilhe a URL com a equipe

---

## Como funciona

- **Lista de leads** com busca por nome/empresa/segmento
- **Filtros** por tier (1, 2, 3), status (pendente/feito) e serviço (LDFS, SL-IN, etc.)
- **Ficha do lead** com pitch sugerido, pergunta quebra-gelo e contexto
- **Registro rápido** de conversa: anotação + interesse (1-5) + próximo passo
- **Dados compartilhados** entre todo o time via Vercel KV

## Tiers

| Tier | Cor | Perfil |
|------|-----|--------|
| T1 | 🟢 Verde | Founders Web3 early/growth — alta chance de conversão |
| T2 | 🟠 Laranja | Soft Landing Inbound — empresas globais entrando no BR |
| T3 | 🔵 Azul | Ecossistema — parceiros, multiplicadores, networking |

## Serviços mapeados

| Sigla | Serviço |
|-------|---------|
| LDFS | Legal Department for Startups |
| SL-IN | Soft Landing Inbound (estrangeiros → Brasil) |
| SL-OUT | Incorporação Internacional (Brasil → exterior) |
| IP | Global IP Protection |
| W3 | Consultoria Web3 & Fintech |
| DH | Draper House Rio |

## Sem Vercel KV?

Se não quiser configurar o KV, o app funciona com localStorage (dados salvos no navegador de cada pessoa, sem compartilhamento entre o time).

## Desenvolvimento local

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

Para testar com KV local, crie um `.env.local` com as variáveis do `.env.example`.
