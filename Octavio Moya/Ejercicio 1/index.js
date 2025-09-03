import express from 'express'

const PORT = 3000

const arreglo = []

const app = express()

    const a = 10
    const b = 10
    let perimetro = 2 * (a + b)

    let superficie = a * b

    arreglo.push({ perimetro, superficie })

app.get('/calculos', (req, res) => {

    const tipo = a === b ? 'Cuadrado' : 'Rectángulo'

    const calculos = arreglo.map(v => {
        return `perimetro: ${v.perimetro}, superficie: ${v.superficie}`
    })

    res.json({ arreglo: calculos, figura: tipo })
})


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT || 3000}`)
})