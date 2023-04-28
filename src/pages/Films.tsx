import { Box, Container, Link, Pagination, Skeleton, Stack, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { useDebounce, useTitle } from "react-use";
import { useGetFilmsQuery } from "../api/api";
import ReactLink from "../components/ReactLink";
import SearchInput from "../components/SearchInput";
import { getFilmIdByUrl } from "../utils/id";

const Films: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [search, setSearch] = useState(searchValue);

  const { data, isFetching } = useGetFilmsQuery({ search });

  useDebounce(() => setSearch(searchValue), 1000, [searchValue]);

  useTitle("All Films");

  const changeSearchHandler = useCallback((newText: string) => setSearchValue(newText), []);

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
            <Pagination hidePrevButton hideNextButton count={10} sx={{ mt: 4 }} />
          </Box>
        );
      })()}
    </Container>
  );
};

export default Films;
