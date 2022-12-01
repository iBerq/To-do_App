import { API_ENDPOINTS, API_BASE_URL } from "../common/constants/apiConstants";
import HttpUtil from "../common/utils/httpUtil";
import { getAuthToken } from "../common/utils/authUtil";

class AuthApi {
  baseURL;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  login({ username, password }) {
    const request = {
      url: API_ENDPOINTS.LOGIN,
      baseURL: this.baseURL,
      method: "POST",
      data: {
        username,
        password,
      },
    };
    return HttpUtil.makeRequest(request);
  }

  validateToken() {
    const request = {
      url: API_ENDPOINTS.VALIDATE_TOKEN,
      baseURL: this.baseURL,
      method: "POST",
      headers: {
        Authorization: getAuthToken(),
      },
    };
    return HttpUtil.makeRequest(request);
  }
}

export const authApi = new AuthApi();
