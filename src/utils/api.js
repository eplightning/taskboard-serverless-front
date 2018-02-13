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

  createAjaxObservable(options) {
    return Observable.ajax(options).map(r => r.response);
  }

  get(uri) {
    return this.createAjaxObservable(this.requestOptions('GET', uri));
  }

  delete(uri) {
    return this.createAjaxObservable(this.requestOptions('DELETE', uri));
  }

  post(uri, data) {
    return this.createAjaxObservable(this.requestOptions('POST', uri, data));
  }

  put(uri, data) {
    return this.createAjaxObservable(this.requestOptions('PUT', uri, data));
  }

}

const api = new TaskboardApi(apiBaseUrl);

export default api;
