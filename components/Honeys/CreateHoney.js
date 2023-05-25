import { useState } from "react";
import { createStyles, Avatar, Group, Textarea, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from '@mantine/notifications';
import { Check } from 'tabler-icons-react';

const demoUser = {
  id: "6276d0c602ce122f7b8b11ec",
  name: "Jesse Hall",
  nickname: "codestackr",
  picture:
    "https://lh3.googleusercontent.com/a-/AOh14GgPdA54bhnYcSngbZxMuSLe-khjk-BaaKWsvmxD=s96-c",
};

const useStyles = createStyles((theme) => ({
  honey: {
    padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`,
  },
  createHoney: {
    justifyContent: "center",
  },
  media: {
    width: "50vw",
    [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
      width: "25vw",
    },
  },
}));

const CreateHoney = ({ setHoneys }) => {
  const user = demoUser;
  const { classes } = useStyles();
  const form = useForm({
    initialValues: {
      honey: "",
    },
  });
  const [inputDisabled, setInputDisabled] = useState(false);

  const onSubmitHoney = async (value) => {
    setInputDisabled(true);
    const honey = {
      postedAt: Date.now(),
      body: value.honey,
      likes: [],
      user: {
        id: user.id,
        name: user.name,
        nickname: user.nickname,
        picture: user.picture,
      },
    };
    const response = await fetch("/api/honey", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(honey),
    });

    const responseJson = await response.json();
    
    setHoneys((honeys) => [
      {
        _id: responseJson.insertedId,
        ...honey
      },
      ...honeys,
    ]);
    form.reset();
    setInputDisabled(false);
    showSuccess();
  };

  const showSuccess = () => {
    showNotification({
      title: "Success",
      message: "Your honey has been sent",
      icon: <Check size={18} />,
      autoClose: 5000,
      styles: (theme) => ({
        root: {
          borderColor: theme.colors.green[6],
        }
      }),
    });
  };

  return (
    <Group position={"center"} mt={10} mb={20}>
      <Avatar src={user.picture} alt={user.name} radius="xl" />
      <form onSubmit={form.onSubmit((value) => onSubmitHoney(value))}>
        <Group>
          <Textarea
            required
            placeholder="Send a honey..."
            variant="filled"
            className={classes.media}
            {...form.getInputProps("honey")}
          />
          <Button type="submit" disabled={inputDisabled}>Send</Button>
        </Group>
      </form>
    </Group>
  );
};

export default CreateHoney;
