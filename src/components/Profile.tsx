import styled from "styled-components";
import PostList from "./PostList";
import { useNavigate } from "react-router-dom";

import { getAuth, signOut } from "firebase/auth";
import { app } from "firebaseApp";
import { toast } from "react-toastify";
import { useContext } from "react";
import AuthContext from "context/AuthContext";

export default function Profile() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const onSignOut = async () => {
    try {
      const auth = getAuth(app);
      await signOut(auth);
      toast.success("로그아웃 되었습니다.");
      navigate("/");
    } catch (e: any) {
      console.log(e);
      toast.error(e?.code);
    }
  };

  return (
    <>
      <ProfileCard>
        <CardTitle>내 정보</CardTitle>
        <CardContent>
          <ContentList>
            <LabelText>이메일:</LabelText> {user?.email}
          </ContentList>
          <ContentList>
            <LabelText>닉네임:</LabelText>
            {user?.displayName || "사용자"}
          </ContentList>
        </CardContent>
        <LogoutBox>
          <Logout role="presentation" onClick={onSignOut}>
            로그아웃
          </Logout>
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

const Logout = styled.button`
  max-width: 150px;
  width: 100%;
  background-color: #ffffff;
  border: none;
  color: #02af89;
  cursor: pointer;
`;
