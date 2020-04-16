import { StyleSheet } from "react-native";
import { yellow, black, noonColor, sunriseColor } from "./colors";
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
    smallText: {
        fontSize: responsiveFontSize(1.5)
    },
    homepageRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: responsiveHeight(1),
        width: responsiveWidth(90),
        paddingHorizontal: responsiveWidth(10)
    },
    scrollView: {
        flex: 1,
    },
    monthColumn: {
        width: responsiveWidth(15),
        backgroundColor: noonColor,
        flexDirection: 'column',
        // justifyContent: 'space-between',
        alignItems: 'center',
        margin: responsiveHeight(1),
        paddingHorizontal: responsiveWidth(0.5),
        paddingBottom: responsiveHeight(3)
    },
    monthCellWithoutColor: {
        // backgroundColor: sunriseColor,
        width: '100%',
        height: '11%',
        alignItems: 'center',
        justifyContent: 'center',
        // borderWidth:1
    },
    monthCell: {
        backgroundColor: sunriseColor,
        width: '100%',
        height: '11%',
        alignItems: 'center',
        justifyContent: 'center',
        // borderWidth:1
    },
    picker:{
        height:responsiveHeight(10),
        width: responsiveWidth(40),
        justifyContent:'center',
        alignItems:'center'
    }
});
export default styles;
