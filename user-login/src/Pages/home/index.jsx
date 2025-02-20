import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import api from '../../services/api'


function Home() {

  const [users, setUsers] = useState([])

  async function getUsers() {
      const response = await api.get('/usuarios')
      setUsers(response.data)
  }

  useEffect(() => {
    getUsers()
  }
  , [])

  return (
      <div className='container'>
        <form action="Get">
          <h1>Cadastro de Usuários</h1>
          <input placeholder='Nome' type="text" name='name'/>
          <input placeholder='Email' type="email" name='email'/>
          <input placeholder='Senha' type="password" name='password'/>
          <button type='button'>Cadastrar</button>
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
                <button>
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
