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
    genericText: {
        fontSize: responsiveFontSize(1.87)
    },
    homepageRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: responsiveHeight(1),
        width: responsiveWidth(90),
        paddingHorizontal: responsiveWidth(10)
    }
});
export default styles;
