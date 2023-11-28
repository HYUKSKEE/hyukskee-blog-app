import styled from "styled-components";
import { IPostActionButton, PostsType } from "components/PostList";
import Header from "./Header";
import Footer from "./Footer";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import AuthContext from "context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Comments from "./Comments";

export default function PostsDetail() {
  const [post, setPost] = useState<PostsType | null>(null);
  const { user } = useContext(AuthContext);
  const params = useParams();
  const navigate = useNavigate();

  const handleDelete = async (id?: string) => {
    const confirm = window.confirm("정말 삭제 하시겠습니까?");

    if (!confirm) {
      toast.info("게시글 삭제를 취소했습니다.");
    }

    if (id && confirm) {
      const docRef = doc(db, "posts", id);
      await deleteDoc(docRef);
      toast.error("게시글을 삭제했습니다.");
      navigate("/");
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

  return (
    <>
      <Header />
      {post && (
        <PostBox>
          <PostTitle>{post.title}</PostTitle>
          <PostCategory>{post.category}</PostCategory>

          <PostHeader>
            <PostAuthor>
              <PostAvatar></PostAvatar>
              <PostName>{user?.displayName || "사용자"}</PostName>
            </PostAuthor>
            <PostCreatedAt>{post.createdAt}</PostCreatedAt>
          </PostHeader>

          {post.email === user?.email && (
            <PostAction>
              <PostLink to={`/posts/edit/${post.id}`}>
                <PostActionButton color="#8585ff">수정</PostActionButton>
              </PostLink>
              <PostActionButton
                color="#ff4949"
                onClick={() => handleDelete(post.id)}
              >
                삭제
              </PostActionButton>
            </PostAction>
          )}

          <PostContent>{post.content}</PostContent>
        </PostBox>
      )}

      <Comments />

      <Footer />
    </>
  );
}

const PostBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  max-width: 1280px;
  width: 100%;
  margin: auto;
  padding: 100px 12px 140px 12px;
  margin-bottom: 24px;
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const PostAuthor = styled.div`
  max-width: 150px;
  max-height: 100px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 24px;
`;

const PostAvatar = styled.div`
  width: 30%;
  aspect-ratio: 1 / 1;
  background-color: #a1d2fd;
  border-radius: 100%;
`;

const PostName = styled.p`
  font-size: 18px;
  font-weight: 500;
  color: #120f0f;
`;

const PostCreatedAt = styled.p`
  color: #02af89;
`;

const PostCategory = styled.p`
  font-size: 20px;
  color: #a1a1a1;
`;

const PostTitle = styled.p`
  font-size: 36px;
  font-weight: 600;
  color: #202020;
`;

const PostContent = styled.p`
  text-align: left;
  word-break: keep-all;
  color: #a2a2a2;
`;

const PostAction = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
`;

const PostActionButton = styled.button<IPostActionButton>`
  color: #373737;
  padding: 8px;
  min-width: 50px;
  background-color: #ffffff;
  border: 1px solid #dfdfdf;
  border-radius: 12px;
  cursor: pointer;

  &:hover,
  &:focus {
    background-color: #f0f0f0;
    color: ${(props) => props.color};
  }
`;

const PostLink = styled(Link)`
  text-decoration: none;
  text-align: left;
`;
