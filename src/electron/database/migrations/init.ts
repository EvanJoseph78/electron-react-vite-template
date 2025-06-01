const schema = `
-- Tabela cliente
CREATE TABLE IF NOT EXISTS cliente (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    data_cadastro DATE NOT NULL DEFAULT (DATE('now')),
    nome TEXT NOT NULL,
    telefone TEXT,
    endereco TEXT,
    numero TEXT,
    email TEXT,
    bairro TEXT,
    cidade TEXT,
    estado TEXT,
    cpf TEXT,
    cnpj TEXT
);

-- Tabela fornecedor
CREATE TABLE IF NOT EXISTS fornecedor (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    endereco TEXT,
    telefone TEXT,
    email TEXT,
    cnpj TEXT
);

-- Tabela grupo_de_item
CREATE TABLE IF NOT EXISTS grupo_de_item (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL
);

-- Tabela produto
CREATE TABLE IF NOT EXISTS produto (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    descricao_item TEXT NOT NULL,
    categoria_id INTEGER,
    preco_compra REAL,
    preco_venda REAL,
    cod_barras TEXT,
    unidade TEXT,
    FOREIGN KEY (categoria_id) REFERENCES grupo_de_item(id)
);

-- Tabela lote
CREATE TABLE IF NOT EXISTS lote (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    produto_id INTEGER NOT NULL,
    fornecedor_id INTEGER,
    data_fabricacao DATE,
    data_validade DATE,
    quantidade_inicial INTEGER NOT NULL,
    quantidade_atual INTEGER NOT NULL,
    FOREIGN KEY (produto_id) REFERENCES produto(id),
    FOREIGN KEY (fornecedor_id) REFERENCES fornecedor(id)
);

-- Tabela estoque
CREATE TABLE IF NOT EXISTS estoque (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    endereco TEXT,
    descricao TEXT
);

-- Tabela estoque_lote
CREATE TABLE IF NOT EXISTS estoque_lote (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    estoque_id INTEGER NOT NULL,
    lote_id INTEGER NOT NULL,
    quantidade INTEGER NOT NULL,
    FOREIGN KEY (estoque_id) REFERENCES estoque(id),
    FOREIGN KEY (lote_id) REFERENCES lote(id)
);

-- Tabela movimentacao_estoque
CREATE TABLE IF NOT EXISTS movimentacao_estoque (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    data DATE NOT NULL,
    tipo TEXT NOT NULL CHECK(tipo IN ('entrada', 'saida', 'transferencia')),
    origem_estoque_id INTEGER,
    destino_estoque_id INTEGER,
    observacoes TEXT,
    FOREIGN KEY (origem_estoque_id) REFERENCES estoque(id),
    FOREIGN KEY (destino_estoque_id) REFERENCES estoque(id)
);

-- Tabela itens_movimentacao_estoque
CREATE TABLE IF NOT EXISTS itens_movimentacao_estoque (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    movimentacao_id INTEGER NOT NULL,
    lote_id INTEGER NOT NULL,
    quantidade INTEGER NOT NULL,
    FOREIGN KEY (movimentacao_id) REFERENCES movimentacao_estoque(id),
    FOREIGN KEY (lote_id) REFERENCES lote(id)
);

-- Tabela forma_pagamento
CREATE TABLE IF NOT EXISTS forma_pagamento (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    descricao TEXT NOT NULL
);

-- Tabela vendas
CREATE TABLE IF NOT EXISTS vendas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cliente_id INTEGER,
    data DATE NOT NULL,
    total REAL NOT NULL,
    forma_pagamento_id INTEGER NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES cliente(id),
    FOREIGN KEY (forma_pagamento_id) REFERENCES forma_pagamento(id)
);

-- Tabela itens_venda
CREATE TABLE IF NOT EXISTS itens_venda (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    venda_id INTEGER NOT NULL,
    lote_id INTEGER NOT NULL,
    produto_id INTEGER NOT NULL,
    quantidade INTEGER NOT NULL,
    preco_unitario REAL NOT NULL,
    subtotal REAL NOT NULL,
    FOREIGN KEY (venda_id) REFERENCES vendas(id),
    FOREIGN KEY (lote_id) REFERENCES lote(id),
    FOREIGN KEY (produto_id) REFERENCES produto(id)
);
`;

export default schema;
