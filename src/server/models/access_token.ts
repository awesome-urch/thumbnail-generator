import BaseModel from "./base";
import User from "./user";
import { knexDb } from "../../config/database";
import { OAuthObject } from "../common/types";

class AccessTokenModel extends BaseModel {
  constructor() {
    super("AccessToken", "access_tokens", [
      "id",
      "user_id",
      "client_id",
      "access_token",
      "access_token_expires_on",
      "refresh_token",
      "refresh_token_expires_on",
      "updated_at",
      "created_at"
    ]);
  }

  async getAccessToken(token) {
    return await this.findOne({access_token:token});
  }


}

class OauthClientModel extends BaseModel {
  constructor() {
    super("OauthClients", "oauth_clients", [
      "id",
      "client_id",
      "client_secret"
    ]);
  }

  async getClient(clientId, clientSecret){
    // const client = await this.findOne({client_id:clientId,client_secret:clientSecret});
    // return {
    //   clientId: client.client_id,
    //   clientSecret: client.client_secret,
    //   grants: ["password"], // the list of OAuth2 grant types that should be allowed
    // };

    const client = await knexDb("oauth_clients").select()
    .from("oauth_clients")
    //.where({ username })
    .timeout(this.timeout);

    // interface OAuthObject {
    //   client_id: string;
    //   client_secret: string;
    // }

    const oauthObject: OAuthObject = {
      client_id: "",
      client_secret: "",
    };

    if (client && client.length > 0) {
      Object.assign(oauthObject, client[0]);
    }

    return {
      clientId: oauthObject.client_id,
      clientSecret: oauthObject.client_secret,
      grants: ["password"], // the list of OAuth2 grant types that should be allowed
    };

  }

  async getUser(username, password){
    const user = await new User().verify(username, password);
    return user;
  }


}

export default AccessTokenModel;


// module.exports = {
// 	getAccessToken: new AccessTokenModel().getAccessToken,
// 	getClient: new OauthClientModel().getClient,
// 	saveToken: null,
// 	getUser: new OauthClientModel().getUser,
// 	// getUserFromClient: getUserFromClient,
// 	// getRefreshToken: getRefreshToken,
// 	// revokeToken: revokeToken
// };

