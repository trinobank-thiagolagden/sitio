# API de Controle de Custos - Fazenda/Pessoal

API RESTful para controle de despesas e receitas, voltada para uso pessoal ou gestão de fazendas.

## Tecnologias

- **Runtime:** Deno
- **Framework:** Oak
- **Validação:** Zod
- **Banco de dados:** MongoDB
- **Formato:** JSON

## Estrutura do Projeto

```
sitio/
├── src/
│   ├── config/
│   │   ├── database.ts       # Configuração do MongoDB
│   │   └── env.ts            # Variáveis de ambiente
│   ├── controllers/
│   │   ├── categoria.controller.ts
│   │   ├── transacao.controller.ts
│   │   └── relatorio.controller.ts
│   ├── models/
│   │   ├── categoria.model.ts
│   │   └── transacao.model.ts
│   ├── schemas/
│   │   ├── categoria.schema.ts
│   │   ├── transacao.schema.ts
│   │   └── relatorio.schema.ts
│   ├── routes/
│   │   └── index.ts
│   └── main.ts               # Entry point
├── openapi.yaml              # Especificação OpenAPI
├── deno.json                 # Configuração do Deno
├── .env.example              # Exemplo de variáveis de ambiente
└── README.md
```

## Requisitos

- [Deno](https://deno.land/) v1.37 ou superior
- MongoDB v4.4 ou superior

## Configuração

1. Clone o repositório:
```bash
git clone <repository-url>
cd sitio
```

2. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

Edite o arquivo `.env`:
```env
PORT=8000
MONGODB_URI=mongodb://localhost:27017
DB_NAME=controle_custos
```

3. Certifique-se de que o MongoDB está rodando:
```bash
# Com Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Ou inicie o serviço local
mongod
```

## Executar

### Desenvolvimento (com auto-reload):
```bash
deno task dev
```

### Produção:
```bash
deno task start
```

O servidor estará disponível em `http://localhost:8000`

## Endpoints da API

### Categorias

- `GET /v1/categorias` - Lista todas as categorias
- `GET /v1/categorias/:id` - Busca categoria por ID
- `POST /v1/categorias` - Cria nova categoria
- `PUT /v1/categorias/:id` - Atualiza categoria
- `DELETE /v1/categorias/:id` - Remove categoria

### Transações

- `GET /v1/transacoes` - Lista transações (com filtros opcionais)
- `GET /v1/transacoes/:id` - Busca transação por ID
- `POST /v1/transacoes` - Cria nova transação
- `PUT /v1/transacoes/:id` - Atualiza transação
- `DELETE /v1/transacoes/:id` - Remove transação

#### Filtros disponíveis (query params):
- `tipo` - `despesa` ou `receita`
- `categoriaId` - ID da categoria
- `dataInicio` - Data inicial (YYYY-MM-DD)
- `dataFim` - Data final (YYYY-MM-DD)

### Relatórios

- `GET /v1/relatorios/saldo` - Retorna saldo consolidado no período
  - Parâmetros obrigatórios: `dataInicio`, `dataFim`

## Exemplos de Uso

### Criar uma categoria:
```bash
curl -X POST http://localhost:8000/v1/categorias \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Ração",
    "tipo": "despesa"
  }'
```

### Criar uma transação:
```bash
curl -X POST http://localhost:8000/v1/transacoes \
  -H "Content-Type: application/json" \
  -d '{
    "descricao": "Venda de leite",
    "tipo": "receita",
    "valor": 2500.00,
    "data": "2025-10-15"
  }'
```

### Listar transações filtradas:
```bash
curl "http://localhost:8000/v1/transacoes?tipo=despesa&dataInicio=2025-10-01&dataFim=2025-10-31"
```

### Obter relatório de saldo:
```bash
curl "http://localhost:8000/v1/relatorios/saldo?dataInicio=2025-10-01&dataFim=2025-10-31"
```

## Modelo de Dados

### Categoria
```typescript
{
  _id: string,
  nome: string,
  tipo: "despesa" | "receita",
  criadaEm: Date
}
```

### Transação
```typescript
{
  _id: string,
  descricao: string,
  tipo: "despesa" | "receita",
  categoriaId?: string,
  valor: number,
  data: Date,
  criadaEm: Date
}
```

## Documentação da API

A especificação completa da API está disponível no arquivo `openapi.yaml`.

## Boas Práticas Implementadas

1. **Validação de dados** com Zod em todos os endpoints
2. **Tratamento de erros** centralizado
3. **Índices MongoDB** recomendados:
   - `transacoes.data` (para relatórios)
   - `transacoes.tipo` (para filtros)
   - `transacoes.categoriaId` (para filtros)

4. **Agregação MongoDB** para cálculo de saldo otimizado

## Extensões Futuras

- Autenticação JWT
- Suporte a múltiplas fazendas/propriedades
- Relatórios detalhados por categoria
- Export de relatórios (PDF, CSV)
- Dashboard web

## Licença

MIT
