import { Observable } from 'rxjs';

const apiBaseUrl = process.env.REACT_APP_API_URL + '/';

class TaskboardApi {

  baseUrl = '';
  token = '';

  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  updateStore(store) {
    store.subscribe(() => this.token = store.getState().user.idToken);
  }

  requestOptions(method, uri, body) {
    const headers = {
      Authorization: 'Bearer ' + this.token
    };

    if (body != null) {
      headers['Content-Type'] = body != null ? 'application/json' : undefined;
    }

    return {
      method: method,
      url: this.baseUrl + uri,
      crossDomain: true,
      headers: headers,
      body: body
    };
  }

  get(uri) {
    return Observable
      .ajax(this.requestOptions('GET', uri))
      .map(a => a.response);
  }

  delete(uri) {
    return Observable
      .ajax(this.requestOptions('DELETE', uri))
      .map(a => a.response);
  }

  post(uri, data) {
    return Observable
      .ajax(this.requestOptions('POST', uri, data))
      .map(a => a.response);
  }

  put(uri, data) {
    return Observable
      .ajax(this.requestOptions('PUT', uri, data))
      .map(a => a.response);
  }

}

export const api = new TaskboardApi(apiBaseUrl);
