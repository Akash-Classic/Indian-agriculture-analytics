import data from "../dataset.json";

// Type definitions for better code readability
type CropData = {
  Country: string;
  Year: string;
  "Crop Name": string;
  "Crop Production (UOM:t(Tonnes))": number | string;
  "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))": number | string;
  "Area Under Cultivation (UOM:Ha(Hectares))": number | string;
};

type AggregatedData = {
  Year: string;
  maxProductionCrop: string;
  minProductionCrop: string;
};

type CropStats = {
  "Crop Name": string;
  avgYield: number;
  avgCultivationArea: number;
};

export const fetchData = async () => {
  const processedData: CropData[] = data.map((item) => ({
    ...item,
    "Crop Production (UOM:t(Tonnes))":
      item["Crop Production (UOM:t(Tonnes))"] || 0,
    "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))":
      item["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"] || 0,
    "Area Under Cultivation (UOM:Ha(Hectares))":
      item["Area Under Cultivation (UOM:Ha(Hectares))"] || 0,
  }));

  const yearData = processedData.reduce((acc, item) => {
    const year = item.Year;
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(item);
    return acc;
  }, {} as Record<string, CropData[]>);

  const yearAggregated: AggregatedData[] = Object.entries(yearData).map(
    ([year, crops]) => {
      const maxProductionCrop = crops.reduce((max, crop) =>
        parseFloat(max["Crop Production (UOM:t(Tonnes))"].toString()) >
        parseFloat(crop["Crop Production (UOM:t(Tonnes))"].toString())
          ? max
          : crop
      )["Crop Name"];

      const minProductionCrop = crops.reduce((min, crop) =>
        parseFloat(min["Crop Production (UOM:t(Tonnes))"].toString()) <
        parseFloat(crop["Crop Production (UOM:t(Tonnes))"].toString())
          ? min
          : crop
      )["Crop Name"];

      return {
        Year: year,
        maxProductionCrop,
        minProductionCrop,
      };
    }
  );

  const cropData = processedData.reduce((acc, item) => {
    const crop = item["Crop Name"];
    if (!acc[crop]) {
      acc[crop] = { totalYield: 0, totalArea: 0, count: 0 };
    }
    acc[crop].totalYield += parseFloat(
      item["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"].toString()
    );
    acc[crop].totalArea += parseFloat(
      item["Area Under Cultivation (UOM:Ha(Hectares))"].toString()
    );
    acc[crop].count += 1;
    return acc;
  }, {} as Record<string, { totalYield: number; totalArea: number; count: number }>);

  const cropAggregated: CropStats[] = Object.entries(cropData).map(
    ([crop, stats]) => ({
      "Crop Name": crop,
      avgYield: stats.totalYield / stats.count,
      avgCultivationArea: stats.totalArea / stats.count,
    })
  );

  return { yearAggregated, cropAggregated };
};
