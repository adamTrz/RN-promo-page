import React, {Component} from 'react';
import {
    Animated, View, ScrollView, StatusBar,  StyleSheet,
    TouchableOpacity, Dimensions, Text, Image
} from 'react-native'

import {Head, Logo} from './Header'
import Trophies from './Trophies'
import Heads from './Heads'
import Footer from './Footer'
import PhoneSection from './phone/PhoneSection'
import Phone from './phone/Phone'

import {BlobItem} from './components/Blob'

import colors from './colors'
import c from './constants'

const {width, height} = Dimensions.get('window')

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scrollY: new Animated.Value(0)
        }
        this.scrollAll = this.scrollAll.bind(this)
        this.scrollToTop = this.scrollToTop.bind(this)
        // this.onPress = this.onPress.bind(this)
        // this.handleMainScroll = this.handleMainScroll.bind(this)
    }

    // onPress() {
    //     this.scrollView.scrollTo({y: c.headerHeight+c.phoneWrapperHeight, true})
    // }

    scrollToTop() {
        // alert('YO!')
        this.scrollView.scrollTo({y:0, true})
    }

    scrollAll(delta) {
        const parentOffset = this.state.scrollY._value
        // phone is fullscreen?
        if (parentOffset >= c.headerHeight+c.phoneAnimOffset1) {
            // console.log('lets scroll!');
            const offset = c.headerHeight+c.phoneAnimOffset2+c.caseSize+c.navBarMaxHeight
            let toY = delta + offset + c.height
            // console.log('fullscreen');
            // console.log('toY > c.headerHeight+c.phoneWrapperHeight+c.navBarMaxHeight', toY, c.headerHeight+c.phoneWrapperHeight+c.navBarMaxHeight);
            // reched end of phones list?
            if (toY > c.headerHeight+c.phoneWrapperHeight-c.phoneAnimOffset1) {
                console.log('time to shrink down!', toY);
                console.log(c.headerHeight+c.phoneWrapperHeight);
                this.scrollView.scrollTo({y: toY, true})
            }
        }
    }

    // handleMainScroll(e) {
    //     const {innerScrollEnabled} = this.state
    //     let {y} = e.nativeEvent.contentOffset
    //     let enable = y >= c.headerHeight
    //     if (innerScrollEnabled !== enable) {
    //         this.setState({innerScrollEnabled: enable})
    //         console.log('hakuna matata');
    //     }
    // }

    render() {
        const {text, innerScrollEnabled} = this.state
        return (
            <View style={{width: width, height: height}}>
                <StatusBar backgroundColor={colors.blue_dark}/>
                <ScrollView
                    ref = {(scrollView) => this.scrollView = scrollView}
                    showsVerticalScrollIndicator={false}
                    onScroll={Animated.event(
                        [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}] ,
                        {listener: this.handleMainScroll}
                        )}>
                    <Head anim={this.state.scrollY} />
                    <PhoneSection anim={this.state.scrollY} />
                    <Trophies anim={this.state.scrollY} />
                    <Heads anim={this.state.scrollY} />
                    <Footer anim={this.state.scrollY}
                        scrollToTop={this.scrollToTop}/>
                    <View style={{height: 22, backgroundColor: 'aqua'}}/>
                </ScrollView>
                {/* items positioned abolutely - going through whole screen: */}
                <Logo anim={this.state.scrollY} />
                <FAB anim={this.state.scrollY}/>
            </View>
        );
    }
}

export default App;

const FAB = ({anim}) => {
    const {height} = Dimensions.get('window')
    let animStyle = {
        opacity: anim.interpolate({
            inputRange: [0, c.phoneScaleUpStop, c.phoneScaleUpStop+10,
                c.headsAnimStart+300, c.headsAnimStart+400],
            outputRange: [0, 0, 1, 1, 0]
        })
    }
    return (
        <TouchableOpacity
            style={{position: 'absolute', top: height-100, right: 20}}>
            <Animated.View style={[styles.fabStyle, animStyle]}>
                <Image source={require('./images/cart.png')}/>
            </Animated.View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    fabStyle: {
        width: c.fabSize, height: c.fabSize, borderRadius: c.fabSize,
        backgroundColor: colors.pink,
        justifyContent: 'center', alignItems: 'center'
    }
})
