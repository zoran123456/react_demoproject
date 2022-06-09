import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiGetPostDetail } from "../../services/postService";
import LoadingSpinner from "../loadingSpinner/loadingSpinner";
import PropTypes from "prop-types";
import { logComponentInitialization } from "./../../utils/logComponentEvents";

function PostDetail(props) {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const { initializationPrefix } = props;

  const navigate = useNavigate();

  const handleError = (error) => {
    console.error("API ERROR", error);
  };

  useEffect(() => {
    const fetchData = async () => {
      const post = await apiGetPostDetail(id);

      console.log("post", post);

      setPost(post);
    };

    fetchData().catch((error) => handleError(error));
  }, [id]);

  useEffect(() => {
    logComponentInitialization(initializationPrefix, "PostDetail");
  }, []);

  useEffect(() => {}, [post]);

  const gotoHome = () => {
    navigate("/posts");
  };

  const getRenderBody = () => {
    if (!post) return <LoadingSpinner {...props} />;
    else
      return (
        <>
          <strong>Id</strong> {post?.id}
          <br />
          <strong>User Id</strong> {post?.userId}
          <br />
          <strong>User Email</strong> {post?.userInfo?.email}
          <br />
          <strong>User Name</strong> {post?.userInfo?.name}
          <br />
          <strong>Title</strong> {post?.title}
          <br />
          <div style={{ whiteSpace: "pre-wrap" }}>{post?.body}</div>
          <hr />
        </>
      );
  };

  return (
    <>
      <p>This are post detail</p>
      <div className="mb-2">{getRenderBody()}</div>
      <button type="button" className="btn btn-primary" onClick={gotoHome}>
        Go Back
      </button>
    </>
  );
}

PostDetail.propTypes = {
  initializationPrefix: PropTypes.string,
};

export default PostDetail;
