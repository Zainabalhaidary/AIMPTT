import { StyleSheet } from "react-native";
import { yellow, black } from "./colors";
import { responsiveHeight, responsiveWidth } from "../src/components/react-native-responsive-dimensions";

const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: yellow,
    },
    black: {
        color: black
    },
    aimHeaderLogo: {
        width: responsiveHeight(5),
        aspectRatio: 1,
        marginLeft: responsiveWidth(3)
    }
});
export default styles;
