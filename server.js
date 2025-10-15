import express from 'express';
const app = express();
const port = 3000;

app.use(express.json());


let carros = [
  { id: 1, marca: 'Ford', nome: 'Fusion', modelo: '2010', preco: 120000 },
  { id: 2, marca: 'Chevrolet', nome: 'Camaro', modelo: '2007', preco: 300000 },
  { id: 3, marca: 'BYD', nome: 'Dolphin', modelo: '2024', preco: 200000 },
  { id: 4, marca: 'Chevrolet', nome: 'Onix', modelo: '2030', preco: 80000 },
  { id: 5, marca: 'Renault', nome: 'Sandero', modelo: '2015', preco: 60000 },
  { id: 6, marca: 'Toyota', nome: 'Supra', modelo: '2004', preco: 50000 },
  { id: 7, marca: 'Toyota', nome: 'Miata', modelo: '1990', preco: 350000 }
];




app.get('/carros', (req, res) => {
  res.json({ total: carros.length, carros });
});


app.get('/carros/id/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const carro = carros.find(i => i.id === id);
  if (carro) {
    res.json(carro);
  } else {
    res.status(404).json({ error: 'Carro não encontrado.' });
  }
});


app.get('/carros/preco/maiorque/:valor', (req, res) => {
  const valor = parseInt(req.params.valor);
  let carrosFiltrados = [];

  for (let i = 0; i < carros.length; i++) {
    if (carros[i].preco > valor) {
      carrosFiltrados.push(carros[i]);
    }
  }

  if (carrosFiltrados.length > 0) {
    res.json(carrosFiltrados);
  } else {
    res.status(404).json({ error: 'Nenhum carro encontrado com preço maior que o informado.' });
  }
});


app.get('/carros/primeiro', (req, res) => {
  if (carros.length === 0) {
    return res.status(404).json({ error: 'Nenhum carro cadastrado.' });
  }
  res.json(carros[0]);
});


app.get('/carros/ultimo', (req, res) => {
  if (carros.length === 0) {
    return res.status(404).json({ error: 'Nenhum carro cadastrado.' });
  }
  res.json(carros[carros.length - 1]);
});


app.get('/carros/media', (req, res) => {
  if (carros.length === 0) {
    return res.status(404).json({ error: 'Nenhum carro cadastrado.' });
  }

  let soma = 0;
  for (let i = 0; i < carros.length; i++) {
    soma += carros[i].preco;
  }

  const mediaFinal = soma / carros.length;
  res.json({ media: mediaFinal });
});


app.post('/carros', (req, res) => {
  const { marca, nome, modelo, preco } = req.body;
  const novoCarro = {
    id: carros.length + 1,
    marca,
    nome,
    modelo,
    preco: parseInt(preco)
  };
  carros.push(novoCarro);
  res.status(201).json(novoCarro);
});

app.post('/carros/lote', (req, res) => {
  const novosCarros = req.body;

  if (!Array.isArray(novosCarros)) {
    return res.status(400).json({ error: 'Envie um array de carros.' });
  }

  novosCarros.forEach(carro => {
    if (carro.marca && carro.nome && carro.modelo && carro.preco) {
      carro.id = carros.length + 1;
      carro.preco = parseInt(carro.preco);
      carros.push(carro);
    }
  });

  res.status(201).json({
    mensagem: `${novosCarros.length} carro(s) adicionados com sucesso.`,
    carros
  });
});

app.put('/carros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { marca, nome, modelo, preco } = req.body;
  const carro = carros.find(i => i.id === id);

  if (carro) {
    carro.marca = marca;
    carro.nome = nome;
    carro.modelo = modelo;
    carro.preco = parseInt(preco);
    res.json(carro);
  } else {
    res.status(404).json({ error: 'Carro não encontrado.' });
  }
});


app.delete('/carros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = carros.findIndex(carro => carro.id === id); 

  if (index !== -1) {
    const carroDeletado = carros.splice(index, 1); 
    res.json(carroDeletado[0]); 
  } else {
    res.status(404).json({ error: 'Carro não encontrado.' });
  }
});

app.listen(port, () => {
  console.log(` Servidor em execução: http://localhost:${port}`);
});
