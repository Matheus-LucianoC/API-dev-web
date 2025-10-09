import express from 'express';
const app = express();
const port = 3000;

app.use(express.json());

let carros = [
    { id:1, marca: 'Ford', nome: 'Fusion', modelo: '2010',preco: 120000},
    { id:2, marca: 'Chevrolet', nome: 'Camaro', modelo: '2007',preco: 300000},
    { id:3, marca: 'byd', nome: 'dolphin', modelo: '2024',preco: 200000},
    { id:4, marca: 'Chevrolet', nome: 'Onix', modelo: '2030',preco: 80000},
    { id:5, marca: 'Renault', nome: 'Sandero', modelo: '2015',preco: 60000},
    { id:6, marca: 'Toyota', nome: 'Supra', modelo: '2004',preco: 50000},
    { id:7, marca: 'Toyota', nome: 'Miata', modelo: '1990',preco: 350000}
];



app.listen(port, () => {
    console.log(`Servidor em execução!: http://localhost:${port}`)
})

app.get('/carros/:id', (req,res) =>{
    const id = parseInt(req.params.id);
    const carro = carros.find(i => i.id == id);
    if (carro){
        res.json(carro);
    }else{
        res.status(404).json({error: 'carro não encontrado.'});
    }
})

app.post('/car', (req, res) => {
    const { marca, nome, modelo, preco } = req.body;

    const novocarro = {
        id: carros.length + 1,
        marca,
        nome,
        modelo,
        preco: parseInt(preco) 
    };
    carros.push(novocarro);
    res.status(201).json(novocarro);
});

app.put('/carros/:id', (req,res) =>{
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
        res.status(404).json({ error: 'Pessoa não encontrada.'});
    }
});

app.delete('/carros/:id', (req,res) =>{
    const id = parseInt(req.params.id);
    const index = carros.findIndex(id => i.id === id);
    if (index !== -1) {
        const carrodeletado = carros.splice(index,1);
        res.json(carrodeletado[0]);
    }else{
        res.status(404).json({ error: 'Pessoa não encontrada.'});
    }
})