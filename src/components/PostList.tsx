import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  doc,
  collection,
  getDocs,
  deleteDoc,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import { db } from "firebaseApp";
import AuthContext from "context/AuthContext";
import { toast } from "react-toastify";
import { CATEGORIES, CategoryType } from "./PostForm";
import { CommentsInterface } from "./Comments";

interface PostListProps {
  hasNavigation?: boolean;
  defaultTab?: TActiveTab;
}

export interface PostsType {
  id?: string;
  title: string;
  comments: CommentsInterface[];
  summary: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  uid: string;
  category: CategoryType;
}

type TActiveTab = "all" | "me" | CategoryType;

export default function PostList({
  hasNavigation = true,
  defaultTab = "all",
}: PostListProps) {
  const [currentTab, setCurrentTab] = useState<TActiveTab | string>(defaultTab);
  const [posts, setPosts] = useState<PostsType[]>([]);
  const { user } = useContext(AuthContext);

  const getPosts = async () => {
    setPosts([]); // post 초기화
    let postsRef = collection(db, "posts");
    let postsQuery = query(postsRef, orderBy("createdAt", "asc"));

    if (currentTab === "me") {
      postsQuery = query(
        postsRef,
        where("uid", "==", user?.uid),
        orderBy("createdAt", "asc")
      );
    } else if (currentTab === "all") {
      postsQuery = query(postsRef, orderBy("createdAt", "asc"));
    } else {
      postsQuery = query(
        postsRef,
        where("category", "==", currentTab),
        orderBy("createdAt", "asc")
      );
    }

    const dataList = await getDocs(postsQuery);
    dataList.forEach((doc) => {
      const dataObject = { ...doc.data(), id: doc.id };

      setPosts((prev) => [...prev, dataObject as PostsType]);
    });
  };

  const handleDelete = async (id?: string) => {
    const confirm = window.confirm("정말 삭제 하시겠습니까?");

    if (!confirm) {
      toast.info("게시글 삭제를 취소했습니다.");
    }

    if (id && confirm) {
      const docRef = doc(db, "posts", id);
      await deleteDoc(docRef);
      toast.error("게시글을 삭제했습니다.");
      getPosts(); // post 갱신
    }
  };

  useEffect(() => {
    getPosts();
  }, [currentTab]);

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

            {CATEGORIES.map((category, index) => (
              <Tab
                key={index + 1}
                active={currentTab === category ? "true" : "false"}
                onClick={() => setCurrentTab(category)}
              >
                {category}
              </Tab>
            ))}
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
                  <PostCreatedAt>
                    {post.updatedAt
                      ? `${post.updatedAt}에 수정됨`
                      : post.createdAt}
                  </PostCreatedAt>
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
                    <PostActionButton
                      color="#ff4949"
                      onClick={() => handleDelete(post.id)}
                    >
                      삭제
                    </PostActionButton>
                  </PostAction>
                )}
              </PostBox>
            );
          })
        ) : (
          <EmptyPosts>게시글이 없습니다.</EmptyPosts>
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

const Tab = styled.p<ITab>`
  cursor: pointer;
  font-weight: ${(props) => (props.active === "true" ? 900 : 400)};
`;

const Posts = styled.div`
  position: relative;
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

const PostName = styled.p`
  font-size: 18px;
  font-weight: 500;
  color: #120f0f;
`;

const PostCreatedAt = styled.p`
  color: #02af89;
`;

const PostTitle = styled.p`
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: 600;
  color: #202020;
  cursor: pointer;
`;

const PostContent = styled.p`
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

const EmptyPosts = styled.div`
  margin: auto;
  margin-top: 100px;
  padding: 24px;
  width: max-content;
  font-size: 24px;
  border: 1px solid #dfdfdf;
  border-radius: 24px;
  color: #a1a1a1;
`;

// TODO: loader 적용
const Loading = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 48px;
  height: 48px;
  border: 5px solid black;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
  z-index: 10;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
