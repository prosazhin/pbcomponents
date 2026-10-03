import Button from '@/components/shared/button';
import Input from '@/components/shared/input';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';

describe('Input', () => {
  it('без Input.Control ничего не рендерит', () => {
    const { container } = render(<Input />);

    expect(container).toBeEmptyDOMElement();
  });

  it('onChange получает строку и событие', async () => {
    const onChange = vi.fn();
    const Controlled = () => {
      const [value, setValue] = useState('');

      return (
        <Input>
          <Input.Control
            value={value}
            placeholder='Name'
            onChange={(next, event) => {
              onChange(next, event);
              setValue(next);
            }}
          />
        </Input>
      );
    };
    render(<Controlled />);

    await userEvent.type(screen.getByPlaceholderText('Name'), 'Hi');

    expect(screen.getByPlaceholderText('Name')).toHaveValue('Hi');
    expect(onChange).toHaveBeenLastCalledWith('Hi', expect.anything());
  });

  it('id и aria-атрибуты с обёртки переезжают на <input> (так работает Field)', () => {
    render(
      <Input id='email' aria-describedby='hint' aria-invalid>
        <Input.Control value='' aria-describedby='own' />
      </Input>,
    );

    const input = screen.getByRole('textbox');

    expect(input).toHaveAttribute('id', 'email');
    expect(input).toHaveAttribute('aria-describedby', 'own hint');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('disabled обёртки дизейблит поле и кнопку в аддоне', () => {
    render(
      <Input disabled>
        <Input.Control value='' />
        <Input.RightAddon>
          <Button>Send</Button>
        </Input.RightAddon>
      </Input>,
    );

    expect(screen.getByRole('textbox')).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Send' })).toBeDisabled();
  });

  it('рендерит произвольный контент в аддонах', () => {
    render(
      <Input>
        <Input.LeftAddon>https://</Input.LeftAddon>
        <Input.Control value='' />
      </Input>,
    );

    expect(screen.getByText('https://')).toBeInTheDocument();
  });
});
