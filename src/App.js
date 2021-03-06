import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AppHeader from "./components/appHeader/appHeader";
import { ComponentInitializationPrefix } from "./constants/app";
import NotFound from "./pages/notFound";
import PostsCollection from "./pages/postCollection";
import PostDetail from "./pages/postDetail";
import { apiGetPostsComments } from "./services/postService";
import { AppContext, createAppContextValue } from "./store/appContext";

function App() {
  const handleError = (error) => {
    console.error("API ERROR", error);
  };

  const [items, setItems] = useState([]);

  const [appContextValue, setAppContextValue] = useState(
    // Current page, Rows per page, Row filter
    createAppContextValue(1, 20, "")
  );

  // Component initialization
  useEffect(() => {
    const fetchData = async () => {
      const itemsCombined = await apiGetPostsComments();

      setItems(itemsCombined);
    };

    fetchData().catch((error) => handleError(error));
  }, []);

  return (
    <div className="col-lg-8 mx-auto p-3 py-md-5">
      <AppHeader
        title="Demo Assignment"
        initializationPrefix={ComponentInitializationPrefix}
      />

      <main>
        <AppContext.Provider value={{ appContextValue, setAppContextValue }}>
          <Routes>
            <Route
              path="/posts"
              element={
                <PostsCollection
                  initializationPrefix={ComponentInitializationPrefix}
                  posts={items}
                />
              }
            />
            <Route
              path="/post/:id"
              element={
                <PostDetail
                  initializationPrefix={ComponentInitializationPrefix}
                />
              }
            />
            <Route path="/" element={<Navigate to="/posts" />} />
            <Route
              path="*"
              element={
                <NotFound
                  initializationPrefix={ComponentInitializationPrefix}
                />
              }
            />
          </Routes>
        </AppContext.Provider>
      </main>
      <footer className="pt-5 my-5 text-muted border-top">
        Demo asignment project by <strong>Zoran Bo??njak</strong> &middot; &copy;
        2022
      </footer>
    </div>
  );
}

export default App;
