
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mercado Livre Simulado</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: Arial, sans-serif;
        }
        body {
            background-color: #f5f5f5;
        }
        header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #ffe600;
            padding: 10px 20px;
        }
        .logo {
            font-size: 1.5rem;
            font-weight: bold;
            color: #333;
        }
        .search-bar {
            display: flex;
            width: 60%;
        }
        .search-bar input {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-right: none;
            border-radius: 4px 0 0 4px;
        }
        .search-bar button {
            padding: 10px 20px;
            border: none;
            background-color: #3483fa;
            color: #fff;
            border-radius: 0 4px 4px 0;
            cursor: pointer;
        }
        nav {
            margin-top: 10px;
            padding: 10px 20px;
            background-color: #fff;
            display: flex;
            justify-content: space-around;
            border-bottom: 1px solid #ddd;
        }
        nav a {
            text-decoration: none;
            color: #333;
            font-weight: bold;
        }
        .categories {
            margin: 20px;
            display: flex;
            justify-content: space-around;
        }
        .categories div {
            background-color: #fff;
            padding: 15px;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            text-align: center;
            cursor: pointer;
            transition: transform 0.2s;
        }
        .categories div:hover {
            transform: scale(1.05);
        }
        .products {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin: 20px;
        }
        .product {
            background-color: #fff;
            padding: 15px;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            text-align: center;
            transition: transform 0.2s;
        }
        .product img {
            max-width: 100%;
            height: auto;
            margin-bottom: 10px;
        }
        .product h3 {
            font-size: 1rem;
            margin-bottom: 10px;
            color: #333;
        }
        .product p {
            font-size: 1rem;
            color: #3483fa;
            font-weight: bold;
        }
        .product button {
            margin-top: 10px;
            padding: 10px 15px;
            border: none;
            background-color: #3483fa;
            color: white;
            border-radius: 5px;
            cursor: pointer;
        }
        .product button:hover {
            background-color: #2968c8;
        }
        footer {
            background-color: #333;
            color: #fff;
            text-align: center;
            padding: 20px;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <header>
        <div class="logo">Mercado Livre</div>
        <div class="search-bar">
            <input type="text" placeholder="Buscar produtos, marcas e muito mais...">
            <button>Buscar</button>
        </div>
    </header>
    <nav>
        <a href="#">Ofertas do Dia</a>
        <a href="#">Categorias</a>
        <a href="#">Histórico</a>
        <a href="#">Supermercado</a>
