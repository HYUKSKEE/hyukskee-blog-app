import { useState } from "react";
import styled from "styled-components";

export default function Comments() {
  const [comment, setComment] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { value, name },
    } = e;

    if (name === "comment") {
      setComment(value);
    }
  };

  return (
    <>
      <CommentsContainer>
        <CommentsForm>
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
          <FormBlock>
            <SubmitInput type="submit" value="입력" />
          </FormBlock>
        </CommentsForm>
      </CommentsContainer>
    </>
  );
}

const CommentsContainer = styled.div``;
const CommentsForm = styled.form``;
const FormBlock = styled.div``;
const SubmitInput = styled.input``;
const FormLabel = styled.label``;
const FormTextarea = styled.textarea``;
