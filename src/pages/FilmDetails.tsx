import { Box, Container, Link, Skeleton, Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useTitle } from "react-use";
import { useGetFilmQuery } from "../api/api";
import ReactLink from "../components/ReactLink";

const FilmDetails: React.FC = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetFilmQuery({ id: Number(id) });

  useTitle(data ? data.title : "Loading film...");

  return (
    <Container maxWidth="md">
      <Box mb={2}>
        <Link href="/" component={ReactLink}>Show all films</Link>
      </Box>
      {isLoading ? (
        <Stack gap={1}>
          <Skeleton variant="rectangular" height={60} width="60%" sx={{ mb: 3 }} />
          <Skeleton variant="rectangular" height={20} width="40%" />
          <Skeleton variant="rectangular" height={20} width="35%" />
          <Skeleton variant="rectangular" height={20} width="30%" />
        </Stack>
      ) : (() => {
        if (!data) return null;

        return (
          <>
            <Typography variant="h1">{data.title}</Typography>
            <Typography>{data.opening_crawl}</Typography>
          </>
        );
      })()}
    </Container>
  );
};

export default FilmDetails;
