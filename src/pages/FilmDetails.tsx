import { Box, Link, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetFilmQuery } from "../api/api";
import ReactLink from "../components/ReactLink";

const FilmDetails: React.FC = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetFilmQuery({ id: Number(id) });

  return (
    <Box>
      <Box><Link href="/" component={ReactLink}>Go back</Link></Box>
      {isLoading && <Box>Loading...</Box>}
      {(() => {
        if (!data) return null;

        return (
          <>
            <Typography variant="h1">{data.title}</Typography>
            <Typography>{data.opening_crawl}</Typography>
          </>
        );
      })()}
    </Box>
  );
};

export default FilmDetails;
