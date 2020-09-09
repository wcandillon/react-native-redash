# Strings

## `<ReText />

This component is like `<Text>` but accepts a string animation node as property. Behind the scene, `<ReText>` is using `<TextInput>` with some default styling. Therefore there might be some slight inconsistencies with `<Text>`.

```ts
() => {
  const price = useSharedValue(42);
  const formattedPrice = useDerivedValue(() => (`${price.value}`.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' }));
  return (
    <ReText
      text={price}
      style={{ color: "black", fontVariant: ["tabular-nums"] }}
    />
  )
}
```