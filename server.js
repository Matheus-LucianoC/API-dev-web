import express from 'express';
const app = express();
const port = 3000;

app.use(express.json());

let carros = [
  { id:1, marca: 'Ford', nome: 'Fusion', modelo: '2010', preco: 120000 },
  { id:2, marca: 'Chevrolet', nome: 'Camaro', modelo: '2007', preco: 300000 },
  { id:3, marca: 'BYD', nome: 'Dolphin', modelo: '2024', preco: 200000 },
  { id:4, marca: 'Chevrolet', nome: 'Onix', modelo: '2030', preco: 80000 },
  { id:5, marca: 'Renault', nome: 'Sandero', modelo: '2015', preco: 60000 },
  { id:6, marca: 'Toyota', nome: 'Supra', modelo: '2004', preco: 50000 },
  { id:7, marca: 'Toyota', nome: 'Miata', modelo: '1990', preco: 350000 }
];


app.listen(port, () => {
  console.log(`Servidor em execução!: http://localhost:${port}`)
});


app.get('/carros_id/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const carro = carros.find(i => i.id === id);
  if (carro) {
    res.json(carro);
  } else {
    res.status(404).json({ error: 'Carro não encontrado.' });
  }
});

app.get('/carros/precomaiorque/:mQpreco', (req, res) => {
  const mQpreco = parseInt(req.params.mQpreco);
  let carrosfiltrados = []
  for(let i = 0; i < carros.length; i++){
    if(carros[i].preco > mQpreco){
        carrosfiltrados.push(carros[i]);
    }
  }

  if(carrosfiltrados.length > 0){
    res.json(carrosfiltrados);
  } else {
    res.status(404).json({ error: 'Nenhum carro encontrado.' });
  }

});

app.get('/carros', (req,res) => {
  res.json({ total: carros.length, carros });
});

app.get('/carros_primeiro', (req, res) => {  
  if (carros.length === 0) {
    return res.status(404).json({ error: 'Nenhum carro cadastrado.' });
  }
  res.json(carros[0]);
});

app.get('/carros_ultimo', (req, res) => {  
  if (carros.length === 0) {
    return res.status(404).json({ error: 'Nenhum carro cadastrado.' });
  }
  res.json(carros[carros.length - 1]);
});

app.get('/carros_media', (req, res) => {  
  const media = 0
  for(let i = 0; i < carros.length; i++){
  media = media + carros.preco
  }
  mediafinal = media / carros.length
  res.json('Média dos preços: ' + mediafinal);
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


app.put('/carros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { marca, nome, modelo, preco } = req.body;
  const carro = carros.find(i => i.id === id);
  if (carro) {
    carro.marca = marca;
    carro.nome = nome;
    carro.modelo = modelo;
    carro.preco = preco;
    res.json(carro);
  } else {
    res.status(404).json({ error: 'Carro não encontrado.' });
  }
});


app.delete('/carros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = carros.findIndex(i => i.id === id);
  if (index !== -1) {
    const carroDeletado = carros.splice(index, 1);
    res.json(carroDeletado[0]);
  } else {
    res.status(404).json({ error: 'Carro não encontrado.' });
  }
});
