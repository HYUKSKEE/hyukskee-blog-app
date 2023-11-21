import Header from "components/Header";
import Footer from "components/Footer";
import PostList from "components/PostList";
import SwiperCarousel from "components/Carousel";

export default function Home() {
  return (
    <>
      <Header />
      <SwiperCarousel />
      <PostList />
      <Footer />
    </>
  );
}
