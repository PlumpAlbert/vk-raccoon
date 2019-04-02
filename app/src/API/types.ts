const apiUrl = "https://api.vk.com/method/";

export type TMainParams = {
  /** Токен доступа текущего пользователя */
  token: string;
};

export async function apiGet<IResponse>(name: string, token: string): Promise<IResponse>;
export async function apiGet<IResponse>(name: string, token: string, fields: any): Promise<IResponse>;
export async function apiGet<IResponse>(name: string, token: string, fields?: any) {
  let query = `?v=5.92&access_token=${token}`;
  if (fields) {
    for (let prop in fields) {
      query += `&${prop}=${fields[prop]}`;
    }
  }
  try {
    let response = await fetch(apiUrl + name + query);
    return (await response.json()).response as IResponse;
  } catch (e) {
    console.error(e);
    return {} as IResponse;
  }
}
