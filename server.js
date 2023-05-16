const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
let notas = [
  {
    nota: "Estudiar Ingles",
    id: 1,
  },
  {
    nota: "Lavar la ropa",
    id: 2,
  },
  {
    nota: "Comprar agua",
    id: 3,
  },
];

let nextId = 4;

app.use(express.json());


// ruta para llamar a las notas

app.get("/notas", (request, response) => {
  response.json(notas);
});


// ruta para postear
app.post("/api/notes", (request, response) => {
  const { nota } = request.body;

  if (!nota) {
    return response
      .status(400)
      .json({ error: "La propiedad 'nota' es requerida" });
  }

  const note = {
    nota,
    id: nextId++,
  };

  notas.push(note);
  response.json(note);
});

// ruta para eliminar
app.delete("/notas/:id", (request, response) => {
  const id = parseInt(request.params.id);
  notas = notas.filter((nota) => nota.id !== id);
  response.status(204).end(); 
 
})



const PORT = 3001;
app.listen(PORT, () => {
  console.log(`El servidor ha iniciado en el puerto ${PORT}`);
});
