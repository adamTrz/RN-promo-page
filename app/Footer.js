import React, {Component} from 'react';
import {
    Animated, Image, View, StyleSheet, Dimensions, Text, TouchableOpacity,
} from 'react-native'

import {BlobItem, Paragraph} from './components/Blob'
import colors from './colors'
import c from './constants'

const {width, height} = Dimensions.get('window')

const Footer = ({anim, scrollToTop}) => {
    return (
        <View>
            <CartBtn anim={anim}/>
            <FooterBtn anim={anim} scrollToTop={scrollToTop} />
        </View>
    )
}
export default Footer

const FooterBtn = ({anim, scrollToTop}) => {
    let animStyle = {
        height: anim.interpolate({
            inputRange: [c.headsAnimStart+400, c.headsAnimStart+450],
            outputRange: [10, c.footerBtnHeight],
            extrapolate: 'clamp'
        })
    }
    return (
        <Animated.View style={[styles.footerBtn, animStyle]}>
            <View style={{width: width/2, justifyContent: 'center', alignItems: 'center'}}>
                <Paragraph wrapperStyle={styles.footerParagraph}
                    blobWidth={width*0.4}
                    config={[[1],[0.45,0.45], [0.6]]} color={colors.blue}
                    />
            </View>
            <RoundBtn color={colors.blue} text={'i'} />
            <RoundBtn color={colors.trophies_bg_dark} text={"\u2303"}
                textStyle={{marginTop: 12}} onPress={scrollToTop}/>
        </Animated.View>
    )
}

const RoundBtn = ({onPress, color, text, textStyle}) => (
    <View style={[styles.footerRoundBtn, {backgroundColor: color}]}>
        <TouchableOpacity onPress={onPress}
            style={styles.footerRoundBtn}>
            <Text style={[styles.btnFont, textStyle]}>
                {text}
            </Text>
        </TouchableOpacity>
    </View>
)

const CartBtn = ({anim}) => {
    let animStyle = {
        height: anim.interpolate({
            inputRange: [c.headsAnimStart+300, c.headsAnimStart+400],
            outputRange: [10, c.cartBtnHeight],
            extrapolate: 'clamp'
        })
    }
    return (
        <Animated.View style={[animStyle]}>
            <TouchableOpacity style={styles.cartBtn}>
                <Image source={require('./images/cart.png')}
                    style={{width: 25, height: 24, opacity: 0.8}}/>
            </TouchableOpacity>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    cartBtn: {
        flex: 1,
        backgroundColor: colors.pink,
        justifyContent: 'center', alignItems: 'center'
    },
    footerBtn: {
        width: width, backgroundColor: colors.blue_mediumdark,
        flexDirection: 'row',
        justifyContent: 'space-around', alignItems: 'center'
    },
    footerParagraph: {
        alignItems: 'flex-start',
    },
    footerRoundBtn: {
        width: c.footerRoundBtnSize,
        height: c.footerRoundBtnSize,
        borderRadius: c.footerRoundBtnSize,
        justifyContent: 'center', alignItems: 'center'
    },
    btnFont: {
        color: colors.whiteish, fontSize: 30,
        fontWeight: 'bold'
    }
})
