import React, { useState } from 'react'
import { PostApi } from '../../entities/post/PostApi';
import { useEffect } from 'react';

export default function MyPost({ user }) {
  const [posts, setPosts] = useState([])
    
    const allPostUser = async () => {
      try {
        const { data } = await PostApi.getAll()
        setPosts(data)
      } catch (error) {
        console.log(error);
        
      }
    }

  useEffect(() => {
    allPostUser()
  },[])
  
  const userPost = posts.filter((el) => el.authorId === user.id)

  return (
    <>
      {userPost.map((post) => (
        <>
          <div key={post.id}>
            <p>{post.title}</p>
            <p>
              {post.img && (
                <img src={post.img} alt="post" style={{ maxWidth: 200 }} />
              )}
            </p>
            <p>{post.desc}</p>
            <p>{new Date(post.createdAt).toLocaleString()}</p>
          </div>
        </>
      ))}
    </>
  );
}
