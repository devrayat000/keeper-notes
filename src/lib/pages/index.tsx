import { Container, Title } from "@mantine/core";

function HomePage() {
  return (
    <Container>
      <Title order={1}>Keeper Notes</Title>

      {/* <ErrorBoundary fallbackRender={({ error }) => <>{error.message}</>}>
        <Suspense fallback="Loading...">
          <User />
        </Suspense>
      </ErrorBoundary> */}
    </Container>
  );
}

// const QUERY = gql`
//   query Me {
//     me {
//       id
//       email
//     }
//   }
// `;

// function User() {
//   const [{ data }] = useQuery({ query: QUERY, context: { suspense: true } });
//   return <Text component="pre">{JSON.stringify(data?.me, null, 2)}</Text>;
// }

export default HomePage;
