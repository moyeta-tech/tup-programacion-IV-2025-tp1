import express from 'express';

const app = express();
const PORT = 3000;

let tareas = [];

app.use(express.json());


app.post('/tareas', (req, res) => {
    const { nombre, estado } = req.body;
    if (!nombre || !estado) {
        return res.status(400).json({ error: 'El nombre y el estado de la tarea son obligatorios' });
    }

    for(let tarea of tareas){
        if(tarea.nombre === nombre) return res.status(400).json({ error: 'La tarea ya se encuentra en la lista' })
    }

    const nuevaTarea = { id: tareas.length + 1, nombre: nombre, estado: estado };
    tareas.push(nuevaTarea)
    res.json(nuevaTarea);
})

app.get('/tareas', (req, res) => {
    res.json(tareas);
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});