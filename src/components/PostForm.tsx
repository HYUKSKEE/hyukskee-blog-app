import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { collection, addDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import AuthContext from "context/AuthContext";

import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { PostsType } from "./PostList";

export type CategoryType =
  | "category1"
  | "category2"
  | "category3"
  | "category4"
  | undefined;
export const CATEGORIES = ["category1", "category2", "category3", "category4"];

export default function PostForm() {
  const [post, setPost] = useState<PostsType | null>(null);
  const [title, setTitle] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [category, setCategory] = useState<CategoryType>(undefined);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const params = useParams();

  const onChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
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
    if (name === "category") {
      setCategory(value as CategoryType);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (params.id) {
        const docRef = doc(db, "posts", params.id);

        await updateDoc(docRef, {
          title: title,
          summary: summary,
          content: content,
          updatedAt: new Date().toLocaleDateString("ko", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
          uid: user?.uid,
          category: category,
        });

        toast?.success("게시물 수정에 성공했습니다.");
        navigate("/");
      } else {
        await addDoc(collection(db, "posts"), {
          title: title,
          summary: summary,
          content: content,
          createdAt: new Date().toLocaleDateString("ko", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
          email: user?.email,
          uid: user?.uid,
          category: category,
        });

        toast?.success("게시물 업로드에 성공했습니다.");
        navigate("/");
      }
    } catch (e: any) {
      console.log(e);
      toast?.error(e.code);
    }
  };

  const getPostDetail = async (id: string) => {
    if (id) {
      const dorRef = doc(db, "posts", id);
      const docSnap = await getDoc(dorRef);

      setPost({ id: docSnap.id, ...(docSnap.data() as PostsType) });
    }
  };

  useEffect(() => {
    if (params.id) {
      getPostDetail(params?.id);
    }
  }, [params?.id]);

  useEffect(() => {
    if (post) {
      console.log("post", post);
      setTitle(post.title);
      setContent(post.content);
      setSummary(post.summary);
      setCategory(post.category);
    }
  }, [post]);

  return (
    <FormContainer>
      <Form onSubmit={onSubmit}>
        <FormBox>
          <FormLabel htmlFor="title">제목</FormLabel>
          <FormTextInput
            type="text"
            name="title"
            id="title"
            required
            onChange={onChange}
            value={title}
          />
        </FormBox>
        <FormBox>
          <FormLabel htmlFor="category">카테고리</FormLabel>
          <FormSelect
            name="category"
            id="category"
            onChange={onChange}
            defaultValue={category}
          >
            <option value="">---카테고리 선택</option>
            {CATEGORIES.map((category) => (
              <option value={category}>{category}</option>
            ))}
          </FormSelect>
        </FormBox>
        <FormBox>
          <FormLabel htmlFor="summary">요약</FormLabel>
          <FormTextInput
            type="text"
            name="summary"
            id="summary"
            onChange={onChange}
            value={summary}
          />
        </FormBox>
        <FormBox>
          <FormLabel htmlFor="content">내용</FormLabel>
          <FormTextarea
            name="content"
            id="content"
            onChange={onChange}
            required
            value={content}
          ></FormTextarea>
        </FormBox>
        <FormBox>
          <FormSubmitInput type="submit" value={post ? "수정" : "제출"} />
        </FormBox>
      </Form>
    </FormContainer>
  );
}

const FormContainer = styled.div`
  margin: 0 auto;
  max-width: 1024px;
  width: 100%;
`;

const Form = styled.form`
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
  margin: auto;
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

const FormSelect = styled.select`
  height: 40px;
  padding: 10px;
  font-size: 16px;
  border-radius: 0.3rem;
  border: 1px solid lightgray;
`;
