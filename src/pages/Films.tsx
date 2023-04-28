import { Box, Container, Link, Pagination, Skeleton, Stack, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounce, useTitle } from "react-use";
import { useGetFilmsQuery } from "../api/api";
import ReactLink from "../components/ReactLink";
import SearchInput from "../components/SearchInput";
import { getFilmIdByUrl } from "../utils/id";

const enum SearchParam {
  Search = "s",
  Page = "page",
}

const ItemsPerPage = 10;

const Films: React.FC = () => {
  const [params, setParams] = useSearchParams();

  const page = Number(params.get(SearchParam.Page)) || 1;
  const search = params.get(SearchParam.Search) || "";

  const [searchValue, setSearchValue] = useState(search);

  const { data, isFetching, isError } = useGetFilmsQuery({ search, page });

  useTitle("All Films");

  useDebounce(() => setParams({ [SearchParam.Search]: searchValue }), 1000, [searchValue]);

  const changeSearchHandler = useCallback((newText: string) => setSearchValue(newText), []);

  const changePageHandler = useCallback((event: React.ChangeEvent<unknown>, newPage: number) => setParams({
    [SearchParam.Search]: searchValue,
    [SearchParam.Page]: String(newPage),
  }), [searchValue, setParams]);

  const resetFiltersHandler = useCallback(() => {
    setParams({});
    setSearchValue("");
  }, [setParams]);

  return (
    <Container maxWidth="md">
      <Typography variant="h1">All SW films</Typography>
      <Box mb={4}>
        <SearchInput text={searchValue} onChange={changeSearchHandler} />
      </Box>
      {isFetching ? (
        <Stack gap={1}>
          <Skeleton variant="rectangular" height={60} width="60%" />
          <Skeleton variant="rectangular" height={60} width="50%" />
          <Skeleton variant="rectangular" height={60} width="30%" />
        </Stack>
      ) : (() => {
        if (isError) {
          return (
            <Box>
              Oops!
              <br />
              <Link component={ReactLink} onClick={resetFiltersHandler}>Reset filters</Link>
            </Box>
          );
        }

        if (!data) return null;

        return (
          <Box>
            <Stack>
              {data.results.map((film) => {
                return (
                  <Link key={film.episode_id}
                    underline="none"
                    color="inherit"
                    sx={{ "&:hover, &:focus": {
                      backgroundColor: "ButtonHighlight",
                    } }}
                    href={`/film/${getFilmIdByUrl(film.url)}`}
                    component={ReactLink}
                  >
                    <Box p={1}>
                      <Box fontWeight={600}>{film.title}</Box>
                      <Box>{`${film.director}, ${film.release_date.substring(0, 4)}`}</Box>
                    </Box>
                  </Link>
                );
              })}
            </Stack>
            <Pagination
              hidePrevButton
              hideNextButton
              sx={{ mt: 4 }}
              // count={Math.ceil(data.count / ItemsPerPage)}
              count={4} // Для демонстрации
              page={page}
              onChange={changePageHandler}
            />
          </Box>
        );
      })()}
    </Container>
  );
};

export default Films;
