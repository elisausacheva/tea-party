import { BrowserRouter, Routes, Route } from "react-router";
import { useEffect, useState } from "react";
import Layout from "./app/Layout/Layout";
import "./App.css";
import { UserApi } from "./entities/user/UserApi";
import SignUpForm from "./features/SignUpForm/SignUpForm";
import { setAccessToken } from "./shared/lib/axiosInstance";
import SignInForm from "./features/SignInForm/SignInForm";
// import PostPage from "./pages/PostPage/PostPage";
import AlleTest from "./pages/AllUsers/AlleTest";
import OnePostPage from "./pages/OnePostPage/OnePostPage";
import MyPost from "./pages/AllUsers/MyPost";
import OneTeaPage from "./pages/OneTeaPage/OneTeaPage";
import AllTeas from "./pages/AllTeas/AllTeas";

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    console.log("Зашли в useEffect");
    const getUser = async () => {
      try {
        const data = await UserApi.refresh();
        // console.log("refresh data:", data);
        if (data.statusCode === 200 && data.data.accessToken) {
          // ! ! ! ! ! !
          setUser((pre) => ({ ...pre, ...data.data.user }));
          setAccessToken(data.data.accessToken);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout user={user} setUser={setUser} />}>
          <Route path="/alletest" element={<AlleTest />} />
          {/* <Route
            path="/onetea/:id"
            element={<OneTeaPage setUser={setUser} />}
          /> */}
          <Route path="/teas" element={<AllTeas user={user} />} />
          <Route
            path="/onetea/:id"
            element={<OneTeaPage setUser={setUser} />}
          />
          <Route path="/register" element={<SignUpForm setUser={setUser} />} />
          <Route path="/login" element={<SignInForm setUser={setUser} />} />
          {/* <Route
            path="/posts"
            element={<PostPage user={user} setUser={setUser} />}
          /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
