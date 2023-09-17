import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";
import { Text } from "@shopify/react-native-skia";
import { useFontsContext } from "src/contexts/fonts";

const useNumber = (height: number, name: MESSAGE_CONTACT_NAME) => {
  const font = useFontsContext().fonts.HelveticaNeue;

  const middle = height / 2;

  return (
    <Text
      x={30}
      y={middle + font.getSize() / 3}
      text={name}
      color="Blue"
      font={font}
    />
  );
};

export default useNumber;
