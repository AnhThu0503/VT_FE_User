import { useEffect, useState } from "react";

const useDemo = () => {
  let A = 0;

  const [data, setData] = useState([]);

  useEffect(() => {}, [handleA()]);

  const handleA = () => {
    // Gọi API
    setData([{}]);
  };
  return {
    A,
    data,
    handleA,
  };
};
export default useDemo;
