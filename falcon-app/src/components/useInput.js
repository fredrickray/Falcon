import { useState } from "react";

const useInput = () => {
    const [showInputField, setShowInputField] = useState (false);
    const [showSecondInput, setShowSecondInput] = useState (false);
    const [showThirdInput, setShowThirdInput] = useState (false);

    const toggleInputs = () => {
        if (!showSecondInput) {
          setShowSecondInput (true);
        } else if (!showThirdInput) {
          setShowThirdInput (true);
        }
      };
    
      const trashInput = () => {
        setShowInputField(false)
      }
      const trashSecondInput = () => {
        setShowSecondInput (false)
      }
    
      const trashThirdInput = () => {
        setShowThirdInput (false);
      }
    return {showInputField, showSecondInput, showThirdInput};
}
 
export default useInput;