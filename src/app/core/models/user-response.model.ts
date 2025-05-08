import { ResponseModel } from './response.model';
import { User } from './user';

export interface UserResponseModel extends ResponseModel {
  data: User[];
}
