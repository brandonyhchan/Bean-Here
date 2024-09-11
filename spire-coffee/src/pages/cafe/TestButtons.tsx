import React, { useState } from "react";
import CustomButton from "../../component/CustomButton";

const TestButtons = () => {
  const [loading, setLoading] = useState(false);

  // Simulate a click action with loading
  const handleClick = async () => {
    setLoading(true); // Start loading
    try {
      // Simulate an async operation like an API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // Perform any additional actions here after successful response
      alert("Action completed successfully!");
    } catch (error) {
      // Handle error
      console.error("Error occurred:", error);
    } finally {
      setLoading(false); // End loading, ensuring this runs after the operation
    }
  };

  return (
    <React.Fragment>
      <h1>Hello world, this is the favourites page</h1>

      {/* Test Regular Button */}
      <CustomButton color="primaryOpposite" text="small opposite" size="small" />
      <CustomButton color="secondary" text="small" size="small"/>
      <CustomButton variant="outlined" text="medium" size="medium"/>
      <CustomButton text="largeWidth" size="large" type="largeWidth"/>

      {/* Test Icon Buttons */}
      <CustomButton isIconButton icon="favorite" color="secondary" />
      <CustomButton isIconButton icon="delete" />
      <CustomButton isIconButton icon="edit" />
      <CustomButton isIconButton icon="check" />

      {/* Test Loading Button */}
      <CustomButton 
        text="loading button" 
        onClick={handleClick} 
        loading={loading} // Use loading prop to show spinner
        size="large" 
        variant="contained"
      />
    </React.Fragment>
  );
};

export default TestButtons;