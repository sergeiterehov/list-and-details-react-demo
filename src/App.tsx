import { useGetFilmsQuery } from "./api/api";

const App: React.FC = () => {
  const { data } = useGetFilmsQuery();

  return (
    <div className="App">
      TEST
    </div>
  );
};

export default App;
