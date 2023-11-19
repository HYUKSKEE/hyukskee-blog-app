import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Home() {
  return (
    <>
      <HomeHeader>
        <HomeNavigation>
          <li>
            <Link to="/posts/new">글쓰기</Link>
          </li>
          <li>
            <Link to="/posts">게시글</Link>
          </li>
          <li>
            <Link to="/profile">프로필</Link>
          </li>
        </HomeNavigation>
      </HomeHeader>

      <Posts>
        {/* TODO: 컴포넌트화 필요 */}
        {[
          ...Array(10)
            .fill(0)
            .map((value, index) => {
              return index + 1;
            }),
        ].map((list) => {
          return (
            <PostBox key={list}>
              <PostHeader>
                <PostAuthor>
                  <PostAvatar></PostAvatar>
                  <PostName>Kevin</PostName>
                </PostAuthor>
                <PostCreatedAt>2023.09.23</PostCreatedAt>
              </PostHeader>
              <PostTitle>대만 여행 {list}일차 기록</PostTitle>
              <PostContent>
                그런데 가족끼리 함께 하는 여행은 좀 다르죠! 특히 아이들이 있거나
                어르신을 모시고 대만여행을 오신다면 대중교통을 이용해 여행을
                하는게 좀 부담스러울 수도 있어요. 그렇다고 패키지로 여행을
                하자니 여행일정이 맘에 안들거나 대만에서 꼭 가보고 싶은 여행지가
                코스에서 빠져있는 경우도 많고요. 그런분들에게 추천해드리는
                여행은 바로 택시투어입니다. 많은 분들이 택시투어 하면 타이베이
                외곽 예스진지투어 또는 화련 택시투어만 생각하시는데요.그런데
                가족끼리 함께 하는 여행은 좀 다르죠! 특히 아이들이 있거나
                어르신을 모시고 대만여행을 오신다면 대중교통을 이용해 여행을
                하는게 좀 부담스러울 수도 있어요. 그렇다고 패키지로 여행을
                하자니 여행일정이 맘에 안들거나 대만에서 꼭 가보고 싶은 여행지가
                코스에서 빠져있는 경우도 많고요. 그런분들에게 추천해드리는
                여행은 바로 택시투어입니다. 많은 분들이 택시투어 하면 타이베이
                외곽 예스진지투어 또는 화련 택시투어만 생각하시는데요.그런데
                가족끼리 함께 하는 여행은 좀 다르죠! 특히 아이들이 있거나
                어르신을 모시고 대만여행을 오신다면 대중교통을 이용해 여행을
                하는게 좀 부담스러울 수도 있어요. 그렇다고 패키지로 여행을
                하자니 여행일정이 맘에 안들거나 대만에서 꼭 가보고 싶은 여행지가
                코스에서 빠져있는 경우도 많고요. 그런분들에게 추천해드리는
                여행은 바로 택시투어입니다. 많은 분들이 택시투어 하면 타이베이
                외곽 예스진지투어 또는 화련 택시투어만 생각하시는데요.
              </PostContent>
              <PostAction>
                <PostActionButton color="#8585ff">수정</PostActionButton>
                <PostActionButton color="#ff4949">삭제</PostActionButton>
              </PostAction>
            </PostBox>
          );
        })}
      </Posts>

      <HomeFooter>Hyukskee blog</HomeFooter>
    </>
  );
}

interface IPostActionButton {
  color: string;
}

const HomeHeader = styled.header`
  list-style: none;
  display: flex;
  justify-content: flex-end;
  gap: 24px;
`;

const HomeFooter = styled.footer`
  position: sticky;
  bottom: 0;
  width: 100%;
  min-height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  font-size: 24px;
  font-weight: 900;
  border-top: 1px solid #dedede;
  color: #dfdfdf;
  background-color: #ffffff;
`;

const HomeNavigation = styled.ul`
  list-style: none;
  display: flex;
  justify-content: flex-end;
  gap: 24px;
`;

const Posts = styled.div`
  max-width: 1280px;
  width: 100%;
  height: 100%;
  margin: auto;
  padding: 20px 40px;
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
  color: ${(props) => props.color};
  padding: 8px;
  min-width: 50px;
  background-color: #ffffff;
  border: 1px solid #dfdfdf;
  border-radius: 12px;
`;
