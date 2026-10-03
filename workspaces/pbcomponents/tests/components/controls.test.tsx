import Checkbox from '@/components/shared/checkbox';
import CheckboxGroup from '@/components/shared/checkbox-group';
import Radio from '@/components/shared/radio';
import RadioGroup from '@/components/shared/radio-group';
import Toggle from '@/components/shared/toggle';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

describe('Checkbox', () => {
  it('клик по подписи зовёт onChange с checked и value (по умолчанию value = текст)', async () => {
    const onChange = vi.fn();
    render(<Checkbox onChange={onChange}>Apples</Checkbox>);

    await userEvent.click(screen.getByText('Apples'));

    expect(onChange).toHaveBeenCalledWith(true, 'Apples', expect.anything());
  });

  it('явный value имеет приоритет над текстом', async () => {
    const onChange = vi.fn();
    render(
      <Checkbox value='apple' checked onChange={onChange}>
        Apples
      </Checkbox>,
    );

    await userEvent.click(screen.getByRole('checkbox'));

    expect(onChange).toHaveBeenCalledWith(false, 'apple', expect.anything());
  });

  it('indeterminate выставляется на DOM-элемент', () => {
    render(<Checkbox indeterminate>All</Checkbox>);

    expect((screen.getByRole('checkbox') as HTMLInputElement).indeterminate).toBe(true);
  });

  it('задизейбленный не зовёт onChange', async () => {
    const onChange = vi.fn();
    render(
      <Checkbox disabled onChange={onChange}>
        Apples
      </Checkbox>,
    );

    await userEvent.click(screen.getByText('Apples'));

    expect(screen.getByRole('checkbox')).toBeDisabled();
    expect(onChange).not.toHaveBeenCalled();
  });
});

describe('Toggle', () => {
  it('работает как чекбокс: onChange с checked и value', async () => {
    const onChange = vi.fn();
    render(<Toggle onChange={onChange}>Wi-Fi</Toggle>);

    await userEvent.click(screen.getByRole('checkbox', { name: 'Wi-Fi' }));

    expect(onChange).toHaveBeenCalledWith(true, 'Wi-Fi', expect.anything());
  });
});

describe('CheckboxGroup', () => {
  const renderGroup = (props: Partial<Parameters<typeof CheckboxGroup>[0]> = {}) =>
    render(
      <CheckboxGroup label='Fruits' name='fruits' {...props}>
        {[
          <Checkbox key='a' value='a'>
            A
          </Checkbox>,
          <Checkbox key='b' value='b'>
            B
          </Checkbox>,
          <Toggle key='c' value='c'>
            C
          </Toggle>,
        ]}
      </CheckboxGroup>,
    );

  it('неконтролируемая: стартует с defaultValue, добавляет и убирает значения', async () => {
    const onChange = vi.fn();
    renderGroup({ defaultValue: ['a'], onChange });

    expect(screen.getByRole('checkbox', { name: 'A' })).toBeChecked();

    await userEvent.click(screen.getByRole('checkbox', { name: 'B' }));
    expect(onChange).toHaveBeenLastCalledWith(['a', 'b']);
    expect(screen.getByRole('checkbox', { name: 'B' })).toBeChecked();

    await userEvent.click(screen.getByRole('checkbox', { name: 'A' }));
    expect(onChange).toHaveBeenLastCalledWith(['b']);
  });

  it('контролируемая: отображает value и не меняется без обновления пропса', async () => {
    const onChange = vi.fn();
    renderGroup({ value: ['c'], onChange });

    await userEvent.click(screen.getByRole('checkbox', { name: 'A' }));

    expect(onChange).toHaveBeenCalledWith(['c', 'a']);
    expect(screen.getByRole('checkbox', { name: 'A' })).not.toBeChecked();
    expect(screen.getByRole('checkbox', { name: 'C' })).toBeChecked();
  });

  it('name и disabled группы применяются ко всем пунктам', () => {
    renderGroup({ disabled: true });

    for (const checkbox of screen.getAllByRole('checkbox')) {
      expect(checkbox).toBeDisabled();
      expect(checkbox).toHaveAttribute('name', 'fruits');
    }
  });
});

describe('RadioGroup', () => {
  it('выбирает одно значение и зовёт onChange', async () => {
    const onChange = vi.fn();
    render(
      <RadioGroup name='size' defaultValue='s' onChange={onChange}>
        {[
          <Radio key='s' value='s'>
            Small
          </Radio>,
          <Radio key='m' value='m'>
            Medium
          </Radio>,
        ]}
      </RadioGroup>,
    );

    expect(screen.getByRole('radio', { name: 'Small' })).toBeChecked();

    await userEvent.click(screen.getByRole('radio', { name: 'Medium' }));

    expect(onChange).toHaveBeenCalledWith('m');
    expect(screen.getByRole('radio', { name: 'Medium' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'Small' })).not.toBeChecked();
  });
});
