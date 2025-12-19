import React from "react";

import { useState } from "react";
import { useEffect } from "react";
import PostForm from "../../widgets/PostForm/PostForm";
import PostCard from "../../widgets/PostCard/Postcard";
import { TeaApi } from "../../entities/post/TeaApi";
import WorldMap from "../../components/WorldMap/WorldMap";
import "./PostPage.css";

export default function PostPage({ user }) {
  const [posts, setPosts] = useState([]);

  const [errorMessage, setErrorMessage] = useState("");

  // console.log('))))))))))))))))(((((((((((((((', posts);

  const loadPostFromServer = async () => {
    try {
      const { statusCode, error, data } = await TeaApi.getAll();

      if (error) {
        setErrorMessage(error);
      }

      if (statusCode === 200) {
        setPosts(data);
      }
    } catch (error) {
      setErrorMessage(error.message, "POSTPAGE");
    }
  };

  useEffect(() => {
    loadPostFromServer();
  }, []);

  return (
    <div>
      <PostForm
        userId={user?.id}
        onCreate={(newPost) => setPosts([...posts, newPost])}
      />
      <WorldMap teas={posts} />
      {posts.map((el) => {
        return (
          <PostCard
            key={el.id}
            el={el}
            user={user}
            posts={posts}
            onUpdate={(post) =>
              setPosts([...posts.filter((el) => el.id !== post.id), post])
            }
            onCreate={(newPost) => setPosts([...posts, newPost])}
            onDelete={(id) => setPosts(posts.filter((el) => el.id !== id))}
          />
        );
      })}
    </div>
  );
}
