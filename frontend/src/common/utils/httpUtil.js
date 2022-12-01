import axios from "axios";
import { API_BASE_URL } from "../constants/apiConstants";

import { getAuthToken } from "./authUtil";

class HttpUtil {
  axios;

  constructor() {
    const baseURL = API_BASE_URL;

    this.axios = axios.create({
      baseURL,
    });
  }

  makeRequest(request) {
    this.axios.defaults.headers.common["authorization"] = getAuthToken();
    return this.axios(request);
  }
}

export default new HttpUtil();
