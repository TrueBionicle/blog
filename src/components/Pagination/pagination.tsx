import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks.ts";
import { Pagination } from "antd";

import "./pagination.scss";
import { getArticles } from "../../store/articleAsyncThunk.ts";

const SetPagination = () => {
  const dispatch = useAppDispatch();

  const articlesCount = useAppSelector((state) => state.articles.articlesCount);

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
