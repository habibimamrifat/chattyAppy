import { Form } from "@heroui/form";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { useNavigate } from "react-router-dom";
import apiRequest from "@/hooks/apiRequests";

export default function LogIn() {
  const navigate = useNavigate();

  // Correct the event type, using `React.FormEvent` for the form
  const handleLogIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Grab form data
    const formData = new FormData(e.currentTarget);
    // console.log("fd",formData)
    const data = Object.fromEntries(formData.entries()) as { [key: string]: string };
    // console.log(data);

    try {

      const response = await apiRequest("/auth/logIn", "post", data);
      console.log("Login response:", response);

      const { message, ...credentials } = response;
      localStorage.setItem("chattyappyCredentials", JSON.stringify(credentials));

      navigate("/userHome");
    } 
    catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <Form
        className="w-full max-w-xs flex flex-col gap-4"
        validationBehavior="native"
        onSubmit={handleLogIn} // Pass the handler function directly
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
          errorMessage="Please enter a valid password"
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
      </Form>
    </section>
  );
}
