import { useState} from "react";
import { Stepper, Button, Group } from "@mantine/core";
import Signup from "../Signup/Signup.js";
import "../Signup/Signup.css";
import Login from "../Login/Login.js";
import "../Login/Login.css";
import OTP from "../Otp/Otp.jsx";
import "./Stepper.css";
import {
  UserCheck,
  MailOpened,
  ShieldCheck,
  CircleCheck,
} from "tabler-icons-react";

function Steppers() {


  const [active, setActive] = useState(0);
  const nextStep = (n) =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <>
      <div className="step">
        <Stepper
          completedIcon={<CircleCheck />}
          classNames={{
            content: "your-content-class",
          }}
          styles={{
            content: { fontWeight: "bold", textAlign: "center" },
          }}
          active={active}
          onStepClick={setActive}
          breakpoint="sm"
        >
          <Stepper.Step
            label="First step"
            icon={<UserCheck size={18} />}
            description="Create an account"
            allowStepSelect={active > 0}
          >
            Step 1 content: Create an account
            <Signup />
            <br />
          </Stepper.Step>
          <Stepper.Step
            label="Second step"
            icon={<MailOpened size={18} />}
            description="Verify email"
            allowStepSelect={active > 1}
          >
            Step 2 content: Verify email
            <OTP />
            <br />
          </Stepper.Step>
          <Stepper.Step
            label="Final step"
            icon={<ShieldCheck size={18} />}
            description="Login"
            allowStepSelect={active > 2}
          >
            Step 3 content: Login
            <Login />
            <br />
          </Stepper.Step>
          <Stepper.Completed  >
            Completed, click back button to get to previous step
          </Stepper.Completed>
        </Stepper>

        <Group position="center" mt="xl">
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
          <Button onClick={nextStep} id="nextbtn" className="next-btn">Next step</Button>
        </Group>
      </div>
    </>
  );
}

export default Steppers;
