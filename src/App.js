import "./App.css";
import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import PostDetail from "./components/postDetail/postDetail";
import { AppContext, createAppContextValue } from "./store/appContext";
import { apiGetPostsComments } from "./services/postService";
import PostsCollection from "./pages/postCollection";

function App() {
  const handleError = (error) => {
    console.error("API ERROR", error);
  };

  const logComponentInitializatorPrefix = "Component Created: ";

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
    <div className="App">
      <main>
        <AppContext.Provider value={{ appContextValue, setAppContextValue }}>
          <Routes>
            <Route
              path="/posts"
              element={
                <PostsCollection
                  initializationPrefix={logComponentInitializatorPrefix}
                  posts={items}
                />
              }
            />
            <Route
              path="/post/:id"
              element={
                <PostDetail
                  initializationPrefix={logComponentInitializatorPrefix}
                />
              }
            />
            <Route path="/" element={<Navigate to="/posts" />} />
            <Route path="*" element={<h2>ĐE BI TI??!</h2>} />
          </Routes>
        </AppContext.Provider>
      </main>
    </div>
  );
}

export default App;
