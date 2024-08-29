import * as jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_EXPIRES_IN } from 'src/config/constants';
/**
 * hasura jwt response
 *
 * @param role string
 * @param id string
 * @returns
 */

type HasuraJwtResponse =
  | {
      'all-roles': string;
      'x-hasura-default-role': string;
      'x-hasura-allowed-roles': string;
      'x-hasura-user-id': string;
    }
  | any;
export function hasuraJwt(role: string, id: string) {
  const hasura: HasuraJwtResponse = {};
  hasura['all-roles'] = [role];
  hasura['x-hasura-default-role'] = role;
  hasura['x-hasura-allowed-roles'] = [role];
  hasura['x-hasura-user-id'] = `${id}`;
  const token = jwt.sign(
    { 'https://hasura.io/jwt/claims': hasura, user_id: id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: ACCESS_TOKEN_EXPIRES_IN },
  );
  return token;
}
