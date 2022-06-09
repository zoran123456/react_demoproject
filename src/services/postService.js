import { makeHttpGetRequest } from "./baseService";
import { ApiPostsUrl } from "./../constants/api";
import { apiGetUsers } from "./usersService";
import { apiGetComments } from "./commentsService";

//#region private functions
function _getCommentsForPost(postId, comments) {
  const result = comments.filter((comment) => comment.postId === postId);

  return result;
}

function _getUserForId(id, users) {
  const user = users.find((user) => user.id === id);

  return user;
}
//#endregion

export async function apiGetPosts() {
  const response = await makeHttpGetRequest(ApiPostsUrl);

  return response.data;
}

export async function apiGetPostDetail(postId) {
  const [postDetailObj, users, comments] = await Promise.all([
    makeHttpGetRequest(`${ApiPostsUrl}/${postId}`),
    apiGetUsers(),
    apiGetComments(),
  ]);

  const postDetail = postDetailObj.data;

  const postComments = _getCommentsForPost(parseInt(postId), comments);
  const userInfo = _getUserForId(parseInt(postDetail.userId), users);

  const combined = {
    ...postDetail,
    comments: postComments,
    userInfo: userInfo,
  };

  return combined;
}

export async function apiGetPostsComments() {
  const [posts, users, comments] = await Promise.all([
    apiGetPosts(),
    apiGetUsers(),
    apiGetComments(),
  ]);

  const itemsCombined = [];
  for (let post of posts) {
    const userInfo = _getUserForId(parseInt(post.userId), users);
    const postComments = _getCommentsForPost(parseInt(post.id), comments);

    itemsCombined.push({
      ...post,
      username: userInfo?.username,
      userEmail: userInfo?.email,
      comments: postComments,
      commentCount: postComments.length,
    });
  }

  return itemsCombined;
}
