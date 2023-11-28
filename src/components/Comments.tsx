import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "firebaseApp";
import AuthContext from "context/AuthContext";

import { toast } from "react-toastify";
import { PostsType } from "./PostList";

export interface CommentsInterface {
  id: number;
  email: string;
  content: string;
  createdAt: string;
  uid: string;
}

interface CommentProps {
  post: PostsType;
  getPostDetail: (id: string) => Promise<void>;
}

export default function Comments({ post, getPostDetail }: CommentProps) {
  const [comment, setComment] = useState("");
  const { user } = useContext(AuthContext);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { value, name },
    } = e;

    if (name === "comment") {
      setComment(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (post && post.id && user) {
        const postRef = doc(db, "posts", post.id);

        const commentObj = {
          content: comment,
          uid: user.uid,
          email: user.email,
          createdAt: new Date().toLocaleDateString("ko", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
        };

        await updateDoc(postRef, {
          comments: arrayUnion(commentObj),
          updatedAt: new Date().toLocaleDateString("ko", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
        });

        await getPostDetail(post.id);
      }

      toast.success("댓글을 등록했습니다.");
      setComment("");
    } catch (e) {
      toast.error("댓글 등록 중 문제가 발생했습니다.");
    }
  };

  const handleDeleteComment = async (data: CommentsInterface) => {
    const confirm = window.confirm("댓글을 정말 삭제하시겠습니까?");

    if (confirm && post.id) {
      const postRef = doc(db, "posts", post.id);

      await updateDoc(postRef, {
        comments: arrayRemove(data),
      });

      toast.info("댓글을 삭제했습니다.");
      getPostDetail(post.id);
    }
  };

  return (
    <>
      <CommentsContainer>
        <CommentsForm onSubmit={onSubmit}>
          <FormBlock>
            <FormLabel htmlFor="comment">댓글 입력</FormLabel>
            <FormTextarea
              name="comment"
              id="comment"
              value={comment}
              onChange={onChange}
              required
            />
          </FormBlock>
          <SubmitBlock>
            <SubmitInput type="submit" value="입력" />
          </SubmitBlock>
        </CommentsForm>

        <CommentList>
          {post?.comments
            ?.slice(0)
            ?.reverse()
            .map((comment) => (
              <>
                <CommentBox key={comment.id}>
                  <CommentsHeader>
                    <CommentEmail>{comment.email}</CommentEmail>
                    <CommentDate>{comment.createdAt}</CommentDate>
                    {comment.uid === user?.uid && (
                      <CommentAction>
                        <CommentDelete
                          onClick={() => handleDeleteComment(comment)}
                        >
                          삭제
                        </CommentDelete>
                      </CommentAction>
                    )}
                  </CommentsHeader>

                  <CommentContent>{comment.content}</CommentContent>
                </CommentBox>
              </>
            ))}
        </CommentList>
      </CommentsContainer>
    </>
  );
}

const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const CommentBox = styled.div`
  display: flex;
  padding: 24px 12px;
  flex-direction: column;
  gap: 12px;
  border-top: 1px solid #dfdfdf;
  border-bottom: 1px solid #dfdfdf;
`;

const CommentsHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const CommentEmail = styled.p`
  font-weight: 500;
`;

const CommentDate = styled.p`
  color: #6d6d6d;
`;

const CommentContent = styled.p`
  font-size: 20px;
  font-weight: 500;
`;

const CommentAction = styled.div``;

const CommentDelete = styled.button``;

const CommentsContainer = styled.div`
  width: 100%;
`;
const CommentsForm = styled.form``;

const FormBlock = styled.div`
  margin-top: 10px;
  width: 100%;
  height: 100%;
`;

const SubmitBlock = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 20px 0;
  width: 100%;
  height: 100%;
`;

const SubmitInput = styled.input`
  width: 100px;
  height: 36px;
  cursor: pointer;
  font-weight: 500;
  background-color: #2563eb;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  float: right;
`;

const FormLabel = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 20px;
`;

const FormTextarea = styled.textarea`
  min-height: 100px;
  padding: 10px;
  font-size: 16px;
  line-height: 1.5;
  border-radius: 0.3rem;
  border: 1px solid lightgray;
  width: 100%;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
`;
