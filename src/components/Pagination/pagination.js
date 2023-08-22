import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Pagination } from "antd";

import "./pagination.scss";
import { getArticles } from "../../store/articleAsyncThunk";

const SetPagination = () => {
  const dispatch = useDispatch();
  const articlesCount = useSelector((state) => state.articles.articlesCount);
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
