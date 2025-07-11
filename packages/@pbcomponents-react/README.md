# @pbcomponents/react

[NPM](https://www.npmjs.com/package/@pbcomponents/react) | [Preview](https://pbcomponents-react.vercel.app/?path=/docs/intro--docs) | [@pbcomponents](https://github.com/prosazhin/pbcomponents)

[Figma community](https://www.figma.com/community/file/1214486013859546496/pbcomponents) | [Behance](https://www.behance.net/gallery/206064847/pbcomponents)

## prosazhin basic components for react

UI component library for React with Typescript and Tailwind.

## Installation

```bash
npm install @pbcomponents/react
```

## Usage example

```javascript
import { Button } from '@pbcomponents/react';

const Page = () => (
  <>
    <Button size='m' color='primary' theme='filled' onClick={() => {}}>
      Button
    </Button>
  </>
);
```

## Components

| Component name       | Import                                                        | Component preview and api                                                                                |
| :------------------- | :------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| Button               | `import { Button } from '@pbcomponents/react';`               | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-button-button--docs)                 |
| ButtonGroup          | `import { ButtonGroup } from '@pbcomponents/react';`          | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-button-buttongroup--docs)            |
| Badge                | `import { Badge } from '@pbcomponents/react';`                | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-badge--docs)                         |
| Tag                  | `import { Tag } from '@pbcomponents/react';`                  | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-tag--docs)                           |
| Checkbox             | `import { Checkbox } from '@pbcomponents/react';`             | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-checkbox-checkbox--docs)             |
| CheckboxGroup        | `import { CheckboxGroup } from '@pbcomponents/react';`        | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-checkbox-checkboxgroup--docs)        |
| Switch               | `import { Switch } from '@pbcomponents/react';`               | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-checkbox-switch--docs)               |
| Radio                | `import { Radio } from '@pbcomponents/react';`                | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-radio-radio--docs)                   |
| RadioGroup           | `import { RadioGroup } from '@pbcomponents/react';`           | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-radio-radiogroup--docs)              |
| InlineRadio          | `import { InlineRadio } from '@pbcomponents/react';`          | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-inline-radio-inlineradio--docs)      |
| InlineRadioGroup     | `import { InlineRadioGroup } from '@pbcomponents/react';`     | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-inline-radio-inlineradiogroup--docs) |
| Input                | `import { Input } from '@pbcomponents/react';`                | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-field-input--docs)                   |
| Textarea             | `import { Textarea } from '@pbcomponents/react';`             | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-field-textarea--docs)                |
| Select               | `import { Select } from '@pbcomponents/react';`               | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-field-select--docs)                  |
| Search               | `import { Search } from '@pbcomponents/react';`               | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-field-search--docs)                  |
| Field                | `import { Field } from '@pbcomponents/react';`                | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-field-field--docs)                   |
| Dropdown             | `import { Dropdown } from '@pbcomponents/react';`             | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-dropdown-dropdown--docs)             |
| DropdownItem         | `import { DropdownItem } from '@pbcomponents/react';`         | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-dropdown-dropdownitem--docs)         |
| Tabs                 | `import { Tabs } from '@pbcomponents/react';`                 | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-tabs-tabs--docs)                     |
| Tab                  | `import { Tab } from '@pbcomponents/react';`                  | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-tabs-tab--docs)                      |
| Collapse             | `import { Collapse } from '@pbcomponents/react';`             | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-collapse-collapse--docs)             |
| CollapseGroup        | `import { CollapseGroup } from '@pbcomponents/react';`        | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-collapse-collapsegroup--docs)        |
| Alert                | `import { Alert } from '@pbcomponents/react';`                | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-alert--docs)                         |
| Dialog               | `import { Dialog } from '@pbcomponents/react';`               | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-dialog--docs)                        |
| DialogProvider       | `import { DialogProvider } from '@pbcomponents/react';`       | -                                                                                                        |
| useDialog            | `import { useDialog } from '@pbcomponents/react';`            | -                                                                                                        |
| Notification         | `import { Notification } from '@pbcomponents/react';`         | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-notification--docs)                  |
| NotificationProvider | `import { NotificationProvider } from '@pbcomponents/react';` | -                                                                                                        |
| useNotification      | `import { useNotification } from '@pbcomponents/react';`      | -                                                                                                        |
| Headline             | `import { Headline } from '@pbcomponents/react';`             | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-headline--docs)                      |
| Container            | `import { Container } from '@pbcomponents/react';`            | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-container--docs)                     |
| PBCProvider          | `import { PBCProvider } from '@pbcomponents/react';`          | -                                                                                                        |

## Helpers

| Component name | Import                                           | Component preview and api                                                       |
| :------------- | :----------------------------------------------- | ------------------------------------------------------------------------------- |
| Text           | `import { Text } from '@pbcomponents/react';`    | [Link](https://pbcomponents-react.vercel.app/?path=/docs/helpers-text--docs)    |
| Icon           | `import { Icon } from '@pbcomponents/react';`    | [Link](https://pbcomponents-react.vercel.app/?path=/docs/helpers-icon--docs)    |
| Content        | `import { Content } from '@pbcomponents/react';` | [Link](https://pbcomponents-react.vercel.app/?path=/docs/helpers-content--docs) |

## Provider usage

This is a wrapper for the notification and dialog provider to avoid calling them separately.

```javascript
import { PBCProvider } from '@pbcomponents/react';

const App = () => <PBCProvider notificationTop={48}>{children}</PBCProvider>;
```

## Notification usage

```javascript
import { NotificationProvider, PBCProvider } from '@pbcomponents/react';

const App = () => <NotificationProvider top={48}>{children}</NotificationProvider>;
// or
const App = () => <PBCProvider notificationTop={48}>{children}</PBCProvider>;
```

```javascript
import { Button, useNotification } from '@pbcomponents/react';

const Component = () => {
  const { showNotification } = useNotification();

  return <Button onClick={() => showNotification({ headline: 'Headline' })}>Button</Button>;
};
```

## Dialog usage

```javascript
import { DialogProvider, PBCProvider } from '@pbcomponents/react';

const App = () => <DialogProvider>{children}</DialogProvider>;
// or
const App = () => <PBCProvider>{children}</PBCProvider>;
```

```javascript
import { Button, useDialog } from '@pbcomponents/react';

const Component = () => {
  const { showDialog, closeDialog } = useDialog();

  return (
    <>
      <Button onClick={() => showDialog({ children: <p>Dialog content</p>, id: 'my-dialog' })}>Open Button</Button>
      <Button onClick={() => closeDialog('my-dialog')}>Close Button</Button>
    </>
  );
};
```
