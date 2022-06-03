import { Burger, Header, MediaQuery, Title } from "@mantine/core";

const MyHeader = () => {
  return (
    <Header height={70} p="md">
      <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Burger
            opened={false}
            // onClick={}
            size="sm"
            // color={theme.colors.gray[6]}
            mr="xl"
          />
        </MediaQuery>

        <Title order={4}>Application header</Title>
      </div>
    </Header>
  );
};

export default MyHeader;
