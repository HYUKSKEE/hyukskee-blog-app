import { Link } from "react-router-dom";
import styled from "styled-components";
import PostList from "./PostList";

export default function Profile() {
  return (
    <>
      <ProfileCard>
        <CardTitle>내 정보</CardTitle>
        <CardContent>
          <ContentList>
            <LabelText>이메일:</LabelText> kevin@gmail.com
          </ContentList>
          <ContentList>
            <LabelText>닉네임:</LabelText> kevin
          </ContentList>
        </CardContent>
        <LogoutBox>
          <LogoutLink to="/">로그아웃</LogoutLink>
        </LogoutBox>
      </ProfileCard>

      <PostList hasNavigation={false} />
    </>
  );
}

const ProfileCard = styled.div`
  max-width: 1280px;
  width: 100%;
  margin: auto;
  padding: 24px;
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  border: 1px solid #dfdfdf;
  border-radius: 24px;
`;

const CardTitle = styled.div`
  font-size: 24px;
  font-weight: 700;
`;

const CardContent = styled.div`
  padding: 12px;
`;

const ContentList = styled.div`
  font-size: 20px;
  display: flex;
  gap: 16px;
`;

const LabelText = styled.div`
  font-weight: 700;
`;

const LogoutBox = styled.div`
  width: 100%;
  background-color: white;
  border: none;
  text-align: center;
`;

const LogoutLink = styled(Link)`
  max-width: 150px;
  width: 100%;
  text-decoration: none;
  color: #02af89;
`;
