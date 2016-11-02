import React, {Component} from 'react';
import {
    Animated, View, StyleSheet, Dimensions, Text, TouchableOpacity,
} from 'react-native'

import {BlobItem, DoubleLine, Paragraph} from '../components/Blob'
import Screen from './Screen'
import colors from '../colors'
import c from '../constants'

const {width, height} = Dimensions.get('window')

const animTresholds = [0, c.headerHeight,
    c.phoneScaleUpStop, c.phoneScaleDownStart,
    c.phoneScaleDownStop]


const Phone = ({anim, scrollParent, innerScrollEnabled}) => {
    let animStyle = {
        transform: [{
            translateX: anim.interpolate({
                inputRange: [0, c.headerHeight/2, c.headerHeight,
                    c.phoneScaleUpStop, c.phoneScaleDownStart,
                    c.phoneScaleDownStop],
                outputRange: [20, -c.phoneWidth+20, (c.width-c.phoneWidth)/2,
                    -10, -10, (c.width-c.phoneWidth)/2],
                extrapolate: 'clamp'
            })}, {
            translateY: anim.interpolate({
                inputRange: [0, c.headerHeight/2, c.headerHeight,
                    c.phoneScaleUpStop, c.phoneScaleDownStart,
                    c.phoneScaleDownStop,
                    c.headerHeight+c.phoneWrapperHeight,
                ],
                outputRange: [20, c.headerHeight/2+20, 50,
                    -10, -10,
                    c.phoneScaleDownStop-250, //todo - fix stuttering!!
                    c.headerHeight+c.phoneWrapperHeight-250,
                ],
                extrapolate: 'clamp'
            })
        }],
        width: anim.interpolate({
            inputRange:  animTresholds,
            outputRange: [c.phoneWidth, c.phoneWidth, c.width+20,
                c.width+20, c.phoneWidth],
            extrapolate: 'clamp'
        }),
        height: anim.interpolate({
            inputRange:  animTresholds,
            outputRange: [c.phoneHeight, c.phoneHeight, c.height+2*c.caseSize,
                c.height+2*c.caseSize, c.phoneHeight
            ],
            extrapolate: 'clamp'
        })
    }
    let caseWidth = {
        width: anim.interpolate({
            inputRange: animTresholds,
            outputRange: [c.phoneWidth, c.phoneWidth, c.width+20,
                c.width+20, c.phoneWidth],
            extrapolate: 'clamp'})
        }
    return (
        <Animated.View style={[styles.phone, animStyle]}>
            <Case animStyle={caseWidth}>
                <DoubleLine width = {120} color={colors.whiteish}
                    first={1/8} second={0.5} />
            </Case>
            <Screen anim={anim} scrollParent={scrollParent}
                innerScrollEnabled={innerScrollEnabled}/>
            <Case animStyle={caseWidth}>
                <PhoneButton size = {40} color={colors.whiteish} />
            </Case>
        </Animated.View>
    )
}

export default Phone

const styles = StyleSheet.create({
    phone: {
        position: 'absolute',
        top: 0, left: 0,
        width: c.phoneWidth,
        height: c.phoneHeight,
        backgroundColor: colors.phone_color,
        borderRadius: 30,
    },
})

// not animated:
const Case = ({animStyle,children}) => (
    <Animated.View
        style={[{width:c.phoneWidth, height: c.caseSize,
            justifyContent: 'center',alignItems: 'center'}, animStyle]}>
            {children}
    </Animated.View>
    )

    const PhoneButton = ({size, color}) => (
        <View
            style = {{width: size, height: size, borderRadius: size, backgroundColor: color}} />
    )
