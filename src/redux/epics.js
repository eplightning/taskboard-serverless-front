import { Observable } from 'rxjs';

const testEpic = (action$, store) => action$.do((horyshit) => console.log(horyshit))
  .filter(() => false);

export const epics = [
  testEpic
];
