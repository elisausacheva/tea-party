import React from "react";

import { useState } from "react";
import { useEffect } from "react";
import PostForm from "../../widgets/PostForm/PostForm";
// import PostCard from "../../widgets/PostCard/Postcard";
import { TeaApi } from "../../entities/tea/TeaApi";
import WorldMap from "../../components/WorldMap/WorldMap";
import "./PostPage.css";
import { Container, Row } from "react-bootstrap";
import TeaCard from "../../widgets/Tea/TeaCard/TeaCard";

export default function PostPage({ user }) {
  const [teas, setTeas] = useState([]);

  const [errorMessage, setErrorMessage] = useState("");

  // console.log('))))))))))))))))(((((((((((((((', posts);

  const loadPostFromServer = async () => {
    try {
      const { statusCode, error, data } = await TeaApi.getAll();

      if (error) {
        setErrorMessage(error);
      }

      if (statusCode === 200) {
        setTeas(data);
      }
    } catch (error) {
      setErrorMessage(error.message, "POSTPAGE");
    }
  };

  useEffect(() => {
    loadPostFromServer();
  }, []);

  return (

    <Container className="py-5">
      <WorldMap teas={teas} />
      <br />
      <PostForm 
        user={user} 
        onCreate={(newTea) => setTeas((prev) => [newTea, ...prev])} 
      />
      <br />
  { 
        <Row>
          {teas.length > 0 ? (
            teas.map((tea) => (
              <TeaCard key={tea.id} tea={tea} />
            ))
          ) : (
            <div className="text-center text-muted py-5">
                <h4>Коллекция пока пуста 🍃</h4>
            </div>
          )}
        </Row>
      }
    </Container>
    // <div>
    //   <PostForm
    //     userId={user?.id}
    //     onCreate={(newPost) => setPosts([...posts, newPost])}
    //   />
    //   <WorldMap teas={posts} />
    //   {posts.map((el) => {
    //     return (
    //       <PostCard
    //         key={el.id}
    //         el={el}
    //         user={user}
    //         posts={posts}
    //         onUpdate={(post) =>
    //           setPosts([...posts.filter((el) => el.id !== post.id), post])
    //         }
    //         onCreate={(newPost) => setPosts([...posts, newPost])}
    //         onDelete={(id) => setPosts(posts.filter((el) => el.id !== id))}
    //       />
    //     );
    //   })}
    // </div>
  );
}
