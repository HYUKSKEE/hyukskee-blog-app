import styled from "styled-components";

export default function PostForm() {
  return (
    <>
      <Form action="/post" method="POST">
        <FormBox>
          <FormLabel htmlFor="title">제목</FormLabel>
          <FormTextInput type="text" name="title" id="title" required />
        </FormBox>
        <FormBox>
          <FormLabel htmlFor="summary">요약</FormLabel>
          <FormTextInput type="text" name="summary" id="summary" />
        </FormBox>
        <FormBox>
          <FormLabel htmlFor="summary">내용</FormLabel>
          <FormTextarea name="summary" id="summary"></FormTextarea>
        </FormBox>
        <FormBox>
          <FormSubmitInput type="submit" value="제출" />
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
