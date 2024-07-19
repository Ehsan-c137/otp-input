type Props = {
   valueLength: number;
   value: string;
   onChange: (value: string) => void;
};

export default function OTPInput({ value, valueLength, onChange }: Props) {
   return (
      <div className="otp-group">
         {[1, 2, 4, 5, 6].map((digit, idx) => (
            <input
               type="text"
               key={idx}
               value={digit}
               inputMode="numeric"
               autoComplete="one-time-code"
               maxLength={valueLength}
               className="otp-input"
               pattern="\d{1}"
            />
         ))}
      </div>
   );
}
