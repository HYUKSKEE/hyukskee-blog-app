import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { collection, getDocs } from "firebase/firestore";
import { db } from "firebaseApp";
import AuthContext from "context/AuthContext";

interface PostListProps {
  hasNavigation?: boolean;
}

export interface PostsType {
  id?: string;
  title: string;
  summary: string;
  content: string;
  createdAt: string;
  email: string;
}

type TActiveTab = "all" | "me";

export default function PostList({ hasNavigation = true }: PostListProps) {
  const [currentTab, setCurrentTab] = useState<TActiveTab>("all");
  const [posts, setPosts] = useState<PostsType[]>([]);
  const { user } = useContext(AuthContext);

  const getPosts = async () => {
    const querySnapshot = await getDocs(collection(db, "posts"));
    querySnapshot.forEach((doc) => {
      const dataObject = { ...doc.data(), id: doc.id };

      setPosts((prev) => [...prev, dataObject as PostsType]);
    });
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <Posts>
        {hasNavigation && (
          <TabFilter>
            <Tab
              active={currentTab === "all" ? "true" : "false"}
              onClick={() => setCurrentTab("all")}
            >
              전체
            </Tab>
            <Tab
              active={currentTab === "me" ? "true" : "false"}
              onClick={() => setCurrentTab("me")}
            >
              나의 글
            </Tab>
          </TabFilter>
        )}
        {posts.length > 0 ? (
          posts?.map((post: PostsType, index: number) => {
            return (
              <PostBox key={index + 1}>
                <PostHeader>
                  <PostAuthor>
                    <PostAvatar></PostAvatar>
                    <PostName>{user?.displayName || "사용자"}</PostName>
                  </PostAuthor>
                  <PostCreatedAt>{post.createdAt}</PostCreatedAt>
                </PostHeader>
                <PostLink to={`/posts/${post.id}`}>
                  <PostTitle>{post.title}</PostTitle>
                  <PostContent>{post.summary}</PostContent>
                </PostLink>

                {post.email === user?.email && (
                  <PostAction>
                    <PostLink to={`/posts/edit/${post.id}`}>
                      <PostActionButton color="#8585ff">수정</PostActionButton>
                    </PostLink>
                    <PostActionButton color="#ff4949">삭제</PostActionButton>
                  </PostAction>
                )}
              </PostBox>
            );
          })
        ) : (
          <div>게시글이 없습니다.</div>
        )}
      </Posts>
    </>
  );
}

export interface IPostActionButton {
  color: string;
}

interface ITab {
  active: string;
}

const TabFilter = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
`;

const Tab = styled.div<ITab>`
  cursor: pointer;
  font-weight: ${(props) => (props.active === "true" ? 900 : 400)};
`;

const Posts = styled.div`
  max-width: 1280px;
  width: 100%;
  height: 100%;
  margin: auto;
  padding: 20px 40px 140px 40px;
  text-align: center;
`;

const PostBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  border-top: 1px solid #dedede;
  padding: 20px 12px;
  margin-bottom: 24px;
`;

const PostLink = styled(Link)`
  text-decoration: none;
  text-align: left;
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

const PostName = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: #120f0f;
`;

const PostCreatedAt = styled.div`
  color: #02af89;
`;

const PostTitle = styled.div`
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: 600;
  color: #202020;
  cursor: pointer;
`;

const PostContent = styled.div`
  text-align: left;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  height: 100px;
  line-height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: keep-all;
  color: #a2a2a2;
  cursor: pointer;
`;

const PostAction = styled.div`
  display: flex;
  justify-content: flex-end;
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
