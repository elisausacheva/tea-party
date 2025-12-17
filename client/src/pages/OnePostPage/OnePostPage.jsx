import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { PostApi } from '../../entities/post/PostApi'


export default function OnePostPage() {
const navigate = useNavigate()
    const [post, setPost] = useState({})
    console.log('__________----', post);
    
    const { id } = useParams()
    

    useEffect(() => {
        const getOnePost = async () => {
            try {
                const data = await PostApi.getPostById(id)
                setPost(data.data)
            } catch (error) {
                console.log(error);
                
            }
        }
        getOnePost();
    },[id])

    return (
      <>
        <button onClick={() => navigate(-1)}>Назад</button>
        <h2>OnePostPage</h2>
        <div> Фото: {post.img}</div>
        <div> Название: {post.title}</div>
        <div> Текст: {post.desc}</div>
        <div> Нравиться: {post.like}</div>
      </>
    );
}
