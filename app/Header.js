import React, {Component} from 'react';
import {
    Animated, Image, View, StyleSheet, Dimensions, Text, TouchableOpacity,
} from 'react-native'

import {Paragraph} from './components/Blob'
import colors from './colors'
import c from './constants'

const {width, height} = Dimensions.get('window')


const Head = ({anim}) => (
    <Background anim={anim}>
        <HeaderBlob anim={anim}/>
        <CartBtn anim={anim}/>
    </Background>
)

const Background = ({anim, children}) => {
    let animStyle = {
        backgroundColor: anim.interpolate({
            inputRange: [0, c.headerHeight*c.darkMode],
            outputRange: [colors.sky_blue, colors.blue_dark]
        })
    }
    return (
        <Animated.View style={[styles.header, animStyle]}>
            <Moon anim={anim} />
            <View style={styles.smallMountain} />
            <BigMountain anim={anim} />
            {children}
        </Animated.View>
    )
}

const BigMountain = ({anim}) => {
    let animStyle = {
        backgroundColor: anim.interpolate({
            inputRange: [0, c.headerHeight*c.darkMode],
            outputRange: [colors.blue_mediumdark, colors.blue_dark]
        })
    }
    return (
        <Animated.View style={[styles.bigMountain, animStyle ]} />
    )
}

const Logo = ({anim, onPress}) => {
    let logoStyle = {
        left: anim.interpolate({
            inputRange: [0, c.headerHeight ],
            outputRange: [width/2-c.logoSize/2, 20],
            extrapolate: 'clamp',
        }),
        borderWidth: anim.interpolate({
            inputRange: [0, c.headerHeight ],
            outputRange: [7, 0],
            extrapolate: 'clamp',
        }),
        borderColor: anim.interpolate({
            inputRange: [0, c.headerHeight ],
            outputRange: [colors.blue_lighter, 'transparent'],
            extrapolate: 'clamp',
        }),
        opacity: anim.interpolate({
            inputRange:  [0, c.headerHeight, c.headerHeight+20,
                c.phoneScaleUpStop, c.phoneScaleDownStart,
                c.phoneScaleDownStop-20, c.phoneScaleDownStop
            ],
            outputRange: [1, 1, 0,
                0, 0,
                0, 1
            ],
        })
    }
    return (
        <Animated.View style={[styles.logoStyle, logoStyle]}>
            <Text style={{fontSize: 22, fontWeight: 'bold', color: colors.blue}}>
            L
            </Text>
        </Animated.View>
    )
}

const HeaderBlob = ({anim}) => {
    let animStyle = {
        transform: [{translateY: anim.interpolate({
            inputRange: [0, c.headerHeight],
            outputRange: [120, c.headerHeight-60]
        })}],
        opacity: anim.interpolate({
            inputRange: [0, c.headerHeight],
            outputRange: [1, 0]
        })
    }
    const blobWidth = width*0.5
    return (
        <Paragraph wrapperStyle={{
                alignItems: 'center', justifyContent: 'center',
            }} animStyle = {animStyle}
            blobWidth = {blobWidth} config = {[[0.6,0.3], [0.8], [0.4]]}
            />
    )
}

const CartBtn = ({anim}) => {
    const animStyle = {
        transform: [{scale: anim.interpolate({
            inputRange: [0, c.headerHeight-100],
            outputRange: [1, 1.1], extrapolate: 'clamp'
        })},
        {translateY: anim.interpolate({
            inputRange: [0, c.headerHeight],
            outputRange: [c.headerHeight-150, 200]
        })}]
    }
    return (
        <Animated.View style={[animStyle]}>
            <TouchableOpacity style={[styles.cartBtn, {justifyContent: 'center', alignItems: 'center'}]}>
                <Image source={require('./images/cart.png')}
                    style={{width: 25, height: 24, opacity: 0.8}}/>
            </TouchableOpacity>
        </Animated.View>
    )
}

const Moon = ({anim}) => {
    let animStyle = {
        top: anim.interpolate({
            inputRange: [0, c.headerHeight],
            outputRange: [130, c.headerHeight*2]
        })
    }
    return (
        <Animated.View style={[styles.moon, animStyle]} />
    )
}

export {Head, Logo, Background}

const styles = StyleSheet.create({
    header: {
        backgroundColor: colors.blue, width: width,
        height: c.headerHeight,
        alignItems: 'center',
    },
    logoStyle: {
        position: 'absolute', top: 30,
        width: c.logoSize, height: c.logoSize, borderRadius: c.logoSize,
        backgroundColor: 'white',
        justifyContent: 'center', alignItems: 'center',
        elevation: 5
    },
    cartBtn: {
        backgroundColor: colors.pink,
        width: width*0.45, height: 40, borderRadius: 4
    },
    moon: {
        position: 'absolute', top: 130, right: 50,
        width: c.moonSize, height: c.moonSize, borderRadius: c.moonSize,
        backgroundColor: colors.blue_lighter, opacity: 0.6
    },
    bigMountain: {
        position: 'absolute', bottom: -c.headerHeight*0.4,
        backgroundColor: colors.blue_mediumdark,
        width: c.headerHeight*0.8,
        height: c.headerHeight*0.8,
        transform: [{
            rotate: '45deg'
        }]
    },
    smallMountain: {
        position: 'absolute',
        bottom: -50, right: -20,
        backgroundColor: colors.blue_dark,
        width: c.headerHeight*0.4,
        height: c.headerHeight*0.4,
        transform: [{
            rotate: '45deg'
        }]
    }
})
