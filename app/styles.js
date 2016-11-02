import {StyleSheet, Dimensions} from 'react-native'
import colors from './colors'

const {width, height} = Dimensions.get('window')
const styles = StyleSheet.create({
    header: {
        backgroundColor: colors.blue
    },
    logoStyle: {
        position: 'absolute', top: 30,
        backgroundColor: 'white',
        justifyContent: 'center', alignItems: 'center',
        elevation: 5
    },

})
