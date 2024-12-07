import BoxHeader from '@/components/BoxHeader';
import DashboardBox from '@/components/DashboardBox'
import { useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery } from '@/state/api';
import { DataGrid } from '@mui/x-data-grid';

const Row3 = () => {
  const { data: kpiData } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();
  const { data: transactionData } = useGetTransactionsQuery();
  console.log('transactionData', transactionData);
  return (
    <>
      <DashboardBox  gridArea="g">
        <BoxHeader
          title='Product List'
          sideText={`Products: ${productData?.length}`} />
          <Box></Box>
        <DataGrid />
      </DashboardBox>
      <DashboardBox  gridArea="h"></DashboardBox>
      <DashboardBox  gridArea="i"></DashboardBox>
      <DashboardBox  gridArea="j"></DashboardBox>
    </>
  )
}

export default Row3