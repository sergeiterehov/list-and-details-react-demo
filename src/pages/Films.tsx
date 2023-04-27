import { Box, Link } from "@mui/material";
import { useGetFilmsQuery } from "../api/api";
import ReactLink from "../components/ReactLink";
import { getFilmIdByUrl } from "../utils/id";

const Films: React.FC = () => {
  const { data, isLoading } = useGetFilmsQuery();

  return (
    <Box>
      {isLoading && <Box>Loading...</Box>}
      {data?.results.map((film) => {
        return (
          <Link key={film.episode_id}
            href={`/film/${getFilmIdByUrl(film.url)}`}
            component={ReactLink}
          >
            <Box>{film.title}</Box>
          </Link>
        );
      })}
    </Box>
  );
};

export default Films;
