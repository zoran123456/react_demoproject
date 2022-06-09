import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Pagination from "../dataGrid/pagination/pagination";
import { paginateData } from "./../../utils/paginateData";
import { AppContext, createAppContextValue } from "./../../store/appContext";
import _ from "lodash";
import GridComments from "../dataGrid/gridComments/gridComments";
import LoadingSpinner from "./../loadingSpinner/loadingSpinner";
import PostsFilter from "../postsFilter/postsFilter";
import { logComponentInitialization } from "./../../utils/logComponentEvents";

function PostsCollection(props) {
  const { posts, initializationPrefix } = props;

  const { appContextValue, setAppContextValue } = useContext(AppContext);

  const rowsPerPage = appContextValue.dataGridRowsPerPage;

  const [filteredItems, setFilteredItems] = useState(posts);

  const [paginationPage, setPaginationPage] = useState(
    appContextValue.paginateCurrentPage
  );

  const [rowsFilter, setRowsFilter] = useState(
    appContextValue.dataGridRowsRowsFilter
  );

  const handlePaginationPageChanged = (pageNum) => {
    setPaginationPage(pageNum);
  };

  useEffect(() => {
    setAppContextValue(
      createAppContextValue(paginationPage, rowsPerPage, rowsFilter)
    );
  }, [paginationPage, rowsFilter, rowsPerPage, setAppContextValue]);

  useEffect(() => {
    if (!rowsFilter || /^\s*$/.test(rowsFilter)) setFilteredItems(posts);
    else {
      var filtered = _(posts)
        .filter((item) =>
          item.title.toLowerCase().includes(rowsFilter.toLowerCase())
        )
        .value();

      setFilteredItems(filtered);
      setPaginationPage(1);
    }
  }, [rowsFilter, posts]);

  useEffect(() => {
    setFilteredItems(posts);
  }, [posts]);

  useEffect(() => {
    logComponentInitialization(initializationPrefix, "PostsCollection");

    if (!rowsFilter || /^\s*$/.test(rowsFilter)) setFilteredItems(posts);
    else {
      var filtered = _(posts)
        .filter((item) =>
          item.title.toLowerCase().includes(rowsFilter.toLowerCase())
        )
        .value();

      setFilteredItems(filtered);
    }
  }, [initializationPrefix, posts, rowsFilter]);

  const getRenderControl = () => {
    if (!posts || posts.length === 0) return <LoadingSpinner {...props} />;
    else
      return (
        <>
          <PostsFilter
            {...props}
            value={rowsFilter}
            onChange={(value) => setRowsFilter(value)}
          />

          <table className="table table-striped table-sm">
            <thead>
              <tr>
                <th>Id</th>
                <th>User Id</th>
                <th>Title</th>
                <th>Username</th>
                <th>Email</th>
                <th># of Comments</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {paginateData(filteredItems, paginationPage, rowsPerPage).map(
                (item) => (
                  <tr key={item.id}>
                    <th>
                      <Link to={`/post/${item.id}`}>{item.id}</Link>
                    </th>
                    <td>{item.userId}</td>
                    <td>{item.title}</td>
                    <td>{item.username}</td>
                    <td>{item.userEmail}</td>
                    <td>{item.commentCount}</td>
                    <td>
                      <GridComments
                        {...props}
                        items={item.comments}
                        primary="email"
                        secondary="name"
                      />
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>

          <Pagination
            {...props}
            dataCount={filteredItems.length}
            rowsPerPage={rowsPerPage}
            currentPage={paginationPage}
            pageChanged={handlePaginationPageChanged}
          />
        </>
      );
  };

  return (
    <>
      <p>
        <strong>Posts Collection</strong>
      </p>
      {getRenderControl()}
    </>
  );
}

PostsCollection.propTypes = {
  posts: PropTypes.array,
  initializationPrefix: PropTypes.string,
};

export default PostsCollection;
