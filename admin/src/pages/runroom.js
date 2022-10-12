import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { RunroomCreate } from '../components/runroom/runroom-create';
import { RunroomCreateToolbar } from '../components/runroom/runroom-create-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { customers } from '../__mocks__/customers';
import { AuthGuard } from "../contexts/auth-guard";

const Page = () => (
  <>
    <Head>
      <title>
        Runroom | RunRoom
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>
        <RunroomCreateToolbar/>
        <Box sx={{ mt: 3 }}>
          <RunroomCreate runrooms={customers} />
        </Box>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => (
  <DashboardLayout>
    <AuthGuard>{page}</AuthGuard>
  </DashboardLayout>
);

export default Page;
