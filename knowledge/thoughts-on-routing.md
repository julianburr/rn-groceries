# Routing

## Config

```json
export default {
  routeA: {
    screen: ScreenA,
    screenType: Navigator.WRAPPERS.LIST, // Determines wheather the screen will be wrapped in a ScrollView or ListView?!
    navigationHeader: {
      title: 'Route A', // static title
      left: <Button />, // component
      right: null, // if nothing should be shown
      theme: NavigationHeader.THEMES.DEFAULT, // like themes in pocket
    },
    path: 'route-a', // as app entry point, e.g. from external links,
    animateIn: (oldCard, newCard) => {
      // Define animations to, defaults to slide?!
      // This would allow the most flexibility imo,
      //  also it would allow to keep the old card in the background
      //  for modals
    },
    animateOut: (oldCard, newCard) => {
      // Same
    },
    stackCheckpoint: '@a', // optional checkpoint, to be able to jump in history?!, ala .popToCheckpoint(@a)
    isRoutable: true // set to false for routes that manage themselves and should not appear when running through the history, e.g. modals?!
  },

  routeB: {
    screen: ScreenB,
    screenProps: {
      foo: 'bar' // optional props directly passed to the screen
    }
    navigationHeader: {
      title: state => state.params.title, // use params for dynamic titles, see react-native-navigation
      left: ( // Multiple buttons can be easily wrapped in container
        <Buttons>
          <Button.Back />
          <Button />
        </Buttons>
      ),
      right: <Button />,
    },
    animateIn: Navigator.ANIMATIONS.FADE, // predefined animations
    path: 'route-b/:id', // variables in path ala react-router, so route/1 would automatically set state.params.id=1
  },

  routeC: {
    screen: ScreenC,
    screenProps: state => { // Could also be a function?!
      return {
        foo: state.params.bar
      }
    }
    navigationHeader: {
      title: <SomeComponent />, // like the select title in pocket
      // ...
    }
    path: 'route-b/route-c/:id([0-9]*)', // maybe allow regex in the route placeholders?!
  }
}
```

## Stack

```js
<Stack>
  <Card key={2} checkpoint={null}>
    <NavigationHeader />
    <TypeWrapper>
      <ScreenComponent />
    </TypeWrapper>
  </Card>
  <Card key={1} checkpoint='@a'>
    <NavigationHeader />
    <TypeWrapper>
      <ScreenComponent />
    </TypeWrapper>
  </Card>
</Stack>
```

## Props passed down to cards/screens
 - `navigation`: the current routing state
   - `params`: params defined for current route
   - `key`: current route key
   - `path`
     - `def`: e.g. `pathB/:id`, so the literal definition in the config
     - `string`: e.g. `pathB/1`, so the actually called path as a string
     - `params`: e.g. `{id: 1}`, the extracted patameters of the path
   - `stack`: the current stack, e.g. helpful when I want to pop the router before the current route (e.g. in modals...)


## Stack state

```json
{
  stack: [
    {
      id: 0, // unique id of the route
      key: 'RouteA',
      route: {
        // route config
      },
      path: {
        def: 'routeA',
        string: 'routeA',
        params: {}
      }
      params: {
        foo: 'bar'
      },
      checkpoint: '@a',
    },
    {
      id: 1,
      key: 'RouteA',
      route: {
        // route config
      },
      path: {
        def: 'routeA',
        string: 'routeA',
        params: {}
      }
      params: {
        foo: 'bar'
      },
      checkpoint: null,
    }
  ],
  checkpoints: {
    '@a': 0 // to easily jump back to a certain checkpoint
  }
}
```


## Un/Mounting

Cards unmount when being poped.

They should still remain stored in the stack state though, to allow going forward in the routing history...


## Methods

 - `push`/`routeTo`/`goTo`
   - Params:
     - `key`: route key to route to, defined in the routes config
     - `params`: object that will be passed as params to the route,
     - `fromStackEntry`: allows to push routes in between existing routes, e.g. when a modal should stay open while the new route gets pushed in the background
 - `pop`/`goBack`
   - Params:
     - `fromStackEntry`: entry object with at least the id of the stack entry which should be poped from the stack, this allowes for things like `.pop(parentId)` within a modal, which will keep the modal open while the background screen pops to the previous screen
 - `popToCheckoint`
   - Params:
     - `checkpointKey`: identifier of the checkpoint you want to jump back to,
     defined in route config


### Examples

```js
// Starting Stack = [1,2,3,4]

router.push(5) // => [1,2,3,4,5]
router.pop() // => [1,2,3,4]

router.push(5, {}, 3) // => [1,2,3,5,4]
router.pop() // => [1,2,3,5]

router.push(6) // => [1,2,3,5,6(@x)]
router.push(1)
router.push(2) // => [1,2,3,5,6(@x),1,2]
router.popToCheckpoint(@x) // => [1,2,3,5,6(@a)]

router.pop(5) // => [1,2,3,6(@a)]
router.pop() // => [1,2,3]
```


## JSX routing like in `react-router`?

```js
<Router>
  <Route path='routeA' {...rest} />
  <Route path='routeB/:id' {...rest} />
</Router>
```

Would it be possible to define nested routes then?!

```js
<Router>
  <Route path='/' screen={App}>
    <Route path='tabA' screen={TabA} />
    <Route path='tabB' screen={TabB}>
      <Route path='subB' screen={SubB} />
    </Route>
  </Route>
</Router>
```

This would allow the route `/tabB/subB` to render something like:
```js
<App>
  <TabB>
    <SubB />
  </TabB>
</App>
```

Imo getting too far here maybe...