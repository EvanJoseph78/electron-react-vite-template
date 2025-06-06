Perfeito! Aqui está o modelo de banco de dados completo em Markdown, incluindo controle de estoque, movimentações e formas de pagamento.

---

# 🗄️ **Modelagem de Banco de Dados — Sistema de PDV com Estoque e Lotes**

## 🧑‍💼 **Tabela: cliente**

| Campo          | Tipo       | Descrição                |
| -------------- | ---------- | ------------------------ |
| id             | INTEGER PK | Identificador do cliente |
| data\_cadastro | DATE       | Data de cadastro         |
| nome           | TEXT       | Nome completo            |
| endereco       | TEXT       | Endereço                 |
| numero         | TEXT       | Número do endereço       |
| bairro         | TEXT       | Bairro                   |
| cidade         | TEXT       | Cidade                   |
| estado         | TEXT       | Estado (UF)              |
| cpf            | TEXT       | CPF (pode ser nulo)      |
| cnpj           | TEXT       | CNPJ (pode ser nulo)     |

---

## 🏢 **Tabela: fornecedor**

| Campo    | Tipo       | Descrição                     |
| -------- | ---------- | ----------------------------- |
| id       | INTEGER PK | Identificador do fornecedor   |
| nome     | TEXT       | Nome completo ou razão social |
| endereco | TEXT       | Endereço                      |
| telefone | TEXT       | Telefone                      |
| email    | TEXT       | E-mail (opcional)             |
| cnpj     | TEXT       | CNPJ                          |

---

## 🗂️ **Tabela: grupo\_de\_item**

| Campo | Tipo       | Descrição                  |
| ----- | ---------- | -------------------------- |
| id    | INTEGER PK | Identificador do grupo     |
| nome  | TEXT       | Nome do grupo ou categoria |

---

## 📦 **Tabela: produto**

| Campo           | Tipo       | Descrição                        |
| --------------- | ---------- | -------------------------------- |
| id              | INTEGER PK | Identificador do produto         |
| descricao\_item | TEXT       | Descrição do produto             |
| categoria\_id   | INTEGER FK | Referência ao grupo\_de\_item    |
| preco\_compra   | REAL       | Preço de compra                  |
| preco\_venda    | REAL       | Preço de venda                   |
| cod\_barras     | TEXT       | Código de barras                 |
| unidade         | TEXT       | Unidade de medida (kg, un, etc.) |

---

## 🔢 **Tabela: lote**

| Campo               | Tipo       | Descrição                     |
| ------------------- | ---------- | ----------------------------- |
| id                  | INTEGER PK | Identificador do lote         |
| produto\_id         | INTEGER FK | Referência ao produto         |
| fornecedor\_id      | INTEGER FK | Referência ao fornecedor      |
| data\_fabricacao    | DATE       | Data de fabricação            |
| data\_validade      | DATE       | Data de validade              |
| quantidade\_inicial | INTEGER    | Quantidade inicial desse lote |
| quantidade\_atual   | INTEGER    | Quantidade restante no lote   |

---

## 🏢 **Tabela: estoque**

| Campo     | Tipo       | Descrição                          |
| --------- | ---------- | ---------------------------------- |
| id        | INTEGER PK | Identificador do estoque (armazém) |
| nome      | TEXT       | Nome do estoque                    |
| endereco  | TEXT       | Endereço ou localização (opcional) |
| descricao | TEXT       | Observações (opcional)             |

---

## 📦 **Tabela: estoque\_lote**

| Campo       | Tipo       | Descrição                              |
| ----------- | ---------- | -------------------------------------- |
| id          | INTEGER PK | Identificador                          |
| estoque\_id | INTEGER FK | Referência ao estoque                  |
| lote\_id    | INTEGER FK | Referência ao lote                     |
| quantidade  | INTEGER    | Quantidade atual desse lote no estoque |

---

## 🔄 **Tabela: movimentacao\_estoque**

| Campo                | Tipo       | Descrição                               |
| -------------------- | ---------- | --------------------------------------- |
| id                   | INTEGER PK | Identificador da movimentação           |
| data                 | DATE       | Data da movimentação                    |
| tipo                 | TEXT       | 'entrada', 'saida' ou 'transferencia'   |
| origem\_estoque\_id  | INTEGER FK | Estoque de origem (nulo se for entrada) |
| destino\_estoque\_id | INTEGER FK | Estoque de destino (nulo se for saída)  |
| observacoes          | TEXT       | Observações adicionais                  |

---

## 📦 **Tabela: itens\_movimentacao\_estoque**

| Campo            | Tipo       | Descrição                 |
| ---------------- | ---------- | ------------------------- |
| id               | INTEGER PK | Identificador             |
| movimentacao\_id | INTEGER FK | Referência à movimentação |
| lote\_id         | INTEGER FK | Lote movimentado          |
| quantidade       | INTEGER    | Quantidade movimentada    |

---

## 🧾 **Tabela: vendas**

| Campo                | Tipo       | Descrição                        |
| -------------------- | ---------- | -------------------------------- |
| id                   | INTEGER PK | Identificador da venda           |
| cliente\_id          | INTEGER FK | Referência ao cliente (opcional) |
| data                 | DATE       | Data da venda                    |
| total                | REAL       | Valor total da venda             |
| forma\_pagamento\_id | INTEGER FK | Forma de pagamento               |

---

## 🛒 **Tabela: itens\_venda**

| Campo           | Tipo       | Descrição                      |
| --------------- | ---------- | ------------------------------ |
| id              | INTEGER PK | Identificador do item da venda |
| venda\_id       | INTEGER FK | Referência à venda             |
| lote\_id        | INTEGER FK | Lote do produto vendido        |
| produto\_id     | INTEGER FK | Produto vendido                |
| quantidade      | INTEGER    | Quantidade vendida             |
| preco\_unitario | REAL       | Preço unitário na venda        |
| subtotal        | REAL       | Subtotal (quantidade \* preço) |

---

## 💳 **Tabela: forma\_pagamento**

| Campo     | Tipo       | Descrição                               |
| --------- | ---------- | --------------------------------------- |
| id        | INTEGER PK | Identificador da forma de pagamento     |
| descricao | TEXT       | Descrição (dinheiro, cartão, pix, etc.) |

---

# 🔗 **Observações gerais:**

* O estoque é controlado por lote e por localização (estoque físico).
* As vendas são feitas a partir dos lotes, respeitando o controle de validade e rastreabilidade.
* As movimentações permitem entrada, saída e transferência entre estoques.
* A forma de pagamento está associada diretamente à venda.

---

Se desejar, posso gerar esse modelo como diagrama (ERD), ou criar os comandos SQL (`CREATE TABLE`) para SQLite.
Quer que eu gere? 😊













Evandro José da Silva Mariano



