import { StyleSheet } from "react-native";
import { yellow, black } from "./colors";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "../src/components/react-native-responsive-dimensions";

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
    },
    backgroundStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center'
    },
    textFont: {
        fontSize: responsiveFontSize(2.9),
    },
});
export default styles;
