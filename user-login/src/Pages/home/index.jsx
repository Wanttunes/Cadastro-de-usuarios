import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState, useRef } from 'react'
import api from '../../services/api'


function Home() {

  const [users, setUsers] = useState([])

  const inputName = useRef()
  const inputEmail = useRef()
  const inputPassword = useRef()



  async function getUsers() {
      const response = await api.get('/usuarios')
      setUsers(response.data)
  }

  async function createUsers() {
    const name = inputName.current.value
    const email = inputEmail.current.value
    const password = inputPassword.current.value

    const response = await api.post('/usuarios', {
      name,
      email,
      password
    })

    setUsers([...users,
      {
        id: response.data.id,
        name,
        email,
        password
      }
    ])
}

async function deleteUsers(id) {
  await api.delete(`/usuarios/${id}`)
  getUsers()
}

  useEffect(() => {
    getUsers()
  }
  , [])

  return (
      <div className='container'>
        <form action="Get">
          <h1>Cadastro de Usuários</h1>
          <input placeholder='Nome' type="text" name='name' ref={inputName}/>
          <input placeholder='Email' type="email" name='email' ref={inputEmail}/>
          <input placeholder='Senha' type="password" name='password' ref={inputPassword}/>
          <button type='button' onClick={createUsers}>Cadastrar</button>
        </form>
        {users.map(user => {
          return (
            <div className='container-users' key={user.id}>
              <div className='container-info'>
                <p>Nome: <span>{user.name}</span></p>
                <p>Email: <span>{user.email}</span></p>
                <p>Senha: <span>{user.password}</span></p>
              </div>
              <div className='container-buttons'>
                <button type='button' onClick={() => deleteUsers(user.id)}>
                  <FontAwesomeIcon icon={faXmark} size="xl" style={{color: "#e00000"}} />
                </button>
              </div>
            </div>
          )
        })}
      </div>
      
  )
}

export default Home
