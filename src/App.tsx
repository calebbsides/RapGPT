import { FC } from "react";
import "@aws-amplify/ui-react/styles.css";
import {
  withAuthenticator,
  Button,
  Heading,
  View,
  Card,
  WithAuthenticatorProps,
} from "@aws-amplify/ui-react";

const App: FC<WithAuthenticatorProps> = ({ signOut }) => {
  return (
    <View className="App">
      <Card>
        <Heading level={1}>We now have Auth!</Heading>
      </Card>
      <Button onClick={signOut}>Sign Out</Button>
    </View>
  );
};

export default withAuthenticator(App);
