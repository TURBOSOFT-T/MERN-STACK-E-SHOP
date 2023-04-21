import React from "react";


import styles from "../../styles/styles";


const SuggestedProduct = ({ data }) => {
  


  return (
    <div>
      
        <div className={`p-4 ${styles.section}`}>
          <h2
            className={`${styles.heading} text-[25px] font-[500] border-b mb-5`}
          >
            Related Product
          </h2>
          
        </div>
    
    </div>
  );
};

export default SuggestedProduct;
