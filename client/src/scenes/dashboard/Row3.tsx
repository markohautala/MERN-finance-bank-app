import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import { Box, Typography, useTheme } from "@mui/material";
import {
  useGetKpisQuery,
  useGetProductsQuery,
  useGetTransactionsQuery,
} from "@/state/api";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import { Cell, Pie, PieChart } from "recharts";
import FlexBetween from "@/components/FlexBetween";
import { useMemo } from "react";

const Row3 = () => {
  const { palette } = useTheme();
  const pieColors = [palette.primary[800], palette.primary[500]];

  const { data: kpiData } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();
  const { data: transactionData } = useGetTransactionsQuery();

  const pieChartData = useMemo(() => {
    if (kpiData) {
      const totalExpenses = kpiData[0].totalExpenses;
      return Object.entries(kpiData[0].expensesByCategory).map(
        ([key, value]) => {
          return [
            {
              name: key,
              value: value,
            },
            {
              name: `${key} of Total`,
              value: totalExpenses - value,
            },
          ];
        }
      );
    }
  }, [kpiData]);

  console.log("kpiData", kpiData);

  const productColumns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "expense",
      headerName: "Expense",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
  ];

  const transactionColumns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "buyer",
      headerName: "Buyer",
      flex: 0.67,
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 0.35,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: "productIds",
      headerName: "Count",
      flex: 0.1,
      renderCell: (params: GridCellParams) =>
        (params.value as Array<string>).length, // This will count the number of products in the array
    },
  ];

  return (
    <>
      <DashboardBox gridArea="g">
        <BoxHeader
          title="Product List"
          sideText={`Products: ${productData?.length}`}
        />
        <Box
          mt="0.5rem"
          p="0 0.5" // 0 padding on top and bottom, 0.5 padding on left and right
          height="75%"
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none !important",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]} !important`, // Remove the border at the bottom of each cell
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            },
            // Change the color of the up/down arrows (sorting icons)
            "& .MuiDataGrid-sortIcon": {
              color: "white !important", // This targets the sort icons (up and down arrows)
            },
            // Change the color of the three dots (more options)
            "& .MuiIconButton-root": {
              color: "white !important", // This targets the three-dot icon and other buttons
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={25} // This is the height of the header
            rowHeight={30} // This is the height of each row
            hideFooter={true} // This will hide the footer
            rows={productData || []} // This is where the data goes. || [] is a fallback in case productData is undefined
            columns={productColumns} // This is where the columns/vertical grids go
          />
        </Box>
      </DashboardBox>

      <DashboardBox gridArea="h">
        <BoxHeader
          title="Recent Orders"
          sideText={`${transactionData?.length} latest transactions`}
        />
        <Box
          mt="1rem"
          p="0 0.5rem"
          height="80%"
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            rows={transactionData || []}
            columns={transactionColumns}
          />
        </Box>
      </DashboardBox>

      <DashboardBox gridArea="i">
        <BoxHeader title="Expense Breakdown By Category" sideText="+4%" />
        <FlexBetween mt="0.5rem" gap="0.5rem" p="0 1rem" textAlign="center">
          {pieChartData?.slice(0, 3).map((data, i) => (
            <Box key={`${data[0].name}-${i}`}>
              <PieChart width={110} height={100} margin={{ bottom: 25 }}>
                <Pie
                  stroke="none"
                  data={data}
                  innerRadius={19}
                  outerRadius={31}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index]} />
                  ))}
                </Pie>
              </PieChart>
              <Typography variant="h4" mt="-25px">
                {data[0].name}
              </Typography>
            </Box>
          ))}
        </FlexBetween>
      </DashboardBox>

      <DashboardBox gridArea="j">
        <BoxHeader
          title="Overall Summary and Explanation Data"
          sideText="+15%"
        />
        <Box
          height="17px"
          margin="1.25rem 1rem 0.4rem 1rem"
          bgcolor={palette.primary[300]}
          borderRadius="1rem"
        >
          <Box
            height="17px"
            bgcolor={palette.primary[900]}
            borderRadius="1rem"
            width="40%"
          ></Box>
        </Box>
        <Typography margin="0 1rem" variant="h5">
          Lorem ipsum odor amet, consectetuer adipiscing elit. Libero elit
          euismod id feugiat litora. Adipiscing aenean risus facilisi aliquam
          parturient fermentum. Arcu phasellus rhoncus elementum; lacus integer
          fermentum et feugiat erat.
        </Typography>
      </DashboardBox>
    </>
  );
};

export default Row3;
