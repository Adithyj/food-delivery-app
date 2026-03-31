import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function CategoryPage() {

  const { categoryName } = useParams();
  const navigate = useNavigate();

  useEffect(() => {

    if (categoryName) {
      navigate(`/category/${categoryName}`);
    }

  }, [categoryName, navigate]);

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2>Loading restaurants...</h2>
    </div>
  );
}

export default CategoryPage;