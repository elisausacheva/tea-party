import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { UserApi } from '../../entities/user/UserApi'
import { useNavigate } from 'react-router'
export default function AlleTest() {

  const [users, setUsers] = useState([])
  const navigate = useNavigate()
  
  useEffect(() => {
    const allUsers = async () => {
        try {
          const data = await UserApi.getAll()
          setUsers(data.data);
        } catch (error) {
          console.log(error);
          
        }
    }
    allUsers()
  }, [])


  return (
    <>
      <button onClick={() => navigate(-1)}>Назад</button>
      <div>
        <h4>All Users Page</h4>
      </div>
      {users
        .filter((user) => user.id % 2 === 0)
        .map((user) => (
          <div key={user.id}>
            <p>{user.name}</p>
            <p>{user.email}</p>
          </div>
        ))}
    </>
  );
}
