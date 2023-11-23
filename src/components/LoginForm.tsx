import { Link } from "react-router-dom";
import styled from "styled-components";

export default function LoginForm() {
  return (
    <>
      <Form action="/post" method="POST">
        <h1>로그인</h1>
        <FormBox>
          <FormLabel htmlFor="email">이메일</FormLabel>
          <FormTextInput type="text" name="email" id="email" required />
        </FormBox>
        <FormBox>
          <FormLabel htmlFor="password">비밀번호</FormLabel>
          <FormTextInput type="password" name="password" id="password" />
        </FormBox>
        <FormBox>
          <FormSubmitInput type="submit" value="로그인" />
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
