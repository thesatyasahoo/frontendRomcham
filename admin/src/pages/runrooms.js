import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { RunroomListResults } from '../components/runrooms/runrooms-list-results';
import { RunroomListToolbar } from '../components/runrooms/runrooms-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { customers } from '../__mocks__/customers';
import { AuthGuard } from "../contexts/auth-guard";

const Page = () => (
  <>
    <Head>
      <title>
        Runrooms | RunRoom
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
        <RunroomListToolbar/>
        <Box sx={{ mt: 3 }}>
          <RunroomListResults runrooms={customers} />
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
