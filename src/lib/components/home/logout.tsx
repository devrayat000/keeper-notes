import { Button } from "@mantine/core";
import { graphql, useMutation } from "react-relay";
import { useNavigate } from "react-router-dom";

const LOGOUT_MUTATION = graphql`
  mutation logoutMutation {
    logout {
      id
    }
  }
`;

function Logout() {
  const navigate = useNavigate();
  const [logout, isInFlight] = useMutation(LOGOUT_MUTATION);

  function logoutHandler() {
    logout({
      variables: {},
      onCompleted(response, errors) {
        navigate("/login");
      },
    });
  }

  return (
    <Button
      type="button"
      variant="outline"
      loading={isInFlight}
      onClick={logoutHandler}
    >
      Log out
    </Button>
  );
}

export default Logout;
