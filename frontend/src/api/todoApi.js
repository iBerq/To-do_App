import { API_ENDPOINTS, API_BASE_URL } from "../common/constants/apiConstants";
import HttpUtil from "../common/utils/httpUtil";
import { getAuthToken, getAuthUser } from "../common/utils/authUtil";

class TodoApi {
  baseURL;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  addTodo({ user_id, title, description, thumbnail, fileLabel, file }) {
    const request = {
      url: API_ENDPOINTS.TODO,
      baseURL: this.baseURL,
      method: "POST",
      headers: {
        Authorization: getAuthToken(),
      },
      data: {
        user_id,
        title,
        description,
        thumbnail,
        fileLabel,
        file,
      },
    };
    return HttpUtil.makeRequest(request);
  }

  getTodos(tag) {
    const user_id = JSON.parse(getAuthUser())._id;
    const request = {
      url: API_ENDPOINTS.TODO + `/${user_id}`,
      baseURL: this.baseURL,
      method: "POST",
      headers: {
        Authorization: getAuthToken(),
      },
      data: {
        tag: tag,
      },
    };
    return HttpUtil.makeRequest(request);
  }

  editTodo({ _id, title, description, tag, thumbnail, fileLabel, file }) {
    const request = {
      url: API_ENDPOINTS.TODO,
      baseURL: this.baseURL,
      method: "PUT",
      headers: {
        Authorization: getAuthToken(),
      },
      data: {
        _id,
        title,
        description,
        tag,
        thumbnail,
        fileLabel,
        file,
      },
    };
    return HttpUtil.makeRequest(request);
  }

  deleteTodo({ _id }) {
    const request = {
      url: API_ENDPOINTS.TODO,
      baseURL: this.baseURL,
      method: "DELETE",
      headers: {
        Authorization: getAuthToken(),
      },
      data: {
        _id,
      },
    };
    return HttpUtil.makeRequest(request);
  }

  searchTodos({ searchString, tag }) {
    const user_id = JSON.parse(getAuthUser())._id;
    const request = {
      url: API_ENDPOINTS.SEARCH + `/${user_id}`,
      baseURL: this.baseURL,
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      data: {
        searchString,
        tag,
      },
    };
    return HttpUtil.makeRequest(request);
  }
}

export const todoApi = new TodoApi();
