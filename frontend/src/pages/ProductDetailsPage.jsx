import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import ProductDetails from "../components/Products/ProductDetails";
import SuggestedProduct from "../components/Products/SuggestedProduct";
//import { useSelector } from "react-redux";
import { productData } from "../static/data";

const ProductDetailsPage = () => {
  //const { allProducts } = useSelector((state) => state.products);
  // const { productData } = useSelector((state) => state.products);
  const { name } = useParams();
  const [data, setData] = useState(null);
  const productName = name.replace(/-/g, " ").trim();

  useEffect(() => {
    const product = productData.find((item) => item.name === productName);
    setData(product);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header />

      <ProductDetails data={data} />

      {data && <SuggestedProduct data={data} />}
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
