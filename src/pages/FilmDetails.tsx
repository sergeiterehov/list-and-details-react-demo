import { Box, Container, Link, Skeleton, Stack, Typography } from "@mui/material";
import { useCallback } from "react";
import { useParams } from "react-router-dom";
import { useTitle } from "react-use";
import { useGetFilmQuery, usePatchFilmMutation } from "../api/api";
import EditableTitle from "../components/EditableTitle";
import ReactLink from "../components/ReactLink";

const FilmDetails: React.FC = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetFilmQuery({ id: Number(id) });
  const [patchFilm] = usePatchFilmMutation();

  useTitle(data ? data.title : "Loading film...");

  const renameHandler = useCallback((newName: string) => {
    patchFilm({
      id: Number(id),
      data: { title: newName },
    });
  }, [id, patchFilm]);

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
            <EditableTitle title={data.title} onRename={renameHandler} />
            <Typography>{data.opening_crawl}</Typography>
            <Box mt={2} color="GrayText">
              <Typography>{`Released: ${data.release_date}`}</Typography>
              <Typography>{`Director: ${data.director}`}</Typography>
              <Typography>{`Producer: ${data.producer}`}</Typography>
            </Box>
          </>
        );
      })()}
    </Container>
  );
};

export default FilmDetails;
