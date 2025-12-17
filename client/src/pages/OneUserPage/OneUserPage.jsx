import React, { useEffect } from 'react'
import { UserApi } from '../../entities/user/UserApi'
import { useParams } from 'react-router'

export default function OneUserPage({user, setUser}) {


const {id} = useParams()
console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLL", id);
const getOneUsr = async(id) => {
   try {
       const data = await UserApi.getOne(id)
       
       
       if (data.statusCode === 200)
           setUser(user.id)
   } catch (error) {
    console.log(error);
    } 
}
    
    
    
  return (
      <div>123</div>
  )
}
