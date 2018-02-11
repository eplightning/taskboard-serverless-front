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

  get(uri) {
    return Observable
      .ajax({
        method: 'GET',
        url: this.baseUrl + uri,
        crossDomain: true,
        headers: {
          Authorization: 'Bearer ' + this.token
        }
      })
      .map(a => a.response);
  }

}

export const api = new TaskboardApi(apiBaseUrl);
