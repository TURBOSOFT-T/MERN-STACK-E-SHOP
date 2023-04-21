import React, { useEffect } from "react";
//import { useParams } from "react-router-dom";

import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
//import ProductDetails from "../components/Products/ProductDetails";
//import SuggestedProduct from "../components/Products/SuggestedProduct";
//import { useSelector } from "react-redux";
import { productData } from "../static/data";

const ProductDetailsPage = () => {
  //const { allProducts } = useSelector((state) => state.products);
  // const { productData } = useSelector((state) => state.products);
 // const { name } = useParams();
 // const [data, setData] = useState(null);
 // const productName = name.replace(/-/g, " ").trim();
  

  useEffect(() => {
   
  }, []);
  

  return (
    <div>
      <Header />

      <div>
        ddddddddddddddddddddddd
      </div>
      {/* <ProductDetails data={data} />
      {data && <SuggestedProduct data={data} />}
      <SuggestedProduct /> */}
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
