import { useGetFilmsQuery } from "../api/api";

const Films: React.FC = () => {
  const { data } = useGetFilmsQuery();

  return null;
};

export default Films;
