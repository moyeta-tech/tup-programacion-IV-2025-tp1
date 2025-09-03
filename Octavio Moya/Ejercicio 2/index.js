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
    
    const suma = notas.reduce((acc, index) => acc + index, 0)
    const promedio = suma / notas.length
    promedio.toFixed(2)

    for(let i = 0; i<promedios.length; i++){
        if(promedios[i].nombre === nombre){
            return res.status(400).json({ error: 'El estudiante ya tiene un promedio registrado' })
        }
    }

    promedios.push({ nombre, promedio: promedio })


    res.json({ nombre: nombre, promedio: promedio })
})

app.get('/promedios', (req, res) => {

    const lista = promedios.map(estudiante => {
        return {
            nombre: estudiante.nombre,
            promedio: estudiante.promedio,
            condicion: condicionEstudiante(parseFloat(estudiante.promedio))
        }
    })

    res.json(lista)
})

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})