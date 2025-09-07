import express from 'express'

const app = express()
const PORT = 3000

const promedios = []

app.use(express.json())

function condicionEstudiante(promedio){
        if(promedio >= 8) return 'Promocionado'
        if(promedio >= 6 && promedio < 8) return 'Aprobado'
         return 'Desaprobado'
    }

app.post('/promedios', (req, res) => {
    const { nombre, notas } = req.body
    if(!nombre || !notas) return res.status(400).json({ error: 'Nombre y notas son campos obligatorios' })
    
        // Con ayuda de reduce hacemos la suma de las notas y calculamos promedio
    const suma = notas.reduce((acc, index) => acc + index, 0)
    const promedio = suma / notas.length

    // Si ya se encuentra en el arreglo devuelve un error
    for(let promedio of promedios){
        if(promedio.nombre === nombre){
            return res.status(400).json({ error: 'El estudiante ya tiene un promedio registrado' })
        }
    }
    // Agregamos al arreglo
    promedios.push({ nombre, promedio: promedio }) 

    // Mostramos lo que creamos
    res.json({ nombre: nombre, promedio: promedio })
})

app.get('/promedios', (req, res) => {

    // creamos un objeto que devuelve el nombre, promedio y condicion del alumno
    const lista = promedios.map(estudiante => {
        return {
            nombre: estudiante.nombre,
            promedio: estudiante.promedio,
            // Llamamos a la funcion condicionEstudiante para saber su condición 
            condicion: condicionEstudiante(parseFloat(estudiante.promedio))
        }
    })
    // Mostramos a la hora de realizar la petición
    res.json(lista)
})

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})