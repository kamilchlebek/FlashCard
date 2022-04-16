import { useState } from 'react'

import { Button, Divider, Icon, List, ListItem, MenuItem, OverflowMenu } from '@ui-kitten/components'
import { useNavigation } from '@react-navigation/native'
import { Deck } from '../features/home/deck'
import { useGetAllQuery } from '../features/home/decks.service'
import { RootStackNavigationProps } from '../types'

const OptionsIcon = (props: any) => <Icon name="more-horizontal-outline" {...props} />

const DeckItem = ({ item }: { item: Deck }) => {
  const navigation = useNavigation<RootStackNavigationProps<'Home'>>()
  const [visible, setVisible] = useState(false)

  const OptionsButton = (props: any) => (
    <Button {...props} accessoryLeft={OptionsIcon} onPress={() => setVisible(true)} size="small" />
  )

  const OptionsMenu = () => (
    <OverflowMenu
      anchor={OptionsButton}
      visible={visible}
      onBackdropPress={() => setVisible(false)}
    >
      <MenuItem title="Zmiana nazwy" />
      <MenuItem
        title="Lista słówek"
        onPress={() => {
          setVisible(false)
          navigation.push('CardsList', { deckId: item.id })
        }}
      />
      <MenuItem
        title="Dodaj słówko"
        onPress={() => {
          setVisible(false)
          navigation.push('AddCard', { deckId: item.id })
        }}
      />
      <MenuItem title="Usuń" />
    </OverflowMenu>
  )

  return (
    <ListItem
      title={`${item.name}`}
      description={`Nowe: ${item.stats.new} Powtorka: ${item.stats.new}`}
      accessoryRight={OptionsMenu}
      onPress={() => {
        setVisible(false)
        navigation.push('Study', { deckId: item.id })
      }}
    />
  )
}

export const DecksList = () => {
  const { data, error, isLoading } = useGetAllQuery()

  const renderItem = ({ item }: { item: Deck }) => <DeckItem item={item} />

  return <List data={data} renderItem={renderItem} ItemSeparatorComponent={Divider} />
}
