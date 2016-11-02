import React, {Component} from 'react';
import {
    Animated, View, ScrollView, StatusBar,  StyleSheet, Dimensions, Text
} from 'react-native'

import {BlobItem, Paragraph} from '../components/Blob'
import Phone from './Phone'
import {Background} from '../Header'
import colors from '../colors'
import c from '../constants'

const {width, height} = Dimensions.get('window')

const PhoneWrapper = ({anim}) => (
    <View style={styles.container}>
        <BlobItem style={styles.firstBlob}/>
        <ParagraphOne anim={anim} />
        <ParagraphTwo anim={anim} />
        <ParagraphOne anim={anim} />
        <Phone anim={anim} />
    </View>
)

export default PhoneWrapper

const ParagraphOne = ({anim}) => {
    const blobWidth = width*0.4
    let animStyle = {
        transform: [{translateX: anim.interpolate({
            inputRange: [0, c.headerHeight],
            outputRange: [width/2, 0],
            extrapolate: 'clamp'
        })}],
        opacity: anim.interpolate({
            inputRange: [0, c.headerHeight-100, c.headerHeight],
            outputRange: [1, 1, 0.4],
            extrapolate: 'clamp'
        })
    }
    return (
        <Paragraph wrapperStyle={styles.paragraphOne} animStyle = {animStyle}
            blobWidth = {blobWidth} color = {colors.blue_lighter}
            config = {[[0.6, 0.3], [1], [0.5, 0.4], [0.3, 0.6]]}
            />
    )
}

const ParagraphTwo = ({anim}) => {
    const blobWidth = width*0.4
    let animStyle = {
        transform: [{translateX: anim.interpolate({
            inputRange: [0, c.headerHeight],
            outputRange: [width/2, 0],
            extrapolate: 'clamp'
        })}],
        opacity: anim.interpolate({
            inputRange: [0, c.headerHeight-100, c.headerHeight],
            outputRange: [1, 1, 0.4],
            extrapolate: 'clamp'
        })
    }
    return (
        <Paragraph wrapperStyle={styles.paragraphTwo} animStyle = {animStyle}
            blobWidth = {blobWidth} color = {colors.blue_lighter}
            config = {[[0.5], [0.7], [0.6, 0.3], [0.8]]}
            />
    )
}

const styles = StyleSheet.create({
    container: {
        width: width, height: c.phoneWrapperHeight,
        alignItems: 'center', justifyContent: 'flex-start',
        backgroundColor: colors.whiteish,
    },
    firstBlob: {
        width: width*0.3,
        backgroundColor: colors.blue_lighter,
        marginTop: 30,
    },
    paragraphOne: {
        alignItems: 'center',
        marginTop: 100,
    },
    paragraphTwo: {
        alignItems: 'flex-start',
        marginTop: 50,
    }
})
