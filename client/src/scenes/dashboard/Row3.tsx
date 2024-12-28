import BoxHeader from "@/components/BoxHeader"; // Importing the BoxHeader component
import DashboardBox from "@/components/DashboardBox"; // Importing the DashboardBox component
import { Box, Typography, useTheme } from "@mui/material"; // Importing necessary components from Material UI
import LoadingWrapper from "@/components/LoadingWrapper"; // Importing a component to show loading state
import {
  useGetKpisQuery,
  useGetProductsQuery,
  useGetTransactionsQuery,
} from "@/state/api"; // Importing hooks to fetch data from the API
import { DataGrid, GridCellParams } from "@mui/x-data-grid"; // Importing DataGrid to display tables
import { Cell, Pie, PieChart } from "recharts"; // Importing PieChart components for pie chart visualizations
import FlexBetween from "@/components/FlexBetween"; // Importing FlexBetween component for flex layout
import { useMemo } from "react"; // Importing useMemo to memoize expensive calculations

const Row3 = () => {
  const { palette } = useTheme(); // Using the theme to access color palette
  const pieColors = [palette.primary[800], palette.primary[500]]; // Defining colors for the pie chart

  // Fetching data using custom API hooks
  const { data: kpiData } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();
  const { data: transactionData } = useGetTransactionsQuery();

  // Memoizing pie chart data based on KPI data
  const pieChartData = useMemo(() => {
    if (kpiData) {
      const totalExpenses = kpiData[0].totalExpenses; // Getting the total expenses from the data
      // Mapping through expensesByCategory and preparing data for the pie chart
      return Object.entries(kpiData[0].expensesByCategory).map(([key, value]) => {
        return [
          {
            name: key, // Category name
            value: value, // Expense amount for that category
          },
          {
            name: `${key} of Total`, // Label for the remainder
            value: totalExpenses - value, // Remaining amount after subtracting the category value
          },
        ];
      });
    }
  }, [kpiData]); // This will recalculate when kpiData changes

  console.log("kpiData", kpiData); // Logging kpiData for debugging

  // Columns for displaying product data in the DataGrid
  const productColumns = [
    {
      field: "_id", // Column for product ID
      headerName: "ID", // Header for the column
      flex: 1, // Allow the column to flex and fill available space
    },
    {
      field: "expense", // Column for expense value
      headerName: "Expense", // Header for the column
      flex: 0.5, // This column will take up half the space
      renderCell: (params: GridCellParams) => `$${params.value}`, // Format the expense as currency
    },
    {
      field: "price", // Column for product price
      headerName: "Price", // Header for the column
      flex: 0.5, // This column will take up half the space
      renderCell: (params: GridCellParams) => `$${params.value}`, // Format the price as currency
    },
  ];

  const transactionColumns = [
    {
      field: "_id", // Column for transaction ID
      headerName: "ID", // Header for the column
      flex: 1, // Flex column to take available space
    },
    {
      field: "buyer", // Column for buyer name
      headerName: "Buyer", // Header for the column
      flex: 0.6, // Column takes up 2/3 of the space
    },
    {
      field: "amount", // Column for transaction amount
      headerName: "Amount", // Header for the column
      flex: 0.6, // Increase space allocated for the Amount column
      minWidth: 120, // Set a minimum width to ensure it doesn't get too narrow
      renderCell: (params: GridCellParams) => `$${params.value}`, // Format the amount as currency
    },
    {
      field: "productIds", // Column for product count in the transaction
      headerName: "Count", // Header for the column
      flex: 0.42, // Reduce space for Count column slightly
      renderCell: (params: GridCellParams) =>
        (params.value as Array<string>).length, // Display the number of products in the transaction
    },
  ];


  return (
    <>
      {/* First Dashboard Box for Product List */}
      <DashboardBox gridArea="g">
        <LoadingWrapper>
          <BoxHeader
            title="Product List" // Title for the section
            sideText={`Products: ${productData?.length}`} // Display the count of products
          />
          <Box
            mt="0.5rem" // Margin top
            p="0 0.5" // Padding left and right
            height="70%" // Set height of the box
            sx={{
              // Custom styles for DataGrid
              "& .MuiDataGrid-root": {
                color: palette.grey[300], // Set text color for DataGrid
                border: "none !important", // Remove grid borders
              },
              "& .MuiDataGrid-cell": {
                borderBottom: `1px solid ${palette.grey[800]} !important`, // Style for cell borders
              },
              "& .MuiDataGrid-columnHeaders": {
                borderBottom: `1px solid ${palette.grey[800]} !important`, // Style for column headers
              },
              "& .MuiDataGrid-columnSeparator": {
                visibility: "hidden", // Hide the column separators
              },
              "& .MuiDataGrid-sortIcon": {
                color: "white !important", // Style sort icons
              },
              "& .MuiIconButton-root": {
                color: "white !important", // Style buttons
              },
            }}
          >
            <DataGrid
              columnHeaderHeight={25} // Set height for column headers
              rowHeight={30} // Set height for rows
              hideFooter={true} // Hide the footer
              rows={productData || []} // Display product data or empty if undefined
              columns={productColumns} // Use defined columns for the table
            />
          </Box>
        </LoadingWrapper>
      </DashboardBox>

      {/* Second Dashboard Box for Recent Orders */}
      <DashboardBox gridArea="h">
        <LoadingWrapper>
          <BoxHeader
            title="Recent Orders" // Title for the section
            sideText={`${transactionData?.length} latest transactions`} // Display the count of transactions
          />
          <Box
            mt="0.5rem" // Margin top
            p="0 0.5" // Padding left and right
            height="77%" // Set height of the box
            sx={{
              "& .MuiDataGrid-root": {
                color: palette.grey[300], // Set text color for DataGrid
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: `1px solid ${palette.grey[800]} !important`, // Style for cell borders
              },
              "& .MuiDataGrid-columnHeaders": {
                borderBottom: `1px solid ${palette.grey[800]} !important`, // Style for column headers
              },
              // Change the color of the up/down arrows (sorting icons)
              "& .MuiDataGrid-sortIcon": {
                color: "white !important", // This targets the sort icons (up and down arrows)
              },
              "& .MuiDataGrid-columnSeparator": {
                visibility: "hidden", // Hide the column separators
              },
              // Change the color of the three dots (more options)
              "& .MuiIconButton-root": {
                color: "white !important", // This targets the three-dot icon and other buttons
              },
            }}
          >
            <DataGrid
              columnHeaderHeight={25} // Set height for column headers
              rowHeight={35} // Set height for rows
              hideFooter={true} // Hide the footer
              rows={transactionData || []} // Display transaction data or empty if undefined
              columns={transactionColumns} // Use defined columns for the table
            />
          </Box>
        </LoadingWrapper>
      </DashboardBox>

      {/* Third Dashboard Box for Expense Breakdown By Category */}
      <DashboardBox
        gridArea="i"
        sx={{
          maxWidth: "100%", // Ensure the box does not exceed the container width
          height: "100%", // Ensure the height is constrained
          overflow: "hidden", // Optional, if you want to hide overflow
        }}
      >
        <LoadingWrapper>
          <BoxHeader title="Expense Breakdown By Category" sideText="+4%" />
          <FlexBetween mt="0.5rem" gap="0.5rem" p="0 1rem" textAlign="center">
            {pieChartData?.slice(0, 3).map((data, i) => (
              <Box key={`${data[0].name}-${i}`}>
                <PieChart width={110} height={100} margin={{ bottom: 25 }}>
                  <Pie
                    stroke="none" // Remove stroke around the pie chart
                    data={data} // Pass the data for the pie chart
                    innerRadius={19} // Inner radius for the donut chart
                    outerRadius={31} // Outer radius for the donut chart
                    paddingAngle={2} // Padding between slices
                    dataKey="value" // Key to map data for the chart
                  >
                    {data.map((_entry, index) => (
                      <Cell key={`cell-${index}`} fill={pieColors[index]} /> // Color each pie slice
                    ))}
                  </Pie>
                </PieChart>
                <Typography variant="h4" mt="-27px">
                  {data[0].name} {/* Label for the pie chart */}
                </Typography>
              </Box>
            ))}
          </FlexBetween>
        </LoadingWrapper>
      </DashboardBox>

      {/* Fourth Dashboard Box for Overall Summary */}
      <DashboardBox gridArea="j">
        <LoadingWrapper>
          <BoxHeader
            title="Overall Summary and Explanation Data" // Title for the section
            sideText="+15%" // Side text with some value
          />
          <Box
            height="17px"
            margin="1.25rem 1rem 0.4rem 1rem"
            bgcolor={palette.primary[300]} // Background color for progress bar
            borderRadius="1rem" // Rounded corners for the bar
          >
            <Box
              height="17px"
              bgcolor={palette.primary[900]} // Color for the progress bar itself
              borderRadius="1rem"
              width="40%" // Set the width of the progress bar to 40%
            ></Box>
          </Box>
          <Typography margin="0 1rem" variant="h5">
            Lorem ipsum odor amet, consectetuer adipiscing elit. {/* Placeholder text */}
          </Typography>
        </LoadingWrapper>
      </DashboardBox>
    </>
  );
};

export default Row3; // Exporting the Row3 component to be used elsewhere in the app
