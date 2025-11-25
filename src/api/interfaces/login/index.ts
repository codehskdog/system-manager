import { request } from '@/api';
import type { ResultData, ResultList } from '@/types/api';

interface loginData {
  username: string;
  password: string;
}
interface LoginResponse {
  token: string;
  expiresIn: string;
  username?: string;
  name?: string;
}
export const login = (data: loginData) =>
  request.post<ResultData<LoginResponse>>('/user/login', {
    data,
  });

