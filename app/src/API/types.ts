const apiUrl = "https://api.vk.com/method/";

export type TMainParams = {
  /** Токен доступа текущего пользователя */
  token: string;
};

interface IError {
  /** Код ошибки */
  error_code: number;
  /** Сообщение об ошибке */
  error_msg: string;
  /** Параметры запроса, которые привели к возникновению ошибки */
  request_params: Array<{ key: string, value: string }>
}

export class FetchError implements IError {
  error_code: number;
  error_msg: string;
  request_params: Array<{ key: string, value: string }>;

  constructor(obj: IError) {
    this.error_code = obj.error_code;
    this.error_msg = obj.error_msg;
    this.request_params = obj.request_params;
  }
}

export async function apiGet<IResponse>(name: string, token: string): Promise<IResponse>;
export async function apiGet<IResponse>(name: string, token: string, fields: any): Promise<IResponse>;
export async function apiGet<IResponse>(name: string, token: string, fields?: any) {
  let query = `?v=5.92&access_token=${token}&test_mode=1`;
  if (fields) {
    for (let prop in fields) {
      query += `&${prop}=${fields[prop]}`;
    }
  }
  try {
    let response = await fetch(apiUrl + name + query);
    let json = await response.json();
    if (json.error) return new FetchError(json.error);
    return json.response as IResponse;
  } catch (e) {
    console.error('Error while fetching request:', e);
    return new FetchError({error_code: -1, error_msg: 'Fetching failed', request_params: []});
  }
}
