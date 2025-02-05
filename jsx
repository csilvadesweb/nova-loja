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
