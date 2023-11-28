import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { app } from "firebaseApp";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function LoginForm() {
  const [error, setError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === "email") {
      setEmail(value);

      const validRegex =
        /[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]$/i;

      if (!value?.match(validRegex)) {
        setError("이메일 형식이 올바르지 않습니다.");
      } else {
        setError("");
      }
    }

    if (name === "password") {
      setPassword(value);

      const validRegex =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

      if (!value?.match(validRegex)) {
        setError(
          "비밀번호는 영문, 숫자, 특수문자를 모두 포함하고 8자리 이상이어야 합니다."
        );
      } else {
        setError("");
      }
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const auth = getAuth(app);

      await signInWithEmailAndPassword(auth, email, password).then((res) => {
        navigate("/");
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Form onSubmit={onSubmit}>
        <h1>로그인</h1>
        <FormBox>
          <FormLabel htmlFor="email">이메일</FormLabel>
          <FormTextInput
            type="text"
            name="email"
            id="email"
            value={email}
            required
            onChange={onChange}
          />
        </FormBox>
        <FormBox>
          <FormLabel htmlFor="password">비밀번호</FormLabel>
          <FormTextInput
            type="password"
            name="password"
            id="password"
            value={password}
            required
            onChange={onChange}
          />
        </FormBox>

        {error && error.length > 0 && <ErrorMassage>{error}</ErrorMassage>}

        <FormBox>
          <FormSubmitInput
            type="submit"
            value="로그인"
            disabled={error?.length > 0}
          />
        </FormBox>

        <FormBox>
          <p>계정이 없으신가요?</p>
          <Link to="/signup">회원가입</Link>
        </FormBox>
      </Form>
    </>
  );
}

const Form = styled.form`
  margin: 0 auto;
  max-width: 1024px;
  width: 100%;
  padding: 100px 12px 140px 12px;
`;

const FormBox = styled.div`
  margin-bottom: 20px;
  width: 100%;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 12px;
  font-size: 16px;
  font-weight: 700;
`;

const FormTextInput = styled.input`
  width: 100%;
  height: 20px;
  padding: 10px;
  font-size: 16px;
  border-radius: 0.3rem;
  border: 1px solid lightgray;
`;

const FormSubmitInput = styled.input`
  width: 100%;
  height: 48px;
  padding: 12px;
  border: 1px solid #dfdfdf;
  border-radius: 0.3rem;
  background-color: #ffffff;
  cursor: pointer;
`;

const FormTextarea = styled.textarea`
  min-height: 400px;
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 0.3rem;
  border: 1px solid lightgray;
`;

const ErrorMassage = styled.div`
  margin-bottom: 20px;
  color: red;
  font-weight: 500;
`;
