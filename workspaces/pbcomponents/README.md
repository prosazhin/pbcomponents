# pbcomponents

[NPM](https://www.npmjs.com/package/@prosazhin/pbcomponents) | [Documentation](https://prosazhin.dev/docs/pbcomponents) | [pbcomponents](https://github.com/prosazhin/pbcomponents)

[Figma community](https://www.figma.com/community/file/1214486013859546496/pbcomponents) | [Behance](https://www.behance.net/gallery/206064847/pbcomponents)

## prosazhin basic components for react

UI component library for React with Typescript and Tailwind.

## Installation

```bash
npm install @prosazhin/pbcomponents
```

## Usage example

```javascript
import { Button } from '@prosazhin/pbcomponents';

const Page = () => (
  <>
    <Button size='m' color='primary' theme='filled' onClick={() => {}}>
      Button
    </Button>
  </>
);
```

## Components

| Component name        | Import                                                             | Component preview and api                                              |
| :-------------------- | :----------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Button                | `import { Button } from '@prosazhin/pbcomponents';`                | [Link](https://prosazhin.dev/docs/pbcomponents/button)                 |
| ButtonGroup           | `import { ButtonGroup } from '@prosazhin/pbcomponents';`           | [Link](https://prosazhin.dev/docs/pbcomponents/button-group)           |
| Badge                 | `import { Badge } from '@prosazhin/pbcomponents';`                 | [Link](https://prosazhin.dev/docs/pbcomponents/badge)                  |
| Tag                   | `import { Tag } from '@prosazhin/pbcomponents';`                   | [Link](https://prosazhin.dev/docs/pbcomponents/tag)                    |
| Checkbox              | `import { Checkbox } from '@prosazhin/pbcomponents';`              | [Link](https://prosazhin.dev/docs/pbcomponents/checkbox)               |
| CheckboxGroup         | `import { CheckboxGroup } from '@prosazhin/pbcomponents';`         | [Link](https://prosazhin.dev/docs/pbcomponents/checkbox-group)         |
| Switch                | `import { Switch } from '@prosazhin/pbcomponents';`                | [Link](https://prosazhin.dev/docs/pbcomponents/switch)                 |
| Radio                 | `import { Radio } from '@prosazhin/pbcomponents';`                 | [Link](https://prosazhin.dev/docs/pbcomponents/radio)                  |
| RadioGroup            | `import { RadioGroup } from '@prosazhin/pbcomponents';`            | [Link](https://prosazhin.dev/docs/pbcomponents/radio-group)            |
| InlineRadio           | `import { InlineRadio } from '@prosazhin/pbcomponents';`           | [Link](https://prosazhin.dev/docs/pbcomponents/inline-radio)           |
| InlineRadioGroup      | `import { InlineRadioGroup } from '@prosazhin/pbcomponents';`      | [Link](https://prosazhin.dev/docs/pbcomponents/inline-radio-group)     |
| Input                 | `import { Input } from '@prosazhin/pbcomponents';`                 | [Link](https://prosazhin.dev/docs/pbcomponents/input)                  |
| Textarea              | `import { Textarea } from '@prosazhin/pbcomponents';`              | [Link](https://prosazhin.dev/docs/pbcomponents/textarea)               |
| Select                | `import { Select } from '@prosazhin/pbcomponents';`                | [Link](https://prosazhin.dev/docs/pbcomponents/select)                 |
| Search                | `import { Search } from '@prosazhin/pbcomponents';`                | [Link](https://prosazhin.dev/docs/pbcomponents/search)                 |
| Field                 | `import { Field } from '@prosazhin/pbcomponents';`                 | [Link](https://prosazhin.dev/docs/pbcomponents/field)                  |
| Dropdown              | `import { Dropdown } from '@prosazhin/pbcomponents';`              | [Link](https://prosazhin.dev/docs/pbcomponents/dropdown)               |
| DropdownItem          | `import { DropdownItem } from '@prosazhin/pbcomponents';`          | [Link](https://prosazhin.dev/docs/pbcomponents/dropdown-item)          |
| Tabs                  | `import { Tabs } from '@prosazhin/pbcomponents';`                  | [Link](https://prosazhin.dev/docs/pbcomponents/tabs)                   |
| Tab                   | `import { Tab } from '@prosazhin/pbcomponents';`                   | [Link](https://prosazhin.dev/docs/pbcomponents/tab)                    |
| Collapse              | `import { Collapse } from '@prosazhin/pbcomponents';`              | [Link](https://prosazhin.dev/docs/pbcomponents/collapse)               |
| CollapseGroup         | `import { CollapseGroup } from '@prosazhin/pbcomponents';`         | [Link](https://prosazhin.dev/docs/pbcomponents/collapse-group)         |
| Alert                 | `import { Alert } from '@prosazhin/pbcomponents';`                 | [Link](https://prosazhin.dev/docs/pbcomponents/alert)                  |
| Dialog                | `import { Dialog } from '@prosazhin/pbcomponents';`                | [Link](https://prosazhin.dev/docs/pbcomponents/dialog)                 |
| DialogProvider        | `import { DialogProvider } from '@prosazhin/pbcomponents';`        | [Link](https://prosazhin.dev/docs/pbcomponents/dialog-provider)        |
| useDialog             | `import { useDialog } from '@prosazhin/pbcomponents';`             | [Link](https://prosazhin.dev/docs/pbcomponents/use-dialog)             |
| useShowDialog         | `import { useShowDialog } from '@prosazhin/pbcomponents';`         | [Link](https://prosazhin.dev/docs/pbcomponents/use-show-dialog)        |
| Notification          | `import { Notification } from '@prosazhin/pbcomponents';`          | [Link](https://prosazhin.dev/docs/pbcomponents/notification)           |
| NotificationsProvider | `import { NotificationsProvider } from '@prosazhin/pbcomponents';` | [Link](https://prosazhin.dev/docs/pbcomponents/notifications-provider) |
| useNotifications      | `import { useNotifications } from '@prosazhin/pbcomponents';`      | [Link](https://prosazhin.dev/docs/pbcomponents/use-notifications)      |
| Headline              | `import { Headline } from '@prosazhin/pbcomponents';`              | [Link](https://prosazhin.dev/docs/pbcomponents/headline)               |
| Container             | `import { Container } from '@prosazhin/pbcomponents';`             | [Link](https://prosazhin.dev/docs/pbcomponents/container)              |
| PBCProvider           | `import { PBCProvider } from '@prosazhin/pbcomponents';`           | [Link](https://prosazhin.dev/docs/pbcomponents/pbc-provider)           |

## Helpers

| Component name | Import                                               | Component preview and api                               |
| :------------- | :--------------------------------------------------- | ------------------------------------------------------- |
| Text           | `import { Text } from '@prosazhin/pbcomponents';`    | [Link](https://prosazhin.dev/docs/pbcomponents/text)    |
| Icon           | `import { Icon } from '@prosazhin/pbcomponents';`    | [Link](https://prosazhin.dev/docs/pbcomponents/icon)    |
| Content        | `import { Content } from '@prosazhin/pbcomponents';` | [Link](https://prosazhin.dev/docs/pbcomponents/content) |

## Hooks

| Hook name            | Import                                                            | Docs                                                                   |
| :------------------- | :---------------------------------------------------------------- | :--------------------------------------------------------------------- |
| useClickOutside      | `import { useClickOutside } from '@prosazhin/pbcomponents';`      | [Link](https://prosazhin.dev/docs/pbcomponents/use-click-outside)      |
| useControllableState | `import { useControllableState } from '@prosazhin/pbcomponents';` | [Link](https://prosazhin.dev/docs/pbcomponents/use-controllable-state) |
| useCountdown         | `import { useCountdown } from '@prosazhin/pbcomponents';`         | [Link](https://prosazhin.dev/docs/pbcomponents/use-countdown)          |
| useHoverControllable | `import { useHoverControllable } from '@prosazhin/pbcomponents';` | [Link](https://prosazhin.dev/docs/pbcomponents/use-hover-controllable) |
| useKeydown           | `import { useKeydown } from '@prosazhin/pbcomponents';`           | [Link](https://prosazhin.dev/docs/pbcomponents/use-keydown)            |
| useMergeRefs         | `import { useMergeRefs } from '@prosazhin/pbcomponents';`         | [Link](https://prosazhin.dev/docs/pbcomponents/use-merge-refs)         |
| useScreenSize        | `import { useScreenSize } from '@prosazhin/pbcomponents';`        | [Link](https://prosazhin.dev/docs/pbcomponents/use-screen-size)        |

## Provider usage

This is a wrapper for the notification and dialog provider to avoid calling them separately.

```javascript
import { PBCProvider } from '@prosazhin/pbcomponents';

const App = () => (
  <PBCProvider
    notifications={{
      top: 48,
      onError: (error, context) => {
        console.error('Notification callback error', error, context);
      },
    }}
  >
    {children}
  </PBCProvider>
);
```

## Notification usage

```javascript
import { NotificationsProvider, PBCProvider } from '@prosazhin/pbcomponents';

const App = () => (
  <NotificationsProvider
    top={48}
    onError={(error, context) => {
      console.error('Notification callback error', error, context);
    }}
  >
    {children}
  </NotificationsProvider>
);
// or
const App = () => <PBCProvider notifications={{ top: 48 }}>{children}</PBCProvider>;
```

```javascript
import { Button, useNotifications } from '@prosazhin/pbcomponents';

const Component = () => {
  const { notifications, showNotification, hideNotification } = useNotifications();
  const latestNotification = notifications[0];

  return (
    <>
      <Button onClick={() => showNotification({ headline: 'Headline', children: 'Description' })}>Show Notification</Button>
      <Button onClick={() => latestNotification && hideNotification(latestNotification.id)} disabled={!latestNotification}>
        Hide Notification
      </Button>
    </>
  );
};
```

## Dialog usage

```javascript
import { DialogProvider, PBCProvider } from '@prosazhin/pbcomponents';

const App = () => <DialogProvider>{children}</DialogProvider>;
// or
const App = () => <PBCProvider>{children}</PBCProvider>;
```

```javascript
import { Button, Dialog, useDialog, useShowDialog } from '@prosazhin/pbcomponents';

const DIALOG_ID = 'my-dialog';

const Component = () => {
  const { closeDialog } = useDialog();
  const showDialog = useShowDialog(() => (
    <Dialog id={DIALOG_ID}>
      <div>Dialog content</div>
      <Button color='primary' theme='filled' className='pbc:mt-24' onClick={() => closeDialog(DIALOG_ID)}>
        Close Button
      </Button>
    </Dialog>
  ));

  return (
    <>
      <Button onClick={showDialog}>Open Dialog</Button>
    </>
  );
};
```
