import { ApiCommentsUrl } from "./../constants/api";
import { makeHttpGetRequest } from "./baseService";

export async function apiGetComments() {
  const response = await makeHttpGetRequest(ApiCommentsUrl);

  return response.data;
}
