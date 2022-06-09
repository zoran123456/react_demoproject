import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../components/loadingSpinner/loadingSpinner";
import { apiGetPostDetail } from "../services/postService";
import GridComments from "./../components/dataGrid/gridComments/gridComments";
import { logComponentInitialization } from "./../utils/logComponentEvents";
import "./postDetail.css";

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

      setPost(post);
    };

    fetchData().catch((error) => handleError(error));
  }, [id]);

  useEffect(() => {
    logComponentInitialization(initializationPrefix, "PostDetail");
  }, [initializationPrefix]);

  useEffect(() => {}, [post]);

  const gotoHome = () => {
    navigate("/posts");
  };

  const getRenderBody = () => {
    if (!post) return <LoadingSpinner {...props} />;
    else
      return (
        <>
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">{post?.title}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                By {post?.userInfo?.name}
              </h6>
              <p className="card-text">
                <strong>Username</strong> {post?.userInfo?.username}
                <br />
                <strong>E-mail</strong> {post?.userInfo?.email}
                <br />
              </p>
              <p className="card-text post-body">{post?.body}</p>
            </div>
          </div>
          <GridComments
            {...props}
            key="id"
            primary="email"
            secondary="name"
            showExpandLink={false}
            items={post?.comments}
          />
        </>
      );
  };

  return (
    <>
      <h3>Posts Detail</h3>
      <div className="mb-5">{getRenderBody()}</div>
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
