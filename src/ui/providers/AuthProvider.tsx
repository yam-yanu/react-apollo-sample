import React, {useState} from "react";
import {gql, useMutation, ApolloError } from "@apollo/client";

const LOGIN_MUTATION = gql`
    mutation Login($companyCode: String!, $loginId: String!, $password: String!) {
        login(
            companyCode: $companyCode
            loginId: $loginId
            password: $password
        ) {
            access_token
            user {
                id
                user_name
            }
        }
    }
`;

type LoginResult = {
  login: AuthPayload
}

type AuthPayload = {
  access_token: string
  user: User
}

type User = {
  id: string
  user_name: string
}

interface Props {
  children: React.ReactNode;
}

interface LoginFunc {
  (companyCode: string, loginId: string, password: string): Promise<void>
}

interface AuthInfo {
  isAuthenticated: boolean
  token?: string
  user?: User
  login: LoginFunc
}

export const AuthContext = React.createContext<AuthInfo>({isAuthenticated: false, login: async () => {}});

interface AuthProviderState {
  user?: User
  isAuthenticated: boolean
}

export const AuthProvider: React.FC<Props> = ({children}) => {
  const [login] = useMutation<LoginResult>(LOGIN_MUTATION);
  const [state, setState] = useState<AuthProviderState>({
    isAuthenticated: false,
  });

  const handleLogin = async (companyCode: string, loginId: string, password: string) => {
    try {
      const {data} = await login({variables: {companyCode: companyCode, loginId: loginId, password: password}});
      // graphql provider伝えるためにいったんlocalstorageを使用
      // contextで伝えたほうが丁寧かもしれない
      localStorage.setItem('token', data?.login.access_token as string);
      setState({
        user: data?.login.user,
        isAuthenticated: true,
      });
    } catch (error) {
      if (error instanceof ApolloError) {
        // view側にlogin失敗を伝える(LoginResult的なclassを作って返却する?)
        // Authentication Errorのみcatchしたい(error no的なものをextraにつける?)
        console.log('loginに失敗しました.');
        return;
      }
      throw error;
    }
  }

  return (
    <AuthContext.Provider value={{user: state?.user, isAuthenticated: state.isAuthenticated, login: handleLogin}}>
      {children}
    </AuthContext.Provider>
  );
};
