import React, { useEffect } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
const Alan = (props) => {
  useEffect(() => {
    alanBtn({
      key: "86d84ca509e7179405188e918f12171a2e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand: (commandData) => {
        if (commandData.command === "go:back") {
          // Call the client code that will react to the received command
        }
      },
    });
  }, []);
};
export default Alan;
