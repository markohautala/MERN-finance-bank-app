import BoxHeader from '@/components/BoxHeader';
import DashboardBox from '@/components/DashboardBox'
import { Box, useTheme } from "@mui/material";
import { useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery } from '@/state/api';
import { DataGrid, GridCellParams } from '@mui/x-data-grid';

const Row3 = () => {
  const { palette } = useTheme();
  const { data: kpiData } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();
  const { data: transactionData } = useGetTransactionsQuery();
  const productColumns = [
    {
      field: "_id",  // This is the key of the data
      headerName: "ID",  // This is the header of the column
      flex: 1,  // This column will take up 1 times the space of the other columns
    },
    {
      field: "expense",  // This is the key of the data
      headerName: "Expense",  // This is the header of the column
      flex: 0.5,  // This column will take up 0.5 times the space of the other columns
      renderCell: (params: GridCellParams) => `$${params.value}`,  // This is a function that will render the cell. In this case, it will add a $ sign in front of the value
    },
    {
      field: "price",  // This is the key of the data
      headerName: "Price",  // This is the header of the column
      flex: 0.5,  // This column will take up 0.5 times the space of the other columns
      renderCell: (params: GridCellParams) => `$${params.value}`,  // This is a function that will render the cell. In this case, it will add a $ sign in front of the value
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
                borderBottom: "none !important", // Remove the border at the bottom of each cell
              },
              "& .MuiDataGrid-columnHeaders": {
                borderBottom: `1px solid ${palette.grey[800]} !important`,
              },
              "& .MuiDataGrid-columnSeparator": {
                display: "none",
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
      <DashboardBox  gridArea="h"></DashboardBox>
      <DashboardBox  gridArea="i"></DashboardBox>
      <DashboardBox  gridArea="j"></DashboardBox>
    </>
  )
}

export default Row3