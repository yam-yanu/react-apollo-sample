import React, {useContext} from "react";
import { useForm } from "react-hook-form";
import {AuthContext} from "../../providers/AuthProvider";
import { useHistory } from "react-router-dom";

export const LoginPage: React.FC = () => {
  const {handleSubmit, register, errors} = useForm();
  const {login} = useContext(AuthContext);

  const history = useHistory();

  const onSubmit = async (values: any) => {
    await login(values.companyCode, values.loginId, values.password);
    history.push('/users');
  };

  return (
    <div id="login" className="bgtypeB w-320">
      <div className="block">
        <div className="logo">
          <span>運送システム</span>
          <p className="fontSize-30 txt-center mb-12">BookingBook</p>
        </div>
        <input
          data-test-id="login-text-company-code"
          name="companyCode"
          className="form-control mb-15"
          type="text"
          placeholder="企業コード"
          ref={register({ required: true })}
        />
        {errors.companyCode && <p>企業コードが未入力です</p>}
        <input
          data-test-id="login-text-login-id"
          name="loginId"
          className="form-control mb-15"
          type="text"
          placeholder="ログインID"
          ref={register({ required: true })}
        />
        {errors.loginId && <p>ログインIDが未入力です</p>}
        <input
          data-test-id="login-text-password"
          name="password"
          className="form-control mb-15"
          type="password"
          placeholder="パスワード"
          ref={register({ required: true })}
        />
        {errors.password && <p>パスワードが未入力です</p>}
        <div
          data-test-id="login-button-login"
          className="button is-primary"
          onClick={handleSubmit(onSubmit)}
        >
          ログイン
        </div>
      </div>
    </div>
  );
};
