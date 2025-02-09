import React from "react";
import { Form } from "@heroui/form";
import { Button } from "@heroui/button"
import { Input } from "@heroui/input"
import { useNavigate } from "react-router-dom";

export default function LogIn() {
  const [action, setAction] = React.useState(null);
  const navigate = useNavigate();

  return (

    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <Form
        className="w-full max-w-xs flex flex-col gap-4"
        validationBehavior="native"
        onSubmit={(e) => {
          e.preventDefault();
          let data = Object.fromEntries(new FormData(e.currentTarget));
          console.log(data)
          navigate("/userHome")
        }}
      >


        <Input
          isRequired
          errorMessage="Please enter a valid email"
          label="Email"
          labelPlacement="outside"
          name="email"
          placeholder="Enter your email"
          type="email"
        />

        <Input
          isRequired
          errorMessage="Please enter a valid username"
          label="Password"
          labelPlacement="outside"
          name="password"
          placeholder="Enter your password"
          type="password"
        />
        <div className="flex gap-2">
          <Button color="primary" type="submit">
            Submit
          </Button>
        </div>
        {action && (
          <div className="text-small text-default-500">
            Action: <code>{action}</code>
          </div>
        )}
      </Form>
    </section>

  );
}
