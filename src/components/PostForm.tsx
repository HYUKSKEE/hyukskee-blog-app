import styled from "styled-components";
import { useContext, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import AuthContext from "context/AuthContext";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function PostForm() {
  const [title, setTitle] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {
      target: { name, value },
    } = e;

    if (name === "title") {
      setTitle(value);
    }
    if (name === "summary") {
      setSummary(value);
    }
    if (name === "content") {
      setContent(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "posts"), {
        title: title,
        summary: summary,
        content: content,
        createdAt: new Date()?.toLocaleDateString(),
        email: user?.email,
      });

      toast?.success("게시물 업로드에 성공했습니다.");
      navigate("/");
    } catch (e: any) {
      console.log(e);
      toast?.error(e.code);
    }
  };

  return (
    <>
      <Form onSubmit={onSubmit}>
        <FormBox>
          <FormLabel htmlFor="title">제목</FormLabel>
          <FormTextInput
            type="text"
            name="title"
            id="title"
            required
            onChange={onChange}
          />
        </FormBox>
        <FormBox>
          <FormLabel htmlFor="summary">요약</FormLabel>
          <FormTextInput
            type="text"
            name="summary"
            id="summary"
            onChange={onChange}
          />
        </FormBox>
        <FormBox>
          <FormLabel htmlFor="content">내용</FormLabel>
          <FormTextarea
            name="content"
            id="content"
            onChange={onChange}
            required
          ></FormTextarea>
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
