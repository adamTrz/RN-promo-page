import React, {Component} from 'react';
import {
    Animated, Image, View, StyleSheet, Dimensions, Text, TouchableOpacity,
} from 'react-native'

import {BlobItem, Paragraph} from './components/Blob'
import colors from './colors'
import c from './constants'

const {width, height} = Dimensions.get('window')

const Trophies = ({anim}) => {
    return (
        <Wrapper>
            <BlobItem color={colors.blue_lighter} width={width*0.3}
                style={styles.blob} />
            <FirstRow anim={anim}/>
            <SecondRow anim={anim}/>
            <ThirdRow anim={anim}/>
        </Wrapper>
    )
}
export default Trophies

const FirstRow = ({anim}) => {
    let animStyle = {
        width: anim.interpolate({
            inputRange: [c.trophiesAnimStartOne, c.trophiesAnimStartOne+200],
            outputRange: [width*2, width],
            extrapolate: 'clamp'
        })
    }
    const blobWidth = width*0.4
    return (
        <RowWrapper animStyle={animStyle}>
            <Image source={require('./images/ribbon.png')}
                style={{resizeMode: 'contain',width: blobWidth}}
                />
            <ParagraphOne width={blobWidth}/>
        </RowWrapper>
    )
}
const SecondRow = ({anim}) => {
    const blobWidth = width*0.4
    let animStyle = {
        width: anim.interpolate({
            inputRange: [c.trophiesAnimStartOne+200,
                c.trophiesAnimStartOne+400],
            outputRange: [width*2, width],
            extrapolate: 'clamp'
        })
    }
    return (
        <RowWrapper animStyle={animStyle}>
            <ParagraphOne width={blobWidth}/>
            <Image source={require('./images/trophy.png')}
                style={{resizeMode: 'contain', width: blobWidth}}
                />
        </RowWrapper>
    )
}
const ThirdRow = ({anim}) => {
    const blobWidth = width*0.4
    let animStyle = {
        width: anim.interpolate({
            inputRange: [c.trophiesAnimStartOne+400,
                c.trophiesAnimStartOne+700],
            outputRange: [width*2, width],
            extrapolate: 'clamp'
        })
    }
    return (
        <RowWrapper animStyle={animStyle}>
            <Image source={require('./images/ribbon.png')}
                style={{resizeMode: 'contain', width: blobWidth}}
                />
            <ParagraphOne width = {blobWidth}/>
        </RowWrapper>
    )
}


const ParagraphOne = ({width=width*0.4}) => {
    return (
        <Paragraph wrapperStyle={styles.paragraphOne}
            blobWidth = {width} color = {colors.blue_lighter}
            config = {[[0.6, 0.3], [0.8], [0.55, 0.25], [0.3, 0.55],[0.6], [0.7]]}
            lineGap = {10}
            />
    )
}

const Wrapper = ({children}) => (
    <View style={styles.container} >
        <View style={styles.skewed} />
        {children}
    </View>
)

const RowWrapper = ({animStyle, children}) => (
    <Animated.View style={[{
            flexDirection: 'row', marginTop: 90,
            justifyContent: 'space-around', alignItems: 'center'
        }, animStyle]}>
        {children}
    </Animated.View>
)

const styles = StyleSheet.create({
    container: {
        height: c.trophiesHeight,
        width: width,
        backgroundColor: colors.trophies_bg_light,
        alignItems: 'center',
    },
    skewed: {
        position: 'absolute',
        backgroundColor: colors.trophies_bg_dark,
        top: -c.trophiesHeight/2,
        left: width/2, right: -width/2,
        bottom: -c.trophiesHeight/2,
        transform: [{
            rotate: '10deg'
        }]
    },
    blob: {
        position: 'absolute', top: 30,
        left: width/2-(width*0.3)/2
    },
    paragraphWrapper: {
        width: width*0.5, justifyContent: 'center'
    },
    paragraphOne: {
        alignItems: 'flex-start',
        justifyContent: 'center'
    }
})
