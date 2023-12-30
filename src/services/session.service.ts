import config from "config";
import axios from "axios";
import qs from "qs";
import { User } from "../models/user.model";
import sessionModel from "../models/session.model";
import { findUser } from "./user.service";

// local sessions
export const createSession = async (input: Partial<User>) => {
  const user = await findUser({ email: input.email });
  const session = await sessionModel.create({ user: user });
  await session.populate("user");
  return session.toJSON();
};

export const invalidateAllUserSessions = async (input: Partial<User>) => {
  const user = await findUser(input);
  await sessionModel.updateMany({ user: user?.id }, { valid: false });
};

export const findValidSessionsByUserId = async (id: string) => {
  const user = await findUser({ _id: id });
  const sessions = await sessionModel
    .find({ user: user?.id, valid: true })
    .populate("user")
    .lean();
  return sessions;
};

// google auth
interface GoogleOauthToken {
  access_token: string;
  id_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
  scope: string;
}

export const getGoogleOauthToken = async ({
  code,
}: {
  code: string;
}): Promise<GoogleOauthToken> => {
  const rootURl = "https://oauth2.googleapis.com/token";

  const options = {
    code,
    client_id: config.get<string>("googleClientId"),
    client_secret: config.get<string>("googleClientSecret"),
    redirect_uri: config.get<string>("googleOauthRedirect"),
    grant_type: "authorization_code",
  };
  try {
    const { data } = await axios.post<GoogleOauthToken>(
      rootURl,
      qs.stringify(options),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return data;
  } catch (err: any) {
    console.log("Failed to fetch Google Oauth Tokens");
    throw new Error(err);
  }
};

interface GoogleUserResult {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}

export async function getGoogleUser({
  id_token,
  access_token,
}: {
  id_token: string;
  access_token: string;
}): Promise<GoogleUserResult> {
  try {
    const { data } = await axios.get<GoogleUserResult>(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${id_token}`,
        },
      }
    );

    return data;
  } catch (err: any) {
    console.log(err);
    throw Error(err);
  }
}
