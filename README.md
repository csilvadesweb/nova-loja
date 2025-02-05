import React, { useState } from "react";

function LojaVirtual() {
  // Estado para simular produtos, carrinho e favoritos
  const [produtos] = useState([
    { id: 1, nome: "Camiseta Básica", preco: 49.9, imagem: "https://via.placeholder.com/150" },
    { id: 2, nome: "Calça Jeans", preco: 99.9, imagem: "https://via.placeholder.com/150" },
    { id: 3, nome: "Jaqueta de Couro", preco: 199.9, imagem: "https://via.placeholder.com/150" },
  ]);
  const [carrinho, setCarrinho] = useState([]);
  const [favoritos, setFavoritos] = useState([]);

  // Função para adicionar ao carrinho
  const adicionarAoCarrinho = (produto) => {
    setCarrinho([...carrinho, produto]);
  };

  // Função para adicionar aos favoritos
  const adicionarAosFavoritos = (produto) => {
    setFavoritos([...favoritos, produto]);
  };

  return (
    <div>
      {/* Cabeçalho */}
      <header className="bg-blue-700 text-white p-4">
        <h1 className="text-center text-2xl">Loja Virtual</h1>
      </header>

      {/* Landing Page */}
      <section className="p-4">
        <h2 className="text-xl font-bold">Bem-vindo à nossa loja!</h2>
        <p>Encontre as melhores roupas com os melhores preços.</p>
      </section>

      {/* Catálogo de Produtos */}
      <section className="p-4">
        <h2 className="text-xl font-bold">Produtos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {produtos.map((produto) => (
            <div key={produto.id} className="border p-4 rounded shadow">
              <img src={produto.imagem} alt={produto.nome} className="w-full h-32 object-cover mb-2" />
              <h3 className="text-lg font-bold">{produto.nome}</h3>
              <p className="text-gray-600">R$ {produto.preco.toFixed(2)}</p>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                onClick={() => adicionarAoCarrinho(produto)}
              >
                Adicionar ao Carrinho
              </button>
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded mt-2 ml-2"
                onClick={() => adicionarAosFavoritos(produto)}
              >
                Salvar
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Carrinho */}
      <section className="p-4 bg-gray-100">
        <h2 className="text-xl font-bold">Carrinho</h2>
        {carrinho.length > 0 ? (
          <ul>
            {carrinho.map((item, index) => (
              <li key={index} className="border-b py-2">
                {item.nome} - R$ {item.preco.toFixed(2)}
              </li>
            ))}
          </ul>
        ) : (
          <p>Seu carrinho está vazio.</p>
        )}
      </section>

      {/* Favoritos */}
      <section className="p-4 bg-gray-100">
        <h2 className="text-xl font-bold">Favoritos</h2>
        {favoritos.length > 0 ? (
          <ul>
            {favoritos.map((item, index) => (
              <li key={index} className="border-b py-2">
                {item.nome}
              </li>
            ))}
          </ul>
        ) : (
          <p>Você ainda não salvou nenhum produto.</p>
        )}
      </section>

      {/* Rodapé */}
      <footer className="bg-blue-700 text-white text-center p-4">
        <p>© 2025 Loja Virtual. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default LojaVirtual;
CREATE DATABASE loja_virtual;

USE loja_virtual;

-- Tabela de Usuários
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE
);

-- Tabela de Produtos
CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10, 2) NOT NULL,
    imagem VARCHAR(255),
    estoque INT DEFAULT 0
);

-- Tabela de Favoritos
CREATE TABLE favoritos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    id_produto INT,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
    FOREIGN KEY (id_produto) REFERENCES produtos(id)
);

-- Tabela de Carrinho
CREATE TABLE carrinho (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    id_produto INT,
    quantidade INT,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
    FOREIGN KEY (id_produto) REFERENCES produtos(id)
);

-- Tabela de Pedidos
CREATE TABLE pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    total DECIMAL(10, 2) NOT NULL,
    metodo_pagamento VARCHAR(50),
    status VARCHAR(50) DEFAULT 'Pendente',
    data_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mysql = require("mysql2");

// Configuração do servidor
const app = express();
app.use(cors());
app.use(express.json());

// Configuração do banco de dados
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "loja_virtual",
});

// Middleware de autenticação
const autenticar = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).send("Acesso negado!");
  jwt.verify(token, "chave_secreta", (err, decoded) => {
    if (err) return res.status(401).send("Token inválido!");
    req.usuario = decoded;
    next();
  });
};

// Rotas

// Registro de usuários
app.post("/registro", (req, res) => {
  const { nome, email, senha } = req.body;
  const senhaHash = bcrypt.hashSync(senha, 10);
  db.query(
    "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)",
    [nome, email, senhaHash],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send("Usuário registrado com sucesso!");
    }
  );
});

// Login de usuários
app.post("/login", (req, res) => {
  const { email, senha } = req.body;
  db.query(
    "SELECT * FROM usuarios WHERE email = ?",
    [email],
    (err, results) => {
      if (err) return res.status(500).send(err);
      if (results.length === 0) return res.status(404).send("Usuário não encontrado!");
      const usuario = results[0];
      if (!bcrypt.compareSync(senha, usuario.senha)) {
        return res.status(401).send("Senha incorreta!");
      }
      const token = jwt.sign({ id: usuario.id, is_admin: usuario.is_admin }, "chave_secreta", {
        expiresIn: "1h",
      });
      res.json({ token });
    }
  );
});

// Listagem de produtos
app.get("/produtos", (req, res) => {
  db.query("SELECT * FROM produtos", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Adicionar ao carrinho
app.post("/carrinho", autenticar, (req, res) => {
  const { id_produto, quantidade } = req.body;
  const id_usuario = req.usuario.id;
  db.query(
    "INSERT INTO carrinho (id_usuario, id_produto, quantidade) VALUES (?, ?, ?)",
    [id_usuario, id_produto, quantidade],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send("Produto adicionado ao carrinho!");
    }
  );
});

// Finalizar pedido
app.post("/pedidos", autenticar, (req, res) => {
  const { total, metodo_pagamento } = req.body;
  const id_usuario = req.usuario.id;
  db.query(
    "INSERT INTO pedidos (id_usuario, total, metodo_pagamento) VALUES (?, ?, ?)",
    [id_usuario, total, metodo_pagamento],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send("Pedido realizado com sucesso!");
    }
  );
});

// Iniciar servidor
app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001");
});
