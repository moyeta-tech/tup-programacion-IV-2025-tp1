import express from 'express'

const PORT = 3000

const arreglo = []

const app = express()

function calcularPerimetro(a, b) {
    let perimetro = 2 * (a + b)
    arreglo.push(perimetro)
    return perimetro
}

function calcularSuperficie(a, b) {
    let superficie = a * b
    arreglo.push(superficie)
    return superficie
}

app.get('/calculos', (req, res) => {
    const a = 10
    const b = 10

    const perimetro = calcularPerimetro(a, b)
    const superficie = calcularSuperficie(a, b)

    const tipo = a === b ? 'Cuadrado' : 'Rectángulo'

    res.json({ perimetro, superficie, figura: tipo })
})


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT || 3000}`)
})