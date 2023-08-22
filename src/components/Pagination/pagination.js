import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Pagination } from "antd";

import "./pagination.scss";
import { getArticles } from "../../testApi";

const SetPagination = () => {
  const dispatch = useDispatch();
  const articlesCount = useSelector((state) => state.articlesCount);
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <Pagination
      current={currentPage}
      defaultPageSize={5}
      total={articlesCount}
      showSizeChanger={false}
      onChange={(e) => {
        dispatch(getArticles(e));
        setCurrentPage(e);
      }}
    />
  );
};

export default SetPagination;
