import express from 'express'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'

const prisma = new PrismaClient()
const app = express()
app.use(express.json())
app.use(cors())

app.post('/usuarios', async (req, res) => {
  try {
    await prisma.user.create({
      data: {
        name : req.body.name,
        password : req.body.password,
        email : req.body.email
      }
    })
    res.status(201).send("post ok")
  } catch (error) {
    console.log(error)
    res.status(400).send("Seu email já está cadastrado")
  }
})


app.get('/usuarios', async (req, res) => {

  const users = await prisma.user.findMany()
  
  res.status(200).json(users)
})

app.put('/usuarios/:id', async (req, res) => {

  await prisma.user.update({
    where: {
      id: req.params.id
    },
    data: {
      name : req.body.name,
      password : req.body.password,
      email : req.body.email
    }
  })
  
  res.status(201).send("update ok")
})

app.delete('/usuarios/:id', async (req, res) => {

  await prisma.user.delete({
    where: {
      id: req.params.id
    }
  })
  
  res.status(200).send("dekete ok")
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000/usuarios')
})


// user = Teste password = Nww7zCgVTbMtkaHn