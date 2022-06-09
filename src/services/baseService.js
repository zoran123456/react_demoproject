import axios from "axios";

export async function makeHttpGetRequest(url) {
  // TODO Configure Bearer Token authentication and other stuff, if needed

  return await axios.get(url);
}
