import { useMemo } from "react";

type Props = {
   valueLength: number;
   value: string;
   onChange: (value: string) => void;
};

const RE_DIGIT = new RegExp(/^\d+$/);

// pass valuelength prop to maxLength will allow user to past code and allow the autocomplete logic to work.

export default function OTPInput({ value, valueLength, onChange }: Props) {
   const valueItems = useMemo(() => {
      const valueArr = value.split("");
      const items: string[] = [];

      for (let i = 0; i < valueLength; i++) {
         const char = valueArr[i];
         if (RE_DIGIT.test(char)) {
            items.push(char);
         } else {
            items.push("");
         }
      }

      return items;
   }, [value, valueLength]);

   const inputOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      const target = e.target as HTMLInputElement;

      if (e.key !== "Backspace" || target.value !== "") {
         return;
      }

      // keep the selection range
      target.setSelectionRange(0, target.value.length);

      const prevElSibiling =
         (target.previousElementSibling as HTMLInputElement) || null;

      if (prevElSibiling) {
         prevElSibiling.focus();
      }
   };

   const inputOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      const { target } = e;

      target.setSelectionRange(0, target.value.length);
   };

   const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement>,
      index: number
   ) => {
      const target = e.target;
      let targetValue = target.value;
      const isTargetValueDigit = RE_DIGIT.test(targetValue);

      if (!isTargetValueDigit && targetValue !== "") {
         return;
      }

      targetValue = isTargetValueDigit ? targetValue : " ";

      const newValue =
         value.substring(0, index) + targetValue + value.substring(index + 1);

      onChange(newValue);

      if (!isTargetValueDigit) {
         return;
      }

      const nextElementSibling =
         target.nextElementSibling as HTMLInputElement | null;

      if (nextElementSibling) {
         nextElementSibling.focus();
      }
   };

   return (
      <div className="otp-group">
         {valueItems.map((digit, idx) => (
            <input
               type="text"
               key={idx}
               value={digit}
               inputMode="numeric"
               autoComplete="one-time-code"
               onFocus={(e) => inputOnFocus(e)}
               maxLength={valueLength}
               onChange={(e) => handleInputChange(e, idx)}
               onKeyDown={(e) => inputOnKeyDown(e)}
               className="otp-input"
               pattern="\d{1}"
            />
         ))}
      </div>
   );
}
