import { Button } from '@heroui/button';
import { Form } from '@heroui/form';
import { Input } from '@heroui/input';
import React from 'react'

const Register = () => {
    const [action, setAction] = React.useState(null);

    return (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <h2>please Register</h2>
            <Form
                className="w-full max-w-xs flex flex-col gap-4"
                validationBehavior="native"
                onSubmit={(e) => {
                    e.preventDefault();
                    let data = Object.fromEntries(new FormData(e.currentTarget));
                    console.log(data)
                }}
            >
                <Input
                    isRequired
                    errorMessage="Please enter a valid username"
                    label="Username"
                    labelPlacement="outside"
                    name="username"
                    placeholder="Enter your username"
                    type="text"
                />

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
                    errorMessage="Please enter a valid email"
                    label="Age"
                    labelPlacement="outside"
                    name="age"
                    placeholder="Enter your age"
                    type="number"
                />
                <Input
                    // isRequired
                    errorMessage="Provide a profile picture"
                    label="Img"
                    labelPlacement="outside"
                    name="profileImg"
                    placeholder="Enter your img"
                    type="file"
                />

                <Input
                    isRequired
                    errorMessage="Please enter a password"
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
    )
}

export default Register
