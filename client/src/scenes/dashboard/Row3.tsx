import BoxHeader from '@/components/BoxHeader';
import DashboardBox from '@/components/DashboardBox'
import { Box, Typography, useTheme } from "@mui/material";
import { useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery } from '@/state/api';
import { DataGrid, GridCellParams } from '@mui/x-data-grid';
import { Cell, Pie, PieChart } from 'recharts';
import FlexBetween from '@/components/FlexBetween';
import { useMemo } from "react";

const Row3 = () => {
  const { palette } = useTheme();
  const pieColors = [palette.primary[800], palette.primary[500]];

  const { data: kpiData } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();
  const { data: transactionData } = useGetTransactionsQuery();

  const pieChartData = useMemo(() => {
    if (kpiData && kpiData[0]?.expensesByCategory) {
      const totalExpenses = kpiData[0].totalExpenses || 0;
      return Object.entries(kpiData[0].expensesByCategory).map(
        ([key, value]) => {
          const expenseValue = value || 0; // Ensure value is a number
          return [
            {
              name: key,
              value: expenseValue,
            },
            {
              name: `${key} of Total`,
              value: totalExpenses - expenseValue,
            },
          ];
        }
      );
    }
    return []; // Return an empty array if data is unavailable
  }, [kpiData]);

console.log("kpiData", kpiData)

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
        (params.value as Array<string>).length,  // This will count the number of products in the array
    },
  ];

  return (
    <>
      <DashboardBox  gridArea="g">
        <BoxHeader
          title='Product List'
          sideText={`Products: ${productData?.length}`} />
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
                color: "white !important",  // This targets the sort icons (up and down arrows)
              },
              // Change the color of the three dots (more options)
              "& .MuiIconButton-root": {
                color: "white !important",  // This targets the three-dot icon and other buttons
              },
            }}
          >
            <DataGrid
              columnHeaderHeight={25}  // This is the height of the header
              rowHeight={30}  // This is the height of each row
              hideFooter={true}  // This will hide the footer
              rows={productData || []}  // This is where the data goes. || [] is a fallback in case productData is undefined
              columns={productColumns}  // This is where the columns/vertical grids go
            />
          </Box>
      </DashboardBox>
      <DashboardBox  gridArea="h">
      <BoxHeader
          title='Most Recent Transactions'
          sideText={`${transactionData?.length} latest transactions`} />
          <Box
            mt="1rem"
            p="0 0.5" // 0 padding on top and bottom, 0.5 padding on left and right
            height="80%"
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
                color: "white !important",  // This targets the sort icons (up and down arrows)
              },
              // Change the color of the three dots (more options)
              "& .MuiIconButton-root": {
                color: "white !important",  // This targets the three-dot icon and other buttons
              },
            }}
          >
            <DataGrid
              columnHeaderHeight={25}  // This is the height of the header
              rowHeight={30}  // This is the height of each row
              hideFooter={true}  // This will hide the footer
              rows={transactionData || []}  // This is where the data goes. || [] is a fallback in case productData is undefined
              columns={transactionColumns}  // This is where the columns/vertical grids go
            />
          </Box>
      </DashboardBox>
      <DashboardBox  gridArea="i">
        <BoxHeader title="Expense Breakdown By Category" sideText="+4%" />
        <FlexBetween
          mt="0.5rem"
          gap="0.5rem"
          p="0 1rem"
          textAlign="center"
        >
          {pieChartData?.map((data, i) => (
            <Box key={`${data[0].name}-${i}`}>
              <PieChart width={110} height={100}>
                <Pie
                  stroke="none"
                  data={data}
                  innerRadius={18}
                  outerRadius={35}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index]} />
                  ))}
                </Pie>
              </PieChart>
              <Typography variant="h5">{data[0].name}</Typography>
            </Box>
          ))}
        </FlexBetween>
      </DashboardBox>
      <DashboardBox  gridArea="j"></DashboardBox>
    </>
  )
}

export default Row3