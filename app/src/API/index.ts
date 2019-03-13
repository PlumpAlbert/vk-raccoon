import * as getProfileInfo from "./account/getProfileInfo.type";

const apiUrl = "https://api.vk.com/method/";

function createMethod<R, F>(name: string) {
  return async (token: string, fields?: F): Promise<R> => {
    let query = `?v=5.92&access_token=${token}`;
    if (fields) {
      let i = 0;
      for (let prop in fields) {
        query += i === 0 ? `${prop}=${fields[prop]}` : `&${prop}=${fields[prop]}`;
        i++;
      }
    }
    try {
      let response = await fetch(apiUrl + name + query + "");
      return (await response.json()).response as R;
    } catch (e) {
      console.error(e);
      return {} as R;
    }
  };
}

export default {
  account: {
    getProfileInfo: createMethod<getProfileInfo.Response, never>("account.getProfileInfo")
  }
};
