import React, { useEffect, useState } from "react";
import { Table } from "@mantine/core";
import { fetchData } from "../utils/fetchData";

const YearlyCropTable: React.FC = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetchData().then(({ yearAggregated }) => setData(yearAggregated));
  }, []);

  const rows = data.map((item, index) => (
    <tr key={index}>
      <td>{item.Year}</td>
      <td>{item.maxProductionCrop}</td>
      <td>{item.minProductionCrop}</td>
    </tr>
  ));

  return (
    <Table>
      <thead>
        <tr>
          <th>Year</th>
          <th>Crop with Maximum Production in that Year</th>
          <th>Crop with Minimum Production in that Year</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
};

export default YearlyCropTable;
