import React, {Component} from 'react';
import {
    Animated, View, StyleSheet, ScrollView, Dimensions, Text, TouchableOpacity,
} from 'react-native'

import {Paragraph, BlobItem} from '../components/Blob'
import colors from '../colors'
import c from '../constants'

const animTresholds = [0, c.headerHeight,
    c.phoneScaleUpStop, c.phoneScaleDownStart,
    c.phoneScaleDownStop]


class Screen extends React.Component {
    constructor(props) {
        super(props);
        this.handlePhoneScreenScroll = this.handlePhoneScreenScroll.bind(this)
    }

    handlePhoneScreenScroll(e) {
        this.props.scrollParent(e.nativeEvent.contentOffset.y)
        // console.log(e.nativeEvent.contentOffset.y);
    }

    render() {
        const {anim, innerScrollEnabled} = this.props
        return (
            <View style={styles.screen}>
                <NavBar anim = {anim}/>
                <View style={{alignItems: 'center'}}>
                    <GraphWrapperOne anim={anim} />
                    <GraphWrapperTwo anim={anim} />
                </View>
            </View>
        )
    }
}


const NavBar = ({anim}) => {
    let animStyle = {
        height: anim.interpolate({
            inputRange: animTresholds,
            outputRange: [c.navBarMinHeight, c.navBarMinHeight, c.navBarMaxHeight,
                c.navBarMaxHeight, c.navBarMinHeight],
            extrapolate: 'clamp'
        }),
        width: anim.interpolate({
            inputRange: animTresholds,
            outputRange: [c.phoneWidth, c.phoneWidth, c.width+20,
                c.width+20, c.phoneWidth],
            extrapolate: 'clamp'
        })
    }
    titleStyle = {
        height: anim.interpolate({
            inputRange: animTresholds,
            outputRange: [8, 8, 12, 12, 8],
            extrapolate: 'clamp'
        }),
        width: anim.interpolate({
            inputRange: animTresholds,
            outputRange: [50, 50, 120, 120, 50
            ],
            extrapolate: 'clamp'
        })
    }
    return (
        <Animated.View style={[styles.navBar, animStyle]}>
            <Hamburger />
            <BlobItem color={colors.blue_lighter} width={50} lineHeight={8}
                animStyle={titleStyle}/>
            <RightBtn />
        </Animated.View>
    )
}

const GraphWrapperOne = ({anim, children}) => {
    let animStyle = {
        width: anim.interpolate({
            inputRange: animTresholds,
            outputRange: [c.phoneWidth-2*(10+20), c.phoneWidth-2*(10+20),
                c.width-(2*40), c.width-(2*40),
                c.phoneWidth-2*(10+20)],
            extrapolate: 'clamp'
        }),
        height: anim.interpolate({
            inputRange: animTresholds,
            outputRange: [c.phoneWidth-2*(10+20), c.phoneWidth-2*(10+20),
                c.width-(2*40), c.width-(2*40),
                c.phoneWidth-2*(10+20)],
            extrapolate: 'clamp'
        }),
        marginTop: anim.interpolate({
            inputRange: animTresholds,
            outputRange: [20, 20, 40, 40, 20],
            extrapolate: 'clamp'
        })
    }
    return (
        <Animated.View style={[styles.graphWrapper, animStyle]}>
            <View style={{flexDirection: 'row', justifyContent: 'space-around',
                alignItems: 'center',flex: 3}}>
                <GraphOne anim={anim} />
                <TextsOne anim={anim}/>
            </View>
            <Buttons anim={anim} width={60} />
        </Animated.View>
    )
}

const GraphOne = ({anim}) => {
    let animStyle = {
        width: anim.interpolate({
            inputRange: animTresholds,
            outputRange: [(c.phoneWidth-2*(10+20))/2, (c.phoneWidth-2*(10+20))/2,
                c.width-(2*40)-20, c.width-(2*40)-20,
                (c.phoneWidth-2*(10+20))
            ],
            extrapolate: 'clamp'
        })
    }
    let animImage = {
        width: anim.interpolate({
            inputRange: animTresholds,
            outputRange: [(c.phoneWidth-2*(10+20))/3, (c.phoneWidth-2*(10+20))/3,
                (c.width-(2*40)-20)*0.6, (c.width-(2*40)-20)*0.6,
                (c.phoneWidth-2*(10+20))*0.6
            ],
            extrapolate: 'clamp'
        }),
        height: anim.interpolate({
            inputRange: animTresholds,
            outputRange: [(c.phoneWidth-2*(10+20))/3, (c.phoneWidth-2*(10+20))/3,
                (c.width-(2*40)-20)*0.6, (c.width-(2*40)-20)*0.6,
                (c.phoneWidth-2*(10+20))*0.6
            ],
            extrapolate: 'clamp'
        }),
        transform: [{
            rotate: anim.interpolate({
                inputRange: animTresholds,
                outputRange: ['0deg', '0deg',
                    '1440deg', '1440deg', '1440deg'],
                extrapolate: 'clamp'
            })
        }]
    }
    return (
        <Animated.View style={[{
                justifyContent: 'center', alignItems: 'center', marginTop: 10
            }, animStyle]}>
            <Animated.Image source={require('../images/roundgraph.png')}
                style={[{resizeMode: 'contain'}, animImage]} />
        </Animated.View>
    )
}

const GraphWrapperTwo = ({anim, children}) => {
    let animStyle = {
        width: anim.interpolate({
            inputRange: animTresholds,
            outputRange: [c.phoneWidth-2*(10+20), c.phoneWidth-2*(10+20),
                c.width-(2*40), c.width-(2*40),
                c.phoneWidth-2*(10+20)],
            extrapolate: 'clamp'
        }),
        height: anim.interpolate({
            inputRange: animTresholds,
            outputRange: [c.phoneWidth-2*(10+20), c.phoneWidth-2*(10+20),
                c.width-(2*40), c.width-(2*40),
                c.phoneWidth-2*(10+20)],
            extrapolate: 'clamp'
        }),
        marginTop: anim.interpolate({
            inputRange: animTresholds,
            outputRange: [20, 20, 40, 40, 20],
            extrapolate: 'clamp'
        })
    }
    return (
        <Animated.View style={[styles.graphWrapper, animStyle]}>
            <View style={{flexDirection: 'row', justifyContent: 'space-around',
                alignItems: 'center',flex: 3}}>
                <GraphTwo anim={anim} />
                <TextsOne anim={anim}/>
            </View>
            <Buttons anim={anim} width={60} />
        </Animated.View>
    )
}

const GraphTwo = ({anim}) => {
    let animStyle = {
        width: anim.interpolate({
            inputRange: animTresholds,
            outputRange: [(c.phoneWidth-2*(10+20))/2, (c.phoneWidth-2*(10+20))/2,
                c.width-(2*40)-20, c.width-(2*40)-20,
                (c.phoneWidth-2*(10+20))
            ],
            extrapolate: 'clamp'
        })
    }
    let animBar = {
        width: anim.interpolate({
            inputRange: animTresholds,
            outputRange: [(c.phoneWidth-2*(10+20))*0.05, (c.phoneWidth-2*(10+20))*0.05,
                (c.width-(2*40)-20)*0.05, (c.width-(2*40)-20)*0.05,
                (c.phoneWidth-2*(10+20))*0.05
            ],
            extrapolate: 'clamp'
        }),
        marginHorizontal: anim.interpolate({
            inputRange: animTresholds,
            outputRange: [2, 2, 8, 8, 4],
            extrapolate: 'clamp'
        })
    }
    let animBarOne = {
        height: anim.interpolate({
            inputRange: animTresholds,
            outputRange: [20, 20, 50, 50, 20],
            extrapolate: 'clamp'
        }),
    }
    let animBarTwo = {
        height: anim.interpolate({
            inputRange: animTresholds,
            outputRange: [15, 15, 60, 60, 15],
            extrapolate: 'clamp'
        }),
    }
    let animBarThree = {
        height: anim.interpolate({
            inputRange: animTresholds,
            outputRange: [20, 20, 100, 100, 30],
            extrapolate: 'clamp'
        }),
    }
    let animBarFour = {
        height: anim.interpolate({
            inputRange: animTresholds,
            outputRange: [35, 35, 70, 70, 20],
            extrapolate: 'clamp'
        }),
    }
    let animBarFive = {
        height: anim.interpolate({
            inputRange: animTresholds,
            outputRange: [12, 12, 55, 55, 12],
            extrapolate: 'clamp'
        }),
    }
    let graphBase = {
        width: anim.interpolate({
            inputRange: animTresholds,
            outputRange: [60, 60, 150, 150, 60],
            extrapolate: 'clamp'
        }),
        height: anim.interpolate({
            inputRange: animTresholds,
            outputRange: [4, 4, 8, 8, 4],
            extrapolate: 'clamp'
        }),
        marginVertical: 4
    }
    return (
        <Animated.View
            style={[{
                justifyContent: 'center', alignItems: 'center',
                marginTop: 10,}, animStyle]}>
            <Animated.View style={[{flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end'}, animStyle]}>
                <Animated.View style={[{backgroundColor: colors.blue_light}, animBar, animBarOne]}/>
                <Animated.View style={[{backgroundColor: colors.blue}, animBar, animBarTwo]}/>
                <Animated.View style={[{backgroundColor: colors.blue_lighter}, animBar, animBarThree]}/>
                <Animated.View style={[{backgroundColor: colors.blue_light}, animBar, animBarFour]}/>
                <Animated.View style={[{backgroundColor: colors.blue}, animBar, animBarFive]}/>
            </Animated.View>
            <Animated.View
                style={[graphBase, {backgroundColor: colors.blue_mediumdark}]} />
        </Animated.View>
    )
}


const TextsOne = ({anim}) => {
    let animStyle = {
        width: anim.interpolate({
            inputRange: animTresholds,
            outputRange: [(c.phoneWidth-2*(10+20))/2, (c.phoneWidth-2*(10+20))/2,
                0, 0, 0 ],
            extrapolate: 'clamp'
        }),
        opacity: anim.interpolate({
            inputRange: animTresholds,
            outputRange: [1,1,0,0,0]
        })
    }
    return (
        <Texts animStyle={animStyle} />
    )
}

const Texts = ({animStyle}) => {
    return (
        <Animated.View
            style={[{justifyContent: 'center', alignItems: 'center'}, animStyle]}>
            <BlobItem color={colors.blue_light}
                width = {60} lineHeight={10}/>
            <Paragraph
                wrapperStyle={{ marginTop: 20, justifyContent: 'flex-start',
                alignItems: 'flex-start' }}
                color={colors.blue}
                blobWidth = {60} lineHeight = {5} lineGap ={3}
                config = {[[0.6,0.3], [0.3, 0.3], [0.8], [0.3, 0.2], [0.2]]}
                />
        </Animated.View>
    )
}

const Buttons = ({anim, width})=> {
    let animStyle = {
        width: anim.interpolate({
            inputRange: animTresholds,
            outputRange: [c.phoneWidth-2*(10+20), c.phoneWidth-2*(10+20),
                c.width-(2*40), c.width-(2*40),
                c.phoneWidth-2*(10+20)],
            extrapolate: 'clamp'
        })
    }
    let buttonStyle = {
        width: anim.interpolate({
            inputRange: animTresholds,
            outputRange: [(c.phoneWidth-2*(10+20))/2-10,
                (c.phoneWidth-2*(10+20))/2-10,
                (c.width-(2*40))/2-20, (c.width-(2*40))/2-20,
                (c.phoneWidth-2*(10+20))/2-10],
            extrapolate: 'clamp'
        }),
        height: anim.interpolate({
            inputRange: animTresholds,
            outputRange: [20, 20, 50, 50, 20],
            extrapolate: 'clamp'
        }),
    }
    let blobStyle = {
        width: anim.interpolate({
            inputRange: animTresholds,
            outputRange: [(c.phoneWidth-2*(10+20))/4, (c.phoneWidth-2*(10+20))/4,
                (c.width-(2*40))/4, (c.width-(2*40))/4,
                (c.phoneWidth-2*(10+20))/4],
            extrapolate: 'clamp'
        }),
    }
    return (
        <Animated.View style={[styles.btnsWrapper, animStyle]}>
            <FlatBtn dark buttonStyle={buttonStyle} blobStyle={blobStyle} />
            <FlatBtn buttonStyle={buttonStyle} blobStyle={blobStyle} />
        </Animated.View>
    )
}

const FlatBtn = ({dark, buttonStyle, blobStyle}) => {
    const bgColor = dark ? colors.graphs_bg : colors.blue_lighter
    const accentColor = dark ? colors.blue_lighter : colors.graphs_bg
    return (
        <Animated.View
            style={[{backgroundColor: bgColor}, styles.button, buttonStyle]}>
            <BlobItem animStyle={blobStyle} lineHeight={8} color={accentColor} />
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: colors.screen_bg,
        marginHorizontal: 10, flex: 1,
    },
    navBar: {
        backgroundColor: colors.blue_light,
        paddingHorizontal: 10,
        justifyContent: 'space-between', alignItems: 'center',
        flexDirection: 'row',
    },
    rightBtn: {
        marginRight: 25, borderRadius: 2,
        width: 20, height: 20,
        backgroundColor: colors.whiteish,
        justifyContent: 'center', alignItems: 'center',
    },
    graphWrapper: {
        backgroundColor: colors.graphs_bg,
        borderRadius: 4,
        justifyContent: 'center', alignItems: 'center',
    },
    button: {
        borderRadius: 4,
        borderColor: colors.blue_lighter,
        borderWidth: 1,
        justifyContent: 'center', alignItems: 'center'
    },
    btnsWrapper: {
        flexDirection: 'row', flex: 2,
        justifyContent: 'space-around', alignItems: 'center',
    }
})

const Hamburger = () => (
    <TouchableOpacity style={{marginLeft: 5}}>
        <BlobItem color={colors.blue_lighter} width = {20} lineHeight={3} />
        <BlobItem color={colors.blue_lighter} width = {20} lineHeight={3}
            style={{marginVertical: 3}}/>
        <BlobItem color={colors.blue_lighter} width = {20} lineHeight={3} />
    </TouchableOpacity>
)

const RightBtn = () => (
    <TouchableOpacity style={styles.rightBtn} >
        <BlobItem color={colors.blue_light} width = {12} lineHeight = {3} />
        <BlobItem color={colors.blue_light} width = {12} lineHeight = {3}
            style={{position: 'absolute', top: (20-3)/2, left: (20-12)/2,
                transform: [{rotate: '90deg'}]}}/>
        </TouchableOpacity>

)

export default Screen
