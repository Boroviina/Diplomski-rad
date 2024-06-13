import {Token} from '../services/api-clients/interfaces/login-response.interface';

export interface AuthModel {
    access: Token,
    refresh?: Token
}
