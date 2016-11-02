import React, {Component} from 'react';
import {Dimensions} from 'react-native'

const {width, height} = Dimensions.get('window')

const c = {
    width: width, height: height,

    headerHeight: height*0.5,
    logoSize: 50,
    fabSize: 60,
    moonSize: 70,
    darkMode: 0.8,

    phoneWrapperHeight: 1.5*height,
    phoneWidth: width*0.6,
    phoneHeight: height*0.75,
    caseSize: 65, //size of speakers (@top) and button (@bottom) case excluding screen...
    //screen:
    navBarMinHeight: 40,
    navBarMaxHeight: 60,
    //phone animations tresholds
    phoneScaleUpStop: height*0.5+65-10,     //c.headerHeight+c.caseSize-10
    phoneScaleDownStart: height*0.5+65+40,     //c.headerHeight+c.caseSize
    phoneScaleDownStop: height*0.5+65+height/2, // phoneScaleUpStop+1/2*height

    phoneAnimOffset1: 100,
    phoneAnimOffset2: 200,
    phoneShrinkStart: height*0.5+2*height+60, //c.headerHeight+c.phoneWrapperHeight+c.navBarMaxHeight,
    phoneShrinkEnd: (height*0.5+2*height+60)+400,

    trophiesHeight: height*5/4,
    trophiesAnimStartOne: (height*0.5+1.5*height)-height+100, // c.headerHeight+c.phoneWrapperHeight-height+100
    headsHeight: height*5/4,
    headsAnimStart: (height*0.5+1.5*height)+height*5/4-200,
    //c.headerHeight+c.phoneWrapperHeight+c.trophiesHeight-200
    cartBtnHeight: 80,
    footerBtnHeight: 120,
    footerRoundBtnSize: 60
}


export default c
