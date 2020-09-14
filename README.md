# RSuite Interactions

> Call RSuite Modals like a boss.

    npm install @rsuite/interactions --save

## Features

- Easy to call out `alert()`, `confirm()`, `prompt()` styles modals as you already know how.
- Await their return values.
- Multiple calls are queued.


## Usage

```jsx
import { alert, confirm, prompt  } from '@rsuite/interactions';

function App() {

  const buyNewPhone = useCallback(() => {
    alert('Congrats! You\'ve got a new iPhone!');
  }, []);

  const confirmSmashPhone = useCallback(() => {
    if (await confirm('Are you sure you what to do this?')) {
      alert('Rest in pieces.');
    }
  }, []);

  const promptForName = useCallback(() => {
    const name = await prompt('What is your name?');
    if (name) {
      alert(`It\'s ok, ${name}.`);
    }
  }, []);

  return (
    <>
      <Button onClick={buyNewPhone}>Buy a new iPhone</Button>
      <Button onClick={confirmSmashPhone}>Then smash it!</Button>
      <Button onClick={promptForName}>I'm so sorry.</Button>
    </>
  );
};

```

## API

### `alert(message?: React.ReactNode, config?: AlertModalProps): void`

Use it like you are using `window.alert()`.

### `confirm(message?: React.ReactNode, config?: ConfirmModalProps): Promise<boolean>`

Use it like you are using `window.confirm()` but await its return value.

### `prompt(message?: React.ReactNode, _default?: string, config?: PromoteModalProps): Promise<string | null>`

Use it like you are using `window.prompt()` but await its return value.


## License

MIT licensed
