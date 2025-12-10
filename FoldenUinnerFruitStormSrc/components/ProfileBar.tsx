import React from 'react';
import { View as SotredlofVIewfriut, Text as GreetTxt, Image as TiurfrennImagedlof } from 'react-native';
import { storfontsinner } from '../storfontsinner';

export default function ProfileBar({ frameW, frameH, storuitImage, fruiUserlde }) {
    return (
        <SotredlofVIewfriut
            style={{
                width: frameW * 1.02,
                backgroundColor: '#5D0100',
                borderBottomLeftRadius: frameW * 0.07,
                borderBottomRightRadius: frameW * 0.07,
                paddingTop: frameH * 0.07,
                paddingBottom: frameH * 0.03,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: frameW * 0.07,
                borderColor: '#FDD721',
                borderWidth: 3,
                borderTopColor: 'transparent',
            }}
        >
            <TiurfrennImagedlof
                resizeMode="cover"
                style={{
                    height: frameW * 0.18,
                    width: frameW * 0.18,
                    backgroundColor: '#fff',
                    borderWidth: 3,
                    borderColor: '#FDD721',
                    borderRadius: frameW * 0.061,
                    marginRight: frameW * 0.043,
                }}
                source={storuitImage || require('../FoldenUinnerFruitStormAssets/FoldenUinnerFruitStormImages/smaUinFruiIcon.png')}
            />
            <GreetTxt
                style={{
                    fontSize: frameW * 0.07,
                    fontWeight: 'bold',
                    color: '#fff',
                    fontFamily: storfontsinner.foldinLondrinaSolBlack,
                    letterSpacing: 1,
                }}
                numberOfLines={1}
                adjustsFontSizeToFit
            >
                {`HELLO, ${fruiUserlde && fruiUserlde.toUpperCase()}`}
            </GreetTxt>
        </SotredlofVIewfriut>
    );
}
