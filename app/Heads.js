import React, {Component} from 'react';
import {
    Animated, Image, View, StyleSheet, Dimensions, Text, TouchableOpacity,
} from 'react-native'

import {BlobItem, Paragraph} from './components/Blob'
import colors from './colors'
import c from './constants'

const {width, height} = Dimensions.get('window')

export default class Heads extends Component {
    constructor(props) {
      super(props)
      this.getHeadStyle = this.getHeadStyle.bind(this)
      this.renderHeads = this.renderHeads.bind(this)
    }

    renderHeads(headsArray) {
        const {anim} = this.props
        return (
            <View style={styles.headsWrapper}>
                {headsArray.map((headItem, idx) => (
                    <AnimHead size={headItem.size} key={'head',idx}
                        style={headItem.style} dark={headItem.dark}
                        animStyle={this.getHeadStyle(headItem.direction, headItem.vertical)}
                        />
                ))}
            </View>
        )
    }

    getHeadStyle(direction, vertical) {
        const {anim} = this.props
        const verticalOffset = vertical === 'up' ? -125 : (vertical === 'down' ? 133 : 0)
        let animHeadStyleLeft = {
            transform: [{
                translateX: anim.interpolate({
                    inputRange: [c.headsAnimStart-500, c.headsAnimStart+200],
                    outputRange: [-width/2, 0],
                    extrapolate: 'clamp'
                })
            }, {
                translateY: anim.interpolate({
                    inputRange: [c.headsAnimStart-500, c.headsAnimStart+200],
                    outputRange: [verticalOffset, 0],
                    extrapolate: 'clamp'
                })
            }],
        }
        let animHeadStyleRight = {
            transform: [{
                translateX: anim.interpolate({
                    inputRange: [c.headsAnimStart-500, c.headsAnimStart+200],
                    outputRange: [width/2, 0],
                    extrapolate: 'clamp'
                })
            }, {
                translateY: anim.interpolate({
                    inputRange: [c.headsAnimStart-500, c.headsAnimStart+200],
                    outputRange: [verticalOffset, 0],
                    extrapolate: 'clamp'
                })
            }],
        }
        let animStyle = direction === 'left' ? animHeadStyleLeft : animHeadStyleRight
        return animStyle
    }

    render() {
        const {anim} = this.props
        let animHeadStyleLeft = {}
        let animHeadStyleRight = {}
        const headsArray = [
            {direction: 'left', vertical: 'up',  size: 33, style: {left: 10, top: 20}},
            {direction: 'left', vertical: 'up',  size: 63, style: {left: 80, top: -10}},
            {direction: 'left', vertical: 'up',  size: 100, style: {left: -10, top: 80}},
            {direction: 'left', vertical: 'up',  size: 43, style: {left: 100, top: 70}},
            {direction: 'left', vertical: 'up',  size: 50, style: {left: 120, top: 120}},
            {direction: 'left', vertical: 'up',  size: 60, style: {left: 40, top: 180}},
            {direction: 'left', vertical: 'up',  size: 70, style: {left: 120, top: 180}},
            {direction: 'left', vertical: 'center',  size: 55, style: {left: -20, top: 220}},
            {direction: 'left', vertical: 'center',  size: 110, style: {left: 60, top: 270}},
            {direction: 'left', vertical: 'center',  size: 53, style: {left: 0, top: 300}},
            {direction: 'left', vertical: 'center',  size: 40, style: {left: 30, top: 365}},
            {direction: 'left', vertical: 'down',  size: 80, style: {left: 5, top: 420}},
            {direction: 'left', vertical: 'down',  size: 80, style: {left: 130, top: 405}},
            {direction: 'left', vertical: 'down',  size: 60, style: {left: 88, top: 477}},
            {direction: 'left', vertical: 'down',  size: 44, style: {left: 18, top: 511}},
            {direction: 'left', vertical: 'down',  size: 80, style: {left: 99, top: 542}},
            {direction: 'left', vertical: 'down',  size: 111, style: {left: -33, top: 567}, dark: true},
            {direction: 'left', vertical: 'down',  size: 66, style: {left: 70, bottom: 20}},

            {direction: 'right', vertical: 'up', size: 83, style: {right: 100, top: 11}},
            {direction: 'right', vertical: 'up', size: 60, style: {right: 23, top: 20}},
            {direction: 'right', vertical: 'up', size: 33, style: {right: 20, top: 93}},
            {direction: 'right', vertical: 'up', size: 105, style: {right: 70, top: 110}, dark: true},
            {direction: 'right', vertical: 'up', size: 99, style: {right: -31, top: 155}},
            {direction: 'right', vertical: 'up', size: 44, style: {right: 131, top: 241}},
            {direction: 'right', vertical: 'center', size: 66, style: {right: 68, top: 266}},
            {direction: 'right', vertical: 'center', size: 39, style: {right: 18, top: 299}},
            {direction: 'right', vertical: 'center', size: 73, style: {right: 118, top: 333}},
            {direction: 'right', vertical: 'center', size: 124, style: {right: 8, top: 376}, dark: true},
            {direction: 'right', vertical: 'down', size: 68, style: {right: 105, top: 491}},
            {direction: 'right', vertical: 'down', size: 92, style: {right: -15, top: 513}},
            {direction: 'right', vertical: 'down', size: 42, style: {right: 135, top: 563}},
            {direction: 'right', vertical: 'down', size: 54, style: {right: 82, top: 597}},
            {direction: 'right', vertical: 'down', size: 92, style: {right: 122, bottom: -3}},
            {direction: 'right', vertical: 'down', size: 125, style: {right: -22, bottom: -23}},
        ]
        return (
            <HeadsWrapper>
                <BlobItem color={colors.whiteish} width={width*0.4}
                    style={styles.blob} />
                <AnimParagraph anim={anim} width={width*0.4} />
                {this.renderHeads(headsArray)}
                <AnimatedBubble anim={anim} size={105}
                    right={70} top = {110}
                    direction={'right'}/>
                <AnimatedBubble anim={anim} size={124}
                    right={8} top = {376}
                    direction={'right'}/>
                <AnimatedBubble anim={anim} size={111}
                    left={-33} top = {567}
                    direction={'left'}/>
            </HeadsWrapper>
        )
    }
}

const AnimHead = ({size, style, animStyle, dark}) => {
    const icon = dark ? require('./images/head_dark.png') : require('./images/head_light.png')
    return (
        <Animated.View
            style={[{width: size, height: size, borderRadius: size,
                position: 'absolute', overflow: 'visible'}, style, animStyle]}>
            <Image source={icon}
                style={{width: size, height: size, resizeMode: 'contain'}}/>
        </Animated.View>
    )
}

const HeadsWrapper = ({children}) => (
    <View style={styles.container}>
        {children}
    </View>
)

const AnimatedBubble = ({anim, size, direction, top, left, right}) => {
    let animStyle = {
        top: top-size*0.9,
        width: size*1.4, height: size, borderRadius: size,
        transform: [{
            translateX: anim.interpolate({
                inputRange: [c.headsAnimStart-500, c.headsAnimStart+200],
                outputRange: direction==='left' ? [-width/2, 0] : [width/2, 0],
                extrapolate: 'clamp'
            })
        }],
        opacity: anim.interpolate({
            inputRange: [c.headsAnimStart, c.headsAnimStart+100],
            outputRange: [0, 1],
        })
    }
    let pointerStyle = {
        opacity: anim.interpolate({
            inputRange: [c.headsAnimStart, c.headsAnimStart+100, c.headsAnimStart+200],
            outputRange: [0,0.5, 1],
        })
    }
    const style = direction === 'right' ? {right: right+size*0.8} : {left: left+size*0.8}
    return (
        <Animated.View style={[styles.bubbleStyle, style, animStyle]}>
            <BubblePointer direction={direction} animStyle={pointerStyle} />
            <BubbleParagraph width={size*0.6} />
            <Dots width={size*0.6} dotSize = {10}/>
        </Animated.View>
    )
}

const BubbleParagraph = ({width}) => (
    <Paragraph wrapperStyle={styles.bubbleParagraph} blobWidth={width}
        config={[[1],[0.5,0.45], [0.8]]} color={colors.blue_light}
        lineHeight ={10} lineGap={5}
        />
)

const BubblePointer = ({direction, animStyle}) => {
    const position = direction === 'left' ? {left: 10} : {right: 10}
    return (
    <Animated.View style={[styles.pointerStyle, position, animStyle]} />
    )
}

const Dots = ({width, dotSize}) => (
    <View style={{flexDirection: 'row', width: width,
        justifyContent: 'space-around'
    }}>
        <View style={{backgroundColor: colors.yellow,
            width: dotSize, height: dotSize, borderRadius: dotSize}} />
        <View style={{backgroundColor: colors.yellow,
            width: dotSize, height: dotSize, borderRadius: dotSize}} />
        <View style={{backgroundColor: colors.yellow,
            width: dotSize, height: dotSize, borderRadius: dotSize}} />
        <View style={{backgroundColor: colors.yellow,
            width: dotSize, height: dotSize, borderRadius: dotSize}} />
        <View style={{backgroundColor: colors.yellow,
            width: dotSize, height: dotSize, borderRadius: dotSize}} />
    </View>
)

const AnimParagraph = ({anim, width}) => {
    let animStyle = {
        opacity: anim.interpolate({
            inputRange: [c.headsAnimStart, c.headsAnimStart+400],
            outputRange: [1, 0],
        })
    }
    return (
        <Paragraph wrapperStyle={styles.paragraphOne} animStyle={animStyle}
            blobWidth = {width} color = {colors.whiteish}
            config = {[[0.3, 0.6], [0.7], [0.4]]}
            />
    )
}

const styles = StyleSheet.create({
    container: {
        height: c.headsHeight,
        width: width,
        backgroundColor: colors.heads_bg,
        alignItems: 'center', justifyContent: 'center'
    },
    blob: {
        position: 'absolute', top: 30, left: 100,
    },
    paragraphOne: {
        alignItems: 'center', marginBottom: 50,
    },
    headsWrapper: {
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0
    },
    bubbleStyle: {
        position: 'absolute', backgroundColor: colors.bubble_bg,
        justifyContent: 'center', alignItems: 'center'
    },
    bubbleParagraph: {
        alignItems: 'flex-start', marginBottom: 10
    },
    pointerStyle: {width: 20, height: 20,
        position: 'absolute', bottom: 10,
        backgroundColor: colors.bubble_bg
    },
})
