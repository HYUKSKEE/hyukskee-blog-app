import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function SignUpForm() {
  const [error, setError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");

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

    if (name === "passwordConfirm") {
      setPasswordConfirm(value);

      const validRegex =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

      if (!value?.match(validRegex)) {
        setError(
          "비밀번호는 영문, 숫자, 특수문자를 모두 포함하고 8자리 이상이어야 합니다."
        );
      } else if (value !== password) {
        setError("비밀번호 값이 일치하지 않습니다. 다시 확인해주세요.");
      }
    }
  };

  return (
    <>
      <Form action="/post" method="POST">
        <h1>회원가입</h1>
        <FormBox>
          <FormLabel htmlFor="email">이메일</FormLabel>
          <FormTextInput
            type="text"
            name="email"
            id="email"
            onChange={onChange}
            required
          />
        </FormBox>

        <FormBox>
          <FormLabel htmlFor="password">비밀번호</FormLabel>
          <FormTextInput
            type="password"
            name="password"
            id="password"
            onChange={onChange}
            required
          />
        </FormBox>

        <FormBox>
          <FormLabel htmlFor="password_confirm">비밀번호 확인</FormLabel>
          <FormTextInput
            type="password"
            name="password_confirm"
            id="password_confirm"
            onChange={onChange}
            required
          />
        </FormBox>

        {error && error.length > 0 && (
          <ErrorTaster>
            <ErrorMassage>{error}</ErrorMassage>
          </ErrorTaster>
        )}
        <FormBox>
          <FormSubmitInput
            type="submit"
            value="회원가입"
            disabled={error?.length > 0}
          />
        </FormBox>

        <FormBox>
          <p>계정이 이미 있으신가요?</p>
          <Link to="/login">로그인하기</Link>
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

const ErrorTaster = styled.div`
  margin: auto;
  padding: 10px;
  border: 1px solid lightgray;
  border-radius: 10px;
  text-align: center;
`;

const ErrorMassage = styled.p`
  color: red;
  font-size: 18px;
`;
