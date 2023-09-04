import { FC, useState } from "react";
import "@aws-amplify/ui-react/styles.css";
import {
  Flex,
  Menu,
  MenuItem,
  TextField,
  View,
  withAuthenticator,
  WithAuthenticatorProps,
} from "@aws-amplify/ui-react";
import OpenAI from "openai";

const configuration = {
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  organization: import.meta.env.VITE_OPENAI_ORG_ID,
  dangerouslyAllowBrowser: true,
};

const openai = new OpenAI(configuration);

const App: FC<WithAuthenticatorProps> = ({ signOut }) => {
  const [rap, setRap] = useState("");

  const getRap = async (prompt: string) => {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You will be given a prompt and your job is to respond in rap",
        },
        { role: "user", content: prompt },
      ],
      max_tokens: 528,
      n: 1,
      stop: null,
      temperature: 0.8,
    });

    console.log(response);
    setRap(response.choices[0].message.content as string);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const form = new FormData(event.target);
    const prompt = form.get("prompt") as string;

    getRap(prompt);

    event.target.reset();
  };

  return (
    <Flex justifyContent="center" alignItems="center">
      <View width="30rem">
        <Flex gap="5rem" direction="column">
          <View>
            <Menu menuAlign="start">
              <MenuItem onClick={signOut}>Sign Out</MenuItem>
            </Menu>
          </View>

          <View as="form" onSubmit={handleSubmit}>
            <TextField
              name="prompt"
              placeholder="type here"
              label="Prompt"
              labelHidden
              required
            />
          </View>

          <View>
            <View as="span">{rap}</View>
          </View>
        </Flex>
      </View>
    </Flex>
  );
};

export default withAuthenticator(App);
