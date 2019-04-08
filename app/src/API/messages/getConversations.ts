import { IUser, IGroup, IConversation } from "../objects";
import { TMainParams, apiGet } from "../types";

interface IParams extends TMainParams {
  offset?: number;
  count?: number;
  filter?: 'all' | 'unread' | 'important' | 'unanswered';
  extended?: boolean;
  start_message_id?: number;
  fields?: Array<keyof IUser | keyof IGroup>,
  group_id?: number;
}

export interface IResponse {
  count: number;
  items: Array<{ conversation: IConversation, last_message: object }>,
  unread_count?: number;
  profiles: IUser[],
  groups: IGroup[]
}

export default (args: IParams) => {
  let request: any = args;
  if (args.fields)
    request.fields = args.fields.join(',');
  request.extended = args.extended ? '1' : '0';
  return apiGet<IResponse>("messages.getConversation", args.token, request);
}
