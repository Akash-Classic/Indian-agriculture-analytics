import React, { useEffect, useState } from "react";
import { Table } from "@mantine/core";
import { fetchData } from "../utils/fetchData";

const CropStatsTable: React.FC = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetchData().then(({ cropAggregated }) => setData(cropAggregated));
  }, []);

  const rows = data.map((item, index) => (
    <tr key={index}>
      <td>{item["Crop Name"]}</td>
      <td>{item.avgYield.toFixed(3)}</td>
      <td>{item.avgCultivationArea.toFixed(3)}</td>
    </tr>
  ));

  return (
    <Table style={{marginBottom: "4rem"}}>
      <thead>
        <tr>
          <th>Crop</th>
          <th>Average Yield of the Crop between 1950-2020</th>
          <th>Average Cultivation Area of the Crop between 1950-2020</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
};

export default CropStatsTable;
