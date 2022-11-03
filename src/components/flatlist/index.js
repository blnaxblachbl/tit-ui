import React, { useMemo, forwardRef } from "react"
import {
    FlatList as List,
    StyleSheet,
    RefreshControl,
    View,
    Text
} from 'react-native'

const DefaultEmpty = ({ text }) => {
    return (
        <View style={styles.defaultEmptyContainer}>
            <Text style={styles.defaultEmptyText}>{text}</Text>
        </View>
    )
}

const FlatList = forwardRef(({
    data = [],
    loading = false,
    onRefresh = () => { },
    style,
    contentContainerStyle,
    LoadinComponent = null,
    useRefreshControl = true,
    emptyComponenText = "There is nothing here",
    ListEmptyComponent = <DefaultEmpty text={emptyComponenText} />,
    ...props
}, ref) => {

    const refreshControl = useMemo(() => {
        if (useRefreshControl) {
            return (
                <RefreshControl
                    refreshing={loading}
                    onRefresh={onRefresh}
                />
            )
        }
        return null
    }, [useRefreshControl, loading, onRefresh])

    const Empty = useMemo(() => {
        if (loading) {
            return LoadinComponent
        }
        return ListEmptyComponent
    }, [loading, LoadinComponent, ListEmptyComponent, DefaultEmpty])

    const _contentContainerStyle = useMemo(() => ([
        styles.contentContainer,
        data.length === 0 ? styles.emptyContainer : undefined,
        contentContainerStyle
    ]), [data, contentContainerStyle])

    return (
        <List
            ref={ref}
            data={data}
            style={[styles.container, style]}
            contentContainerStyle={_contentContainerStyle}
            refreshControl={refreshControl}
            ListEmptyComponent={Empty}
            {...props}
        />
    )
})

export default FlatList 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    },
    contentContainer: {
        alignItems: 'center'
    },
    emptyContainer: {
        flex: 1,
    },
    defaultEmptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        width: '100%'
    },
    defaultEmptyText: {
        fontSize: 14,
        textAlign: 'center',
        color: '#ccc'
    }
})