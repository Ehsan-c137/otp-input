import OtpInput from "./components/OtpInput";
import "./App.css";
import { useState } from "react";

function App() {
   const [otp, setOtp] = useState("");
   const onChange = (value: string) => setOtp(value);

   return (
      <div className="container">
         <OtpInput valueLength={6} value={otp} onChange={onChange} />
      </div>
   );
}

export default App;
