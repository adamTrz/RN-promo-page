import React, {Component} from 'react';
import {
    Animated, View, StyleSheet, Dimensions, Text
} from 'react-native'

import colors from '../colors'

const BlobItem = ({color = colors.whiteish, style, width, lineHeight = 15, animStyle}) => {
    return (
        <Animated.View style={[styles.blobItem, {
                backgroundColor: color, width: width, height: lineHeight
            }, style, animStyle]} />
    )
}

const DoubleLine = ({width, first, second, color, style, lineHeight}) => (
    <View style={[{flexDirection: 'row', width: width,
        justifyContent: 'space-between'}, style]}>
        <BlobItem color={color} width = {width*first} lineHeight={lineHeight}/>
        <BlobItem color={color} width = {width*second} lineHeight={lineHeight}/>
    </View>
)

const Paragraph = ({wrapperStyle, animStyle, blobWidth, color, config, lineHeight, lineGap = 10}) => {
    // config => [[0.3,0.6], [0.2, 0.7], ...]
    if (!config) return null
    return (
        <Animated.View style={[animStyle]}>
            <View style={wrapperStyle}>
                {config.map((blobParams, idx) => {
                    if (blobParams.length === 1) {
                        return (
                            <BlobItem width = {blobWidth*blobParams[0]}
                                color = {color} lineHeight={lineHeight}
                                style = {idx%2 && {marginVertical: lineGap}}
                                key={'banana',idx}/>
                        )
                    }
                    return (
                        <DoubleLine width = {blobWidth} color={color}
                            lineHeight={lineHeight}
                            first={blobParams[0]} second = {blobParams[1]}
                            style = {idx%2 && {marginVertical: lineGap}}
                            key={'bananas',idx}/>
                )})}
            </View>
        </Animated.View>
    )
}

export {BlobItem, DoubleLine, Paragraph}

const styles = StyleSheet.create({
    blobItem: {
        height: 15, borderRadius: 15,
        backgroundColor: 'rgba(220,220,220,1)',
    }
})
