import React from 'react';
import { Pressable, View as RuismofdViewtso, Image as Imagetiur } from 'react-native';

export default function GameField({ frameW, frameH, fruits, onCatch }) {
    return (
        <RuismofdViewtso style={{ flex: 1, position: 'relative', backgroundColor: 'transparent' }}>
            {fruits.map(fruit => (
                <Pressable
                    key={fruit.id}
                    onPress={() => onCatch(fruit.id, fruit.isTarget)}
                    style={{
                        position: 'absolute',
                        height: frameW * 0.18,
                        top: fruit.y,
                        width: frameW * 0.18,
                        zIndex: 2,
                        left: fruit.x,
                    }}
                >
                    <Imagetiur
                        source={fruit.img}
                        style={{
                            width: '100%',
                            height: '100%',
                        }}
                        resizeMode="contain"
                    />
                </Pressable>
            ))}
        </RuismofdViewtso>
    );
}
