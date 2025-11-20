import BlogSlider from "./components/BlogSlider";
import PopularProducts from "./components/PopularProducts";

export default function Home() {
  return (
    <>
      {/* Üstte Kayan Slider */}
      <BlogSlider />
      
      {/* Altında Ürünler */}
      <PopularProducts />
    </>
  );
}